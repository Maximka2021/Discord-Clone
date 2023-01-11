class ChatRoomsController < ApplicationController
    skip_before_action :authorized
    def index
        render json: ChatRoom.all
    end

end
