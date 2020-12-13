const success = (position) => {
	lat = position.coords.latitude;
	long = position.coords.longitude;
	console.log("called geolocation", lat, long);
	const xhr = new XMLHttpRequest();
	// xhr.open("GET", `https://us1.locationiq.com/v1/reverse.php?key=pk.e193b15d132399ec23bf976703433914&lat=${lat}&lon=${long}8&format=json`, true);
	// xhr.send();
	// xhr.onreadystatechange = processRequest;
	// xhr.addEventListener("readystatechange", processRequest, false);
	// function processRequest(e) {
	//     if (xhr.readyState == 4 && xhr.status == 200) {
	//         let response = JSON.parse(xhr.responseText);
	//         console.log(response.display_name);
	//     }
	// }
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
	fetch(
		`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=738952f7999eaeb9d5a1474457e4b67e&units=metric&exclude=hourly,minutely&mode=xml`
	)
		.then((response) => response.json())
		.then((data) => console.log(data))
		.catch((error) => alert("location error"));
	// if (response.ok)
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
