class UsersController < ApplicationController

  def index
  end

 def new
  @user = User.new
 end

  def create
    @user = User.new(user_params)
      
      if @user.save
        session[:user_id] = @user.id
        render '/users/show' , notice: "welcome aboard, #{@user.firstname}"
      else
        render "index"
    end
  end

  def show
    @user = User.find(params[:id])
  end

  def update 
    @user = User.find(params[:id])

    if @user.update_attributes(user_params)
      redirect_to user_path(@user)
    else
      render :edit
    end
  end

  def destroy
    @user = User.find(params[:id])
      @user.destroy!
      if @user.destroy! notice:"User deleted"
        redirect_to "index"
    end
  end

private

  def user_params
    params.require(:user).permit(:email, :firstname, :lastname, :password, :password_confirmation)
end
end
