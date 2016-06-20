OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, '608724582620949', '2e3a5380e0366f1a2fdd245cdc805010', {:client_options => {:ssl => {:ca_file => Rails.root.join("cacert.pem").to_s}}}
end