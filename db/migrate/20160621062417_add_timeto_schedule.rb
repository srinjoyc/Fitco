require 'foreigner'

class AddTimetoSchedule < ActiveRecord::Migration
  def change
  	change_table :schedules do |t|
      # t.datetime :time 
      t.references :trainer
    end
  end
end
