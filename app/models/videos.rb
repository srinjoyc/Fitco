require 'twilio-ruby'
require 'dotenv'
require 'faker'
require 'json'

class Videos < ActiveRecord::Base

	class << self 
		def getToken
			identity = Faker::Internet.user_name
		  # Create an Access Token for Video usage
		  token = Twilio::Util::AccessToken.new ENV['TWILIO_ACCOUNT_SID'],
		  ENV['TWILIO_API_KEY'], ENV['TWILIO_API_SECRET'], 3600, identity
		  # Grant access to Conversations
		  grant = Twilio::Util::AccessToken::ConversationsGrant.new
		  grant.configuration_profile_sid = ENV['TWILIO_CONFIGURATION_SID']
		  token.add_grant grant
		  # Generate the token and send to client
		  json = { :identity => identity, :token => token.to_jwt }.to_json
		end 
	end 

end
