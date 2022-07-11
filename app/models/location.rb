class Location < ApplicationRecord
  belongs_to :trip

  has_one_attached :image

  def image_data
    # debugger

    image_data = {
      image_url:
        Rails.application.routes.url_helpers.rails_blob_path(
          image,
          only_path: true
        ),
      image_id: image.id
    }

    # images.map do |image|
    #   image_data = {
    #     image_url:
    #       Rails.application.routes.url_helpers.rails_blob_path(
    #         image,
    #         only_path: true
    #       ),
    #     image_id: image.id
    #   }
    #   # debugger
    # end

    # image do |image|
    #   debugger
    #   image_data = {
    #     image_url:
    #       Rails.application.routes.url_helpers.rails_blob_path(
    #         image,
    #         only_path: true
    #       ),
    #     image_id: image.id
    #   }

    #   # debugger
    # end
  end
end
