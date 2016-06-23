json.array!(@hrates) do |hrate|
  json.extract! hrate, :id
  json.url hrate_url(hrate, format: :json)
end
