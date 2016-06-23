class AddUserRefToTrainers < ActiveRecord::Migration
  def change
    add_reference :trainers, :user, index: true, foreign_key: true
  end
end
