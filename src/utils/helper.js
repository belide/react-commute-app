export function timeStampToDate(timeStamp){

	const weekDayMap = {
	  0: "Sunday", 
	  1: "Monday", 
	  2: "Tuesday", 
	  3: "Wednesday", 
	  4: "Thursday", 
	  5: "Friday", 
	  6: "Saturday"
	}
	const time = new Date(timeStamp); 
	const dayName = weekDayMap[time.getDay()]; 
	const dayTime = time.getHours(); 
	const amOrPm = (time) => time >= 12 ? "PM" : "AM" ; 
	return `${dayName}, ${dayTime}${amOrPm(dayTime)}`
}


