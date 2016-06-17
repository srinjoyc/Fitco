class CreateTrainers < ActiveRecord::Migration
  def change
    create_table :trainers do |t|
      t.string :firstname
      t.string :lastname
      t.string :gender
      t.text :description
      t.string :email
      t.string :phone
      t.string :url

      t.timestamps null: false
    end
  end
end
