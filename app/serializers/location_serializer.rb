class LocationSerializer < ActiveModel::Serializer
  attributes :id, :trip_id, :photo_id, :latitude, :longitude, :image_url # :image_data
end
