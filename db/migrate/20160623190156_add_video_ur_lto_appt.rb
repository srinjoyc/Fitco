#messed up previous migration
class AddVideoUrLtoAppt < ActiveRecord::Migration
  def change
  	change_table :appointments do |t|
  		t.string :video_url
    end
  end
end
