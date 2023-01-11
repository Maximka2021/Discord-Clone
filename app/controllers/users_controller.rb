class UsersController < ApplicationController
    skip_before_action :check_user, only: [:create, :index, :show]

    def index
        render json: User.all
    end

    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json:user
        else
            render json: { error: "Error" }, status: :not_found
        end
    end

    def create 
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user
    end

    private

    def user_params
        params.permit(:username, :password, :email) 
    end

end
