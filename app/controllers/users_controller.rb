class UsersController < ApplicationController

  def index
  end

  def create
    @user = User.new(user_params)
      if @user.save
        redirect_to @user
      else
        render "index"
    end
  end

private

  def user_params
    params.require(:user).permit(:firstname, :lastname, :email, :password)
  end

end
