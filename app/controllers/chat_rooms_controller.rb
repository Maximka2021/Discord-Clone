class ChatRoomsController < ApplicationController

    def index
        render json: ChatRoom.all
    end

end
