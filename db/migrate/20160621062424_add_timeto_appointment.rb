require 'foreigner'

class AddTimetoAppointment < ActiveRecord::Migration
 def change
 	change_table :appointments do |t|
      t.integer :trainer_id
      t.datetime :time
    end
  end
end
