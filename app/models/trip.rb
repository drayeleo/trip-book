class Trip < ApplicationRecord
  belongs_to :user
  has_many :locations, dependent: :destroy

  validates :trip_name, presence: true
end
