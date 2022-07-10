class LocationSerializer < ActiveModel::Serializer
  attributes :id, :trip_id, :photo_id, :latitude, :longitude
end
