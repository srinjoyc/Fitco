class User < ActiveRecord::Base
  has_many :trainers

  validates :firstname, :lastname, :email, :password, presence: true

end
