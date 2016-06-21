class AddUserstoExercise < ActiveRecord::Migration
  def change
  	change_table :exercises do |t|
  		t.references :appointment
      t.references :users
    end 
  end
end
