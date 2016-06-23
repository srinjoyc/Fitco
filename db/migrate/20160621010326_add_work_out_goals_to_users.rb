class AddWorkOutGoalsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :idealweight, :integer
  end
end
