var stop = false;
var apikeygoogle = config.googleapikey;
var apikeyweather = config.weatherapikey;

function loadinganm() {
	let logo = document.getElementById("spacexloading");
	let loading = document.getElementById("loading");
	let wrapper = document.getElementById("wrapper");
	let div = document.getElementById("loadingdiv");
	let icon = document.getElementById("weathericon");

	if (stop == true) {
			TweenMax.to(loading, 1.5, {opacity: 0})
			TweenMax.to(logo, 1.5, {opacity: 0})
			TweenMax.to(loading, 0.5, {display: 'none'}).delay(1)
			TweenMax.to(logo, 0.5, {display: 'none'}).delay(1)
			TweenMax.to(div, 0.5, {display: 'none'}).delay(1)
			TweenMax.to(wrapper, 2, {opacity: 1}).delay(1.5)
			TweenMax.to(wrapper, 0, {display: 'grid'}).delay(1.6)
			var tl = new TimelineMax({ repeat: -1, repeatDelay: 0})
				.to(icon, 2, {ease: Power2.easeInOut, y: -10})
				.to(icon, 2, {ease: Power2.easeInOut, y: 0})	
				.to(icon, 0, {margin: 'auto'});
	} else {
		console.log("loading...")
		TweenMax.to(loading, 3, {rotation:"+=360"})
		setTimeout(loadinganm, 500);
	}

}

window.addEventListener('load', ()=>  {
	loadinganm();
	var long;
	var lati;
	if(navigator.geolocation){
		console.log("checking coördinats")
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lati = position.coords.latitude;
			checkTemp();
		});
	}	

	function checkTemp() {
		console.log("longitude: " +long+ " latitude: " +lati+ " acquired");
		let api = 'https://api.openweathermap.org/data/2.5/weather?lat='+lati+'&lon='+long+'&units=metric&APPID=d0dd4871ed99313070f4b3cddec9c089';
		let icon = document.getElementById("weathericon");
		let landingcheck1 = false;

		fetch(api)
			.then(response => {
				return response.json();
			})
			.then(data => {
				console.log("data acquired");
				document.getElementById("tempature").innerHTML = data.main.temp+"C"; 
				document.getElementById("location").innerHTML = data.name; 
				let winddr = document.getElementById("winddirection");
				let windNSWE = document.getElementById("windNSWE");
				let windrot = data.wind.deg;
				let windspeed = data.wind.speed;
				let icondata = data.weather[0].main;
				let icon = document.getElementById("weathericon");

				if (icondata == "Clear") {
					icon.src="Icons/weatherIcon/sun.svg";
					landingcheck1 = true;
				} else if (icondata == "Clouds") {
					icon.src="Icons/weatherIcon/cloudy.svg";
					landingcheck1 = true;
				} else if (icondata == "Snow") {
					icon.src="Icons/weatherIcon/snowflake.svg";
				} else if (icondata == "Rain") {
					icon.src="Icons/weatherIcon/rainy.svg";
				} else if (icondata == "Drizzle") {
					icon.src="Icons/weatherIcon/cloudy.svg";
					landingcheck1 = true;
				} else if (icondata == "Thunderstorm") {
					icon.src="Icons/weatherIcon/thunder.svg";
				} 


				if (windrot <= 22.5 && windrot >= 0 || windrot <= 359.99 && windrot >=337.5) {
					windNSWE.innerHTML = windspeed + "m/s N";
				} else if (windrot >= 22.6 && windrot <= 67.5){
					windNSWE.innerHTML = windspeed + "m/s NE";
				} else if (windrot >= 67.6 && windrot <= 112.5){
					windNSWE.innerHTML = windspeed + "m/s E";
				} else if (windrot >= 112.5 && windrot <= 157.5){
					windNSWE.innerHTML = windspeed + "m/s SE";
				} else if (windrot >= 157.6 && windrot <= 202.5){
					windNSWE.innerHTML = windspeed + "m/s S";
				} else if (windrot >= 202.6 && windrot <= 247.5){
					windNSWE.innerHTML = windspeed + "m/s SW";
				} else if (windrot >= 247.6 && windrot <= 292.5){
					windNSWE.innerHTML = windspeed + "m/s W";
				} else if (windrot >= 292.6 && windrot <= 337.4){
					windNSWE.innerHTML = windspeed + "m/s NW";
				} else {
					windNSWE.innerHTML = windspeed + "m/s no direction";
				}
				TweenMax.to(winddr, 3, {rotation: windrot})

				let checkicon1 = document.getElementById("forecast");
				let checkicon2 = document.getElementById("windcheck");

				if (windspeed < 12 && landingcheck1 == true) {
					checkicon1.src="Icons/success.svg";
					checkicon2.src="Icons/success.svg";
					document.getElementById("clearedforlanding").innerHTML = "Cleared for landing";
				}

				stop = true;
			});
		setTimeout(checkTemp, 600000);
		}
});

