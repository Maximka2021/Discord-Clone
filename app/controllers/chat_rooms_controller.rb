class ChatRoomsController < ApplicationController
    skip_before_action :check_user
    def index
        render json: ChatRoom.all
    end

end
