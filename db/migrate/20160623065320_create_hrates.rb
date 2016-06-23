class CreateHrates < ActiveRecord::Migration
  def change
    create_table :hrates do |t|
    	t.integer :heart_rate
    	t.references :user
      t.timestamps null: false
    end
  end
end
