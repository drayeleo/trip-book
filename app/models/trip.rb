class Trip < ApplicationRecord
  belongs_to :user

  validates :trip_name, presence: true

  has_many_attached :images #, service: :s3

  def image_urls
    images.map do |image|
      Rails.application.routes.url_helpers.rails_blob_path(image, only_path: true)
    end
  end
end
