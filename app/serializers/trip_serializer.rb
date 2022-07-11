class TripSerializer < ActiveModel::Serializer
  attributes :id, :trip_name, :trip_summary #, :image_data #, :images

  has_many :locations
end
