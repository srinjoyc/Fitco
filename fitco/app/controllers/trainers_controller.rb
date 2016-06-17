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
  end

  def create
      firstname = params[:firstname]
      lastname = params[:lastname]
      gender = params[:gender]
      description = params[:description]
      email = params[:email]
      phone = params[:phone]
      url = params[:url]
      results = {result: false}

    @trainer = Trainer.new(firstname: firstname, lastname: lastname, gender: gender, description: description, email: email, phone: phone, url: url)

    if @trainer.save
      results[:result] = true
      results[:id] = trainer.id
    end
    results.to_json
  end

  def search
    puts @trainer = Trainer.where(firstname: params[:txt])

     respond_to do |format|
      format.html
      format.json{ render :json => @trainer.to_json }
    end
  end
end
