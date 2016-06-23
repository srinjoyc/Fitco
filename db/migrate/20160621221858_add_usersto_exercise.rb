class AddUsertoExercise < ActiveRecord::Migration
  def change
  	change_table :exercises do |t|
  		t.references :appointment
      t.references :user
    end 
  end
end
