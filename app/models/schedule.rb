class Schedule < ActiveRecord::Base
	belongs_to :trainer
	has_many :appointments

	class << self
		def getTimeSlots(scheduled_hours)
			@scheduled_hours = []
			scheduled_hours.each do |date|
				@scheduled_hours.push(date.hour)
			end 
			@hours = []
			@string_hours = []
			@this_hour = DateTime.now.hour.to_i
			while @this_hour < 24
				@this_hour += 1
				@hours.push(@this_hour)
			end 
			@hours = Schedule.tossConflictHours(@scheduled_hours, @hours)
			@hours = Schedule.stringify(@hours)
			return @hours
		end

		def tossConflictHours(scheduled_hours, hours)
			@unavailable_hours = hours - scheduled_hours
			@available_hours = hours - @unavailable_hours
		end 

		def stringify(hours)
			@strings = []
			hours.each do |hour|
				case hour
				when 1
						time = "1:00 AM"
							@strings.push(time) 
				when 2
						time = "2:00 AM"
							@strings.push(time)
					when 3
						time = "3:00 AM"
							@strings.push(time)
					when 4
						time = "4:00 AM"
							@strings.push(time)
					when 5
						time = "5:00 AM"
							@strings.push(time)
					when 6
						time = "6:00 AM"
							@strings.push(time)
					when 7
						time = "7:00 AM"
							@strings.push(time)
					when 8
						time = "8:00 AM"
							@strings.push(time)
					when 9
						time = "9:00 AM"
							@strings.push(time)
					when 10
						time = "10:00 AM"
							@strings.push(time)
					when 11
						time = "11:00 AM"
							@strings.push(time)
					when 12
						time = "12:00 PM"
							@strings.push(time)
					when 13
						time = "1:00 PM"
							@strings.push(time)
					when 14
						time = "2:00 PM"
							@strings.push(time)
					when 15
						time = "3:00 PM"
							@strings.push(time)
					when 16
						time = "4:00 PM"
							@strings.push(time)
					when 17
						time = "5:00 PM"
							@strings.push(time)
					when 18
						time = "6:00 PM"
							@strings.push(time)
					when 19
						time = "7:00 PM"
							@strings.push(time)
					when 20
						time = "8:00 PM"
							@strings.push(time)
					when 21
						time = "9:00 PM"
							@strings.push(time)
					when 22
						time = "10:00 PM"
							@strings.push(time)
					when 23
						time = "11:00 PM"
							@strings.push(time)
					when 24
						time = "12:00 AM"
							@strings.push(time)
					else

				end 
			end 
			@strings
		end 
	end  
end
