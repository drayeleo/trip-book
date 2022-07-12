class User < ApplicationRecord
  validates :username, uniqueness: true

  has_many :trips, dependent: :destroy

  has_secure_password

  # has_many_attached :images #, service: :s3

  # def image_urls
  #   images.map do |image|
  #     Rails.application.routes.url_helpers.rails_blob_path(image, only_path: true)
  #   end
  # end
end
