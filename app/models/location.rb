class Location < ApplicationRecord
  belongs_to :trip

  has_one_attached :image

  def image_url
    Rails.application.routes.url_helpers.rails_blob_path(image, only_path: true)
  end

  def image_data
    # debugger

    image_data = {
      image_url:
        Rails.application.routes.url_helpers.rails_blob_path(
          image,
          only_path: true
        ),
      image_id: image.id
      # -> could probably delete image_id since that's not how I'm associating location with image any more
      # -> also, may be able to just use image.url instead of Rails.application.routes.url_helpers.rails_blob_path. Try it out once everything else is working?
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
