class Weight < ActiveRecord::Base
	belongs_to :user
	self.primary_key = 'id'
end
