require 'opentok'

raise "You must define API_KEY and API_SECRET environment variables" unless ENV.has_key?("API_KEY") && ENV.has_key?("API_SECRET")

class Videos < ActiveRecord::Base

	class << self 

		def getAPIKey
			@key = ENV['API_KEY']
		end 

		def getAPISecret
			@opentok = OpenTok::OpenTok.new(ENV['API_KEY'], ENV['API_SECRET'])
		end 

		def getSession	
			opentok = OpenTok::OpenTok.new(ENV['API_KEY'], ENV['API_SECRET'])
			session = opentok.create_session
			session_id = session.session_id
		end

		def getToken	
			opentok = OpenTok::OpenTok.new(ENV['API_KEY'], ENV['API_SECRET']) 
      session = opentok.create_session
      token = opentok.generate_token session
		end

	end 

end 
