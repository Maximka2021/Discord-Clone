class ChatRoomSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :rules
  has_many :users
  has_many :messages
end
