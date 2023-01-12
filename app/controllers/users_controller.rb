class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :handle_invalid_record
    skip_before_action :authorized, only: [:create, :index, :show]

    def index
        render json: User.all
    end

    def show
        user = User.find_by(id: params[:id])
        if user
            render json:user
        else
            render json: { error: "Error" }, status: :not_found
        end
    end

    # def create 
    #     user = User.create!(user_params)
    #     session[:user_id] = user.id
    #     render json: user
    # end

    def me 
        render json: current_user, status: :ok
    end

    def create 
        user = User.create!(user_params)
        @token = encode_token(user_id: user.id)
        render json: {
            user: UserSerializer.new(user), 
            token: @token
        }, status: :created
    end

    private

    def user_params
        params.permit(:username, :password, :email) 
    end
    
    def handle_invalid_record(e)
        render json: { error: e.record.errors.full_messages }, status: :unprocessable_entity
    end

end
