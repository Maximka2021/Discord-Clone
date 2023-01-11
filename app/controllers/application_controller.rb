class ApplicationController < ActionController::API
    # include ActionController::Cookies
    # rescue_from ActiveRecord::RecordInvalid, with: :invalid 
    before_action :authorized

    # def invalid error
    #     render json: { error: error.record.errors.full_messages}, status: :unprocessable_entity
    # end

    # def check_user
    #     unless current_user
    #         render json: { error: "You are not logged in"}, status: 401
    #     end
    # end

    def current_user 
        if decoded_token
            user_id = decoded_token[0]['user_id']
            @user = User.find_by(id: user_id)
        end
    end
    
    def authorized
        unless !!current_user
        render json: { message: 'Please log in' }, status: :unauthorized
        end
    end

    def encode_token(payload)
        JWT.encode(payload, 'hellomars1211') 
    end

    def decoded_token
        header = request.headers['Authorization']
        if header
            token = header.split(" ")[1]
            begin
                JWT.decode(token, 'hellomars1211')
            rescue JWT::DecodeError
                nil
            end
        end
    end

end
