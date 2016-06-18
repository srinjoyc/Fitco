require "#{Rails.root}/lib/video_session"

# TODO: Jeremy says that this should be renamed to AppointmentsController, blah blah

class VideosController < ApplicationController

	@@sessions = {}

	def index
		# Jeremy says we don't want any routes other than /videos/:id
		@video_session = VideoSession.new()

		# @api_key = Videos.getAPIKey()
  #   @session_id = Videos.getSession()
  #   @token = Videos.getToken();
  # 	puts "unsliced token: #{@token}"

    # @locals = {
    #   :api_key => api_key,
    #   :session_id => session_id,
    #   :token => token
    # }

    render :index
	end

	def show
		# Good idea for later: @appt = Appointments.find(params[:id])
		@appt = {id:5}	# bullshit dummy code, to get around lack of suitable AR/DB class
		@video_session = @@sessions[@appt[:id]]			# violates REST (real REST and rails REST)
		if !@video_session
			@video_session = @@sessions[@appt[:id]] = VideoSession.new()
		end

		render :index ## temporary foolishness
	end
end
