class MembersController < ApplicationController
    skip_before_action :authorized
    def index
        render json: Member.all
    end

    def create
        member = Member.create(member_params)
        render json: member
    end

    private

    def member_params
        params.permit(:user_id, :chat_room_id)
    end

end
