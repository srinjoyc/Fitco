class AddVideoUrLtoAppointment < ActiveRecord::Migration
  def change
  	change_table :videos do |t|
  		t.string :video_url
    end
  end
end
