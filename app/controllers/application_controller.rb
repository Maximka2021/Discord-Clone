class ApplicationController < ActionController::API
    include ActionController::Cookies
    rescue_from ActiveRecord::RecordInvalid, with: :invalid 
    before_action :check_user

    def invalid error
        render json: { error: error.record.errors.full_messages}, status: :unprocessable_entity
    end

    def check_user
        unless current_user
            render json: { error: "You are not logged in"}, status: 401
        end
    end

    def current_user
        User.find_by(id: session[:user_id])
    end

end
