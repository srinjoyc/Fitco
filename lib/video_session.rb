class VideoSession

	attr_reader :api_key, :api_secret

	def initialize(api_key = nil, api_secret = nil)
		@api_key = api_key || ENV['API_KEY']
		@api_secret = api_secret || ENV['API_SECRET']

		
		@opentok = OpenTok::OpenTok.new(@api_key, @api_secret)
		# puts @opentok
		@session = @opentok.create_session
	end

	def token
		@opentok.generate_token @session
	end

	def session_id
		@session.session_id
	end

end