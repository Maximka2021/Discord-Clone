class MembersController < ApplicationController

    def index
        render json: Members.all
    end

end
