require 'foreigner'

class AddTimetoAppointment < ActiveRecord::Migration
 def change
 	change_table :appointments do |t|
    	t.references :users
      t.references :trainers
      t.datetime :time
    end
  end
end
