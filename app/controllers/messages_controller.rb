class MessagesController < ApplicationController

    skip_before_action :check_user 

    def index
        render json: Message.all
    end

    def create
        message = Message.create!(message_params)
        render json: message
    end

    def destroy
        message = Message.find(params[:id])
        message.delete
    end

    private

    def message_params
        params.permit(:user_id, :chat_room_id, :body)
    end

end
