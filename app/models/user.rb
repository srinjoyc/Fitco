class User < ActiveRecord::Base
  has_many :trainers
  has_many :exercises
  has_many :appointments
  validates :firstname, :lastname, :email, :password, presence: true

end
