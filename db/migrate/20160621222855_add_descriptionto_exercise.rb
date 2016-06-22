class AddDescriptiontoExercise < ActiveRecord::Migration
  def change
  	change_table :exercises do |t|
  		t.text :name
      t.string :metric
      t.text :description 
    end 
  end
end
