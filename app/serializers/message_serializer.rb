class MessageSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :chat_room_id, :body
  belongs_to :user
end
