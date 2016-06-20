class CreateSubuserUsers < ActiveRecord::Migration
  def change
    create_table :subuser_users do |t|

      t.timestamps null: false
    end
  end
end
