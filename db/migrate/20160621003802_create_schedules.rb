class CreateSchedules < ActiveRecord::Migration
  def change
    create_table :schedules do |t|
    	# add_foreign_key :trainer
    	t.datetime :time
      t.timestamps null: false
    end
  end
end
