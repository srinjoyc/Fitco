class Trainer < ActiveRecord::Base
	has_many :schedules
	has_many :users
	has_many :appointments
end
