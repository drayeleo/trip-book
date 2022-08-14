class LocationSerializer < ActiveModel::Serializer
  attributes :id, :trip_id, :latitude, :longitude, :image_url
end
