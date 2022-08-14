class TripSerializer < ActiveModel::Serializer
  attributes :id, :trip_name, :trip_summary

  has_many :locations
end
