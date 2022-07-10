class CreateLocations < ActiveRecord::Migration[7.0]
  def change
    create_table :locations do |t|
      t.integer :trip_id
      t.integer :photo_id
      t.decimal :latitude
      t.decimal :longitude

      t.timestamps
    end
  end
end
