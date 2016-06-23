json.array!(@weights) do |weight|
  json.extract! weight, :id
  json.url weight_url(weight, format: :json)
end
