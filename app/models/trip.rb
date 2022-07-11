class Trip < ApplicationRecord
  belongs_to :user
  has_many :locations

  validates :trip_name, presence: true

  has_many_attached :images #, service: :s3

  def image_data
    # debugger
    images.map do |image|
      image_data = {
        image_url:
          Rails.application.routes.url_helpers.rails_blob_path(
            image,
            only_path: true
          ),
        image_id: image.id
      }

      # debugger
    end
  end
end
