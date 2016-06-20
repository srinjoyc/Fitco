require 'json'
class TrainersController < ApplicationController


  def index
    @trainers = Trainer.all
 
    respond_to do |format|
      format.html
      format.json{ render :json=> @trainers.to_json }
    end
  end

  def show
    @trainers = Trainer.find(params[:id])
  end

  def new
    @trainer = Trainer.new

    respond_to do |format|
      format.html
      format.json{ render :json=> @trainer.to_json }
    end
  end

  def create
      firstname = params[:firstname]
      lastname = params[:lastname]
      gender = params[:gender]
      description = params[:description]
      email = params[:email]
      phone = params[:phone]
      result = {success: false}

    @trainer = Trainer.new(firstname: firstname, lastname: lastname, gender: gender, description: description, email: email, phone: phone)

    if @trainer.save
      result[:success] = true
      result[:id] = @trainer.id
    end

    respond_to do |format|
      format.html
      format.json{ render :json=> result.to_json }
    end
  end

  def search
    puts @trainer = Trainer.where(firstname: params[:txt])

     respond_to do |format|
      format.html
      format.json{ render :json => @trainer.to_json }
    end
  end

end
