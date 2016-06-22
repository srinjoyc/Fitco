# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.create(firstname:"Srinjoy", lastname: "Chakraborty", email:"srinjoycal@gmail.com", password: "1234")
Trainer.create(firstname: "Declan", lastname: "Foody", gender: "M", description: "Body Transformation Expert, Certified Personal Trainer", email: "charles.foody@mail.mcgill.ca", phone: "7788888888", url: "https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/s320x320/e15/11192872_1582522302026444_681742067_n.jpg")
Schedule.create(time: DateTime.new(2016,6,23), trainer_id: 1)
Schedule.create(time: DateTime.new(2016,6,22,5,0,0,0), trainer_id: 1)
Schedule.create(time: DateTime.new(2016,6,22,6,0,0,0), trainer_id: 1)
Appointment.create(user_id: 1, trainer_id: 1, time: DateTime.new(2016,6,23))
Exercise.create(appointment_id: 1, users_id: 1, name: "Push Ups", metric: "10 reps", description: "Chin to the ground")
