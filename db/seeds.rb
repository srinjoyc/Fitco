# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


Trainer.create(firstname: "Declan", lastname: "Foody", gender: "M", description: "Body Transformation Expert, Certified Personal Trainer", email: "charles.foody@mail.mcgill.ca", phone: "7788888888", url: "https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/s320x320/e15/11192872_1582522302026444_681742067_n.jpg")
Schedule.create(time: DateTime.new(2016,6,23), trainer_id: 1)


User.create(firstname:"Srinjoy", lastname: "Chakraborty", email:"srinjoycal@gmail.com", password: "123456")
User.create(firstname:"Declan", lastname: "Foody", email:"declan@gmail.com", password:"declan", workouthistory:"Epic", workoutgoals:"Get Yoked", age:"24", height: "181", weight: "203", idealweight:"190", image_url:"https://scontent-sea1-1.xx.fbcdn.net/v/t1.0-9/12119009_10153687348989511_8043081557208981017_n.jpg?oh=b05b2e2db0b9347b3398123dc53ae673&oe=57CEFA2D")
Trainer.create(firstname: "Declan", lastname: "Foody", gender: "M", description: "Body Transformation Expert, Certified Personal Trainer", email: "charles.foody@mail.mcgill.ca", phone: "7788888888", url: "https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/s320x320/e15/11192872_1582522302026444_681742067_n.jpg")
Schedule.create(time: DateTime.new(2016,6,23), trainer_id: 1)
Schedule.create(time: DateTime.new(2016,6,22,5,0,0,0), trainer_id: 1)
Schedule.create(time: DateTime.new(2016,6,22,15,0,0,0), trainer_id: 1)
Schedule.create(time: DateTime.new(2016,6,22,12,0,0,0), trainer_id: 1)
Schedule.create(time: DateTime.new(2016,6,22,14,0,0,0), trainer_id: 1)
Appointment.create(user_id: 1, trainer_id: 1, time: DateTime.new(2016,6,23), video_url:"/videos/9320")
Exercise.create(appointment_id: 1, users_id: 1, name: "Push Ups", metric: "10 reps, 3 sets", description: "Bodyweight")
Exercise.create(appointment_id: 1, users_id: 1, name: "Burpees", metric: "10 reps, 3 sets", description: "Bodyweight")
Exercise.create(appointment_id: 1, users_id: 1, name: "Squats", metric: "10 reps, 3 sets", description: "Bodyweight")
Exercise.create(appointment_id: 1, users_id: 1, name: "Lunges", metric: "10 reps, 3 sets", description: "Bodyweight")
Exercise.create(appointment_id: 1, users_id: 1, name: "Mountain Climbers", metric: "10 reps, 3 sets", description: "Bodyweight")
Exercise.create(appointment_id: 1, users_id: 1, name: "Plank", metric: "10 reps, 3 sets", description: "Bodyweight")
Exercise.create(appointment_id: 1, users_id: 1, name: "Pull Ups", metric: "10 reps, 3 sets", description: "Bodyweight")
Exercise.create(appointment_id: 1, users_id: 1, name: "Dips", metric: "10 reps, 3 sets", description: "Bodyweight")
Exercise.create(appointment_id: 1, users_id: 1, name: "Pull Ups", metric: "10 reps, 3 sets", description: "Bodyweight")
Weight.create(weight: 150, user_id: 1)
Weight.create(weight: 155, user_id: 1)
Weight.create(weight: 140, user_id: 1)
Hrate.create(heart_rate: 72, user_id: 1)
Hrate.create(heart_rate: 62, user_id: 1)
Hrate.create(heart_rate: 92, user_id: 1)