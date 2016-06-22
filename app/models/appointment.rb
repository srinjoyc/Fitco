class Appointment < ActiveRecord::Base
	belongs_to :schedule
	belongs_to :user
end
