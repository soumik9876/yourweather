const success = (position) => {
	// console.log(position);
	lat = position.coords.latitude;
	long = position.coords.longitude;
	console.log("called geolocation", lat, long);

	// let address;
	// fetch(
	//     `https://us1.locationiq.com/v1/reverse.php?key=pk.e193b15d132399ec23bf976703433914&lat=${lat}&lon=${long}8&format=json`
	// )
	//     .then((response) => response.json())
	//     .then((data) => {
	//         address = data;
	//         console.log(address);
	//         console.log(data);
	//     }
	//     );
	// fetch(
	// 	`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=738952f7999eaeb9d5a1474457e4b67e&units=metric`
	// )
	// 	.then((response) => response.json())
	// 	.then((data) => console.log(data))
	// 	.catch((error) => alert("location error"));
	// fetch(
	// 	`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=738952f7999eaeb9d5a1474457e4b67e&units=metric&exclude=hourly,minutely`
	// )
	// 	.then((response) => response.json())
	// 	.then((data) => console.log(data))
	// 	.catch((error) => alert("location error"));

	// Get location key and city name from lat and long

	let loc_detail = call_location_api();
	let loc_key = loc_detail.Key;

	// Get current weather info with location key
	let cur_weather = new XMLHttpRequest();
	cur_weather.open(
		"GET",
		`http://dataservice.accuweather.com/currentconditions/v1/${loc_key}?apikey=SXuRj03zWnFObfjAQHO6uHipc16iGpYF&details=true`,
		false
	);
	cur_weather.send();
	cur_weather = JSON.parse(cur_weather.responseText);
	console.log(cur_weather);
	set_cur_condition(cur_weather);
	// Get daily forecast from location key
	let today_weather = new XMLHttpRequest();
	today_weather.open(
		"GET",
		`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${loc_key}?apikey=SXuRj03zWnFObfjAQHO6uHipc16iGpYF&metric=true&details=true`,
		false
	);
	today_weather.send();
	today_weather = JSON.parse(today_weather.responseText);
	console.log(today_weather);
	daily_condition(today_weather);
	return;
};

const error = (error) => {
	console.log(error);
};

options = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0,
};

navigator.geolocation.getCurrentPosition(success, error, options);

const call_location_api = () => {
	let loc_detail = new XMLHttpRequest();
	loc_detail.open(
		"GET",
		`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=SXuRj03zWnFObfjAQHO6uHipc16iGpYF&q=${lat}%2C${long}`,
		false
	);
	loc_detail.send();
	loc_detail = JSON.parse(loc_detail.responseText);
	console.log(loc_detail);
	document.querySelector("#address").innerText = loc_detail.EnglishName+','+loc_detail.Country.EnglishName;
	return loc_detail;
};

const set_cur_condition = (cur_weather) => {
	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	let curdate = new Date(cur_weather[0].LocalObservationDateTime);
	let dayname = days[curdate.getDay()],
		hour = curdate.getHours(),
		min = curdate.getMinutes();
	if (hour > 12) hour -= 12;
	if (min < 10) min = `0${min}`;
	let time = `${hour}:${min}`;
	if (hour >= 12) time += " PM";
	else time += " AM";
	time += `,${dayname}`;
	document.querySelector("#date-time").innerText = time;
	document.querySelector("#cur-temp").innerText = Math.round(
		cur_weather[0].Temperature.Metric.Value
	);
	document.querySelector("#condition").innerText = cur_weather[0].WeatherText;
	document.querySelector("#feel-temp").innerText = Math.round(
		cur_weather[0].RealFeelTemperature.Metric.Value
	);
	let w_icon = cur_weather[0].WeatherIcon;
	if (w_icon < 10) w_icon = "0" + w_icon;
	document
		.querySelector("#w-icon")
		.setAttribute(
			"src",
			`https://developer.accuweather.com/sites/default/files/${w_icon}-s.png`
		);
	document.querySelector('#humidity').innerText = cur_weather[0].RelativeHumidity;
	document.querySelector('#wind').innerText = cur_weather[0].Wind.Speed.Metric.Value;
	document.querySelector('#prec').innerText = cur_weather[0].PrecipitationSummary.Precipitation.Metric.Value;
};

const daily_condition = (today_weather) => {
	document.querySelector("#mx-temp").innerText = Math.round(
		today_weather.DailyForecasts[0].Temperature.Maximum.Value
	);
	document.querySelector("#mn-temp").innerText = Math.round(
		today_weather.DailyForecasts[0].Temperature.Minimum.Value
	);
};
