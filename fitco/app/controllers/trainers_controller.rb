class TrainersController < ApplicationController
  def index
    @trainers = Trainer.all
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
      gender = params[:gendre]
      description = params[:description]
      emai = params[:email]
      phone = params[:phone]
      url = params[:url]
      results = {result: false}

    @trainer = Trainer.new(firstname: firstname, lastname: lastname, gender: gendre, description: description, emai: email, phone: phone, url: url)

    if @trainer.save
      results[:result] = true
      results[:id] = trainer.ic
    end
    results.to_json
  end
end
