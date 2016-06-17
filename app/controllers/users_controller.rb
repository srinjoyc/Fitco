class UsersController < ApplicationController

  def index
  end

  def create
    @user = User.create
  end


end
