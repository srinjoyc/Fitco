class AddInfoToUsers < ActiveRecord::Migration
  def change
    add_column :users, :workouthistory, :string
    add_column :users, :workoutgoals, :string
    add_column :users, :age, :integer
    add_column :users, :weight, :integer
    add_column :users, :height, :decimal
  end
end
