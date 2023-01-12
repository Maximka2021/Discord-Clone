class ChatRoomsController < ApplicationController
    skip_before_action :authorized
    def index
        render json: ChatRoom.all
    end

    def show
        chat_room = ChatRoom.find_by(id: params[:id])
        render json: chat_room, include: ['messages', 'messages.user']
    end

end
