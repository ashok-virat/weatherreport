$(document).ready(()=>{
let api="aa84ceefa0c4a115d4e54d06ebe74ed2";
let units="imperial";
let URL="https://api.openweathermap.org/data/2.5/weather?"
let searchmethod;

function getsearchmethod(searchterm) {
      if(searchterm.length ===5 && parseInt(searchterm)+""===searchterm) {

      	searchmethod="zip"
      }
      else { 
      	searchmethod="q"
      }
}

function searchweather(searchterm) {
         getsearchmethod(searchterm)
  $.getJSON(`${URL}${searchmethod}=${searchterm}&APPID=${api}&units=${units}`,function(data) {

    init(data)
  })
  }
function init(searchfromserver) {
	switch (searchfromserver.weather[0].main){

		case "Clouds":
          $("body").css("background-image", "url('image/cloudy.jpg')")
         break;
        case "Clear":
         $("body").css("background-image", "url('image/clear.jpg')")
	     break;
	    case "Rain":
	    case "Drizzle":
	    case "Mist":
        $("body").css("background-image", "url('image/rain.jpg')")
	     break;
	      case "Dust":
        $("body").css("background-image", "url('image/dust.jpg')")
	     break;
	     case "Thunderstorm":
        $("body").css("background-image", "url('image/storm.jpg')")
	     break;
	     case "Snow":
        $("body").css("background-image", "url('image/snow.jpg')")
	     break;
	     default:
        $("body").css("background-image", "url('image/default.jpg')")
	     break;
	}
	let weatherIcon=$("#documenticonimg")[0]
     weatherIcon.src="http://openweathermap.org/img/w/"+searchfromserver.weather[0].icon+".png";
     let resultdescription=searchfromserver.weather[0].description;
         $("#weatherdescriptionheader").text(resultdescription);
      let resulttemperature="Temp: "+Math.floor(searchfromserver.main.temp)+"°c"
         $("#temperature").text(resulttemperature);
       let resultwindspeed="Windspeed at "+Math.floor(searchfromserver.wind.speed)+"m/s"
         $("#windspeed").text(resultwindspeed);
         let resulthumidity="Humidity letvel at "+(searchfromserver.main.humidity)+"%"
         $("#humidity").text(resulthumidity);
           let resultname="City:"+searchfromserver.name
         $("#cityheader").text(resultname);
          let resultcountry="Country:"+searchfromserver.sys.country;
         $("#countryheader").text(resultcountry);
         weathersetposition(searchfromserver)
     }
     function weathersetposition(searchfromserver) {
     $(".weathercontainer").addClass("setpositon")
     }
$("#searchbtn").click(()=> {
	let searchterm=$("#searchinput").val();
	if(searchterm) {
	searchweather(searchterm)
  }
  
 })
})









