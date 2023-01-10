class User < ApplicationRecord
      has_secure_password
      has_many :members 
      has_many :messages   
      has_many :chat_rooms, through: :members
       # validates :username, presence: true, uniqueness: true, length: {in: 5..20}
       validates :password, presence: true, length: {in: 1..3}
       validates :email, presence: true, uniqueness: true
end
