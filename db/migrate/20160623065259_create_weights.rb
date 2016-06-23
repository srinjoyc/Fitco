class CreateWeights < ActiveRecord::Migration
  def change
    create_table :weights do |t|
    	t.integer :weight
    	t.references :user
      t.timestamps null: false
    end
  end
end
