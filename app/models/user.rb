class User < ApplicationRecord
  validates :username, uniqueness: true

  has_many :trips, dependent: :destroy

  has_secure_password
end
