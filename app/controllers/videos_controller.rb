require "#{Rails.root}/lib/video_session"

# TODO: Jeremy says that this should be renamed to AppointmentsController, blah blah

class VideosController < ApplicationController

	@@sessions = {}

	def index
		
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

	def create

	end 

end
