class User < ActiveRecord::Base

  has_many :trainers

  has_secure_password
  has_many :trainers
  has_many :exercises
  has_many :appointments
  validates :firstname, :lastname, :email, presence: true



  validates :password,
    length: { in: 6..20 }, on: :create

  def full_name
    "#{firstname} #{lastname}"
  end 
end
