class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email
  has_many :messages
  has_many :chat_rooms
end
