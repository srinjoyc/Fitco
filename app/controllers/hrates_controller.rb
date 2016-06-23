class HratesController < ApplicationController
  before_action :set_hrate, only: [:show, :edit, :update, :destroy]

  # GET /hrates
  # GET /hrates.json
  def index
    @hrates = Hrate.all
    render json: @hrates
  end

  # GET /hrates/1
  # GET /hrates/1.json
  def show
  end

  # GET /hrates/new
  def new
    @hrate = Hrate.new
  end

  # GET /hrates/1/edit
  def edit
  end

  # POST /hrates
  # POST /hrates.json
  def create
    @hrate = Hrate.new(hrate_params)

    respond_to do |format|
      if @hrate.save
        format.html { redirect_to @hrate, notice: 'Hrate was successfully created.' }
        format.json { render :show, status: :created, location: @hrate }
      else
        format.html { render :new }
        format.json { render json: @hrate.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /hrates/1
  # PATCH/PUT /hrates/1.json
  def update
    respond_to do |format|
      if @hrate.update(hrate_params)
        format.html { redirect_to @hrate, notice: 'Hrate was successfully updated.' }
        format.json { render :show, status: :ok, location: @hrate }
      else
        format.html { render :edit }
        format.json { render json: @hrate.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /hrates/1
  # DELETE /hrates/1.json
  def destroy
    @hrate.destroy
    respond_to do |format|
      format.html { redirect_to hrates_url, notice: 'Hrate was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_hrate
      @hrate = Hrate.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def hrate_params
      params.fetch(:hrate, {})
    end
end
