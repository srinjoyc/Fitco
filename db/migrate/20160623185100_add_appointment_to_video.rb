class AddAppointmentToVideo < ActiveRecord::Migration
  def change
  	change_table :videos do |t|
  		t.references :appointment
    end
  end
end
