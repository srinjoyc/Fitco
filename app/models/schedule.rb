class Schedule < ActiveRecord::Base
	belongs_to :trainer
	has_many :appointments
end