function barButton () {
	let bar = document.getElementById("barButton");
	let type = "bar";
	checkForDrink(type);
}

function restaurantButton () {
	let bar = document.getElementById("restaurantButton");
	let type = "restaurant";
	checkForDrink(type);
}

function supermarketButton () {
	let bar = document.getElementById("supermarketButton");
	let type = "supermarket";
	checkForDrink(type);
}
function checkForDrink (type) {
	var long;
	var lati;
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lati = position.coords.latitude;
			checkDrink();
		});
	}	

	function checkDrink() {
		let api2 = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=52.3794234,4.6380017&radius=1500&type=bar&key=AIzaSyA-X4c0IpCt5uA35U3_8pSuedt9o3ETgeM';
		fetch(api2)
			.then(response => {
			return respone.json();
		})
		.then(data => {
			console.log(data);
		});
	}

}



function startTime() {
	//making variables for seconds, minutes, hours
	var today = new Date();
		h = today.getHours();
		m = today.getMinutes();
		s = today.getSeconds();

		gradient1 = document.getElementById("gradientcolor1");
		gradient2 = document.getElementById("gradientcolor2");

	//Changing the gradient in the clock according to the time
	if (h <= 7 && h >= 0) {
		TweenMax.to(gradient1, 3, {stopColor: "#2C5364", ease: Sine.easeOut})
		TweenMax.to(gradient2, 3, {stopColor: "#0F2027", ease: Sine.easeOut})
	}

	else if (h >= 7 && h <= 9) {
		TweenMax.to(gradient1, 3, {stopColor: "#2C5364", ease: Sine.easeOut})
		TweenMax.to(gradient2, 3, {stopColor: "#ffd452", ease: Sine.easeOut})
	}

	else if (h >= 10 && h <= 11) {
		TweenMax.to(gradient1, 3, {stopColor: "#ffd452", ease: Sine.easeOut})
		TweenMax.to(gradient2, 3, {stopColor: "#6DD5FA", ease: Sine.easeOut})
	}

	else if (h >= 12 && h <= 17) {
		TweenMax.to(gradient1, 3, {stopColor: "#6DD5FA", ease: Sine.easeOut})
		TweenMax.to(gradient2, 3, {stopColor: "#2980B9", ease: Sine.easeOut})
	}

	else if (h >= 18 && h <= 19) {
		TweenMax.to(gradient1, 3, {stopColor: "#2980B9", ease: Sine.easeOut})
		TweenMax.to(gradient2, 3, {stopColor: "#fdbb2d", ease: Sine.easeOut})
	}
	else if (h >= 20 && h <= 21) {
		TweenMax.to(gradient1, 3, {stopColor: "#2980B9", ease: Sine.easeOut})
		TweenMax.to(gradient2, 3, {stopColor: "#373B44", ease: Sine.easeOut})
	}

	else {
		TweenMax.to(gradient1, 3, {stopColor: "#373B44", ease: Sine.easeOut})
		TweenMax.to(gradient2, 3, {stopColor: "#2C5364", ease: Sine.easeOut})
	}

	setTimeout(startTime, 1000);
}

