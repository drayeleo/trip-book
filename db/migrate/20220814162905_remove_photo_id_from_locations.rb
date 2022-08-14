class RemovePhotoIdFromLocations < ActiveRecord::Migration[7.0]
  def change
    remove_column :locations, :photo_id
  end
end
