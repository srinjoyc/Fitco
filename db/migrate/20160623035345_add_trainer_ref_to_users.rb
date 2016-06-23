class AddTrainerRefToUsers < ActiveRecord::Migration
  def change
    add_reference :users, :trainer, index: true, foreign_key: true
  end
end
