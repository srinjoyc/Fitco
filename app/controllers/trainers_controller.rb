class TrainersController < ApplicationController
  before_action :set_trainer, only: [:show, :edit, :update, :destroy]

  # GET /trainers
  # GET /trainers.json
  def index
    @trainers = Trainer.all
  end

  # GET /trainers/1
  # GET /trainers/1.json
  def show
    @trainers = Trainer.find(params[:id])
  end

  # GET /trainers/new
  def new
    @trainer = Trainer.new
  end

  # GET /trainers/1/edit
  def edit
  end

  # POST /trainers
  # POST /trainers.json
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

  # PATCH/PUT /trainers/1
  # PATCH/PUT /trainers/1.json
  def update
    respond_to do |format|
      if @trainer.update(trainer_params)
        format.html { redirect_to @trainer, notice: 'Trainer was successfully updated.' }
        format.json { render :show, status: :ok, location: @trainer }
      else
        format.html { render :edit }
        format.json { render json: @trainer.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /trainers/1
  # DELETE /trainers/1.json
  def destroy
    @trainer.destroy
    respond_to do |format|
      format.html { redirect_to trainers_url, notice: 'Trainer was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def search
    puts @trainer = Trainer.where(firstname: params[:txt])

     respond_to do |format|
      format.html
      format.json{ render :json => @trainer.to_json }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_trainer
      @trainer = Trainer.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def trainer_params
      params.fetch(:trainer, {})
    end
end
