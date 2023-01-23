class ChatRoomsController < ApplicationController
    skip_before_action :authorized
    def index
        render json: ChatRoom.all
    end

    def show
        chat_room = ChatRoom.find_by(id: params[:id])
        render json: chat_room, include: ['messages', 'users', 'messages.user']
    end

    def create
        chat_room = ChatRoom.create(chat_room_params)
        render json: chat_room
    end

    private

    def chat_room_params
        params.permit(:title, :description, :rules)
    end

end
