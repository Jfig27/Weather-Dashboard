const mykey = "2ffb1a07bdd3a394fab41ed6a6dd030a";

$("#search-button").on("click", function () {
    var input = $("#input").val();
    $("#input").val("");
    weatherToday(input);
    weatherForecast(input)

    setTimeout(function(){ 
        console.log("getting.." + localStorage.getItem("city"))
    var searchHistory = localStorage.getItem("city");
    var searchDisplay = $("<button>").addClass("bg-dark text-light").text(searchHistory);
    $(".history").append(searchDisplay);
    }, 100);


});


function weatherToday(search) {
    let requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=" + mykey + "&units=imperial";
    fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data){

        var card = $("<div>").addClass("card bg-dark");
        var cardBody = $("<div>").addClass("card-body");

        var city = $("<h3>").addClass("card-title text-light").text(data.name + " ")
        var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

        var date = $("<p>").addClass("card-title text-light").text(new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString())
        var wind = $("<p>").addClass("card-text text-light").text("Wind Speed: " + data.wind.speed + " MPH");
        var humidity = $("<p>").addClass("card-text text-light").text("Humidity: " + data.main.humidity + "%");
        var temp = $("<p>").addClass("card-text text-light").text("Temperature: " + data.main.temp + " °F");

        // setTimeout(function(){ 
            $("#today").append(card);
            card.append(cardBody);
            city.append(img);
            cardBody.append(city, date, temp, humidity, wind)
    
            localStorage.setItem("city", data.name)
            console.log("should be "+localStorage.getItem("city"))
        // }, 100);


        $(".history").on("click", "button", function () {
            card.remove()? console.log("removed i think"): console.log("not removed i guess")
            weatherToday($(this).text());
            weatherForecast($(this).text());
        
        });
    })
}

function weatherForecast(search) {
    let requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + search + "&exclude=hourly&appid=" + mykey + "&units=imperial";
    fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data){ 
        console.log(data)

        $("#forecast").append(forecastHeader)
        var dayCounter = 0;
        var timeCounter = 4;
        for (var i = 0; i < 5; i++) {
            var card = $("<div>").addClass("card bg-dark");
            var cardBody = $("<div>").addClass("card-body");

            var forecastHeader = $("<h4>").addClass("card-title text-light").text("5 Day Forecast!")
            
            var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[dayCounter].weather[0].icon + ".png");
            var date = $("<p>").addClass("card-title text-light").text(new Date(data.list[dayCounter].dt_txt).toLocaleDateString() + 
            " " + new Date(data.list[timeCounter].dt_txt).toLocaleTimeString())

            var wind = $("<p>").addClass("card-text text-light").text("Wind Speed: " + data.list[dayCounter].wind.speed + " MPH");
            var humidity = $("<p>").addClass("card-text text-light").text("Humidity: " + data.list[dayCounter].main.humidity + "%");
            var temp = $("<p>").addClass("card-text text-light").text("Temperature: " + data.list[dayCounter].main.temp + " °F");
            var dayCounter = dayCounter += 8;
            var timeCounter = timeCounter += 8;

            card.append(cardBody)
            cardBody.append(img, date, temp, humidity, wind)
            $("#forecast").append(card)
        }    
        // $(".history").on("click", "button", function () {
        //     card.remove()
        //     weatherToday($(this).text());
        //     weatherForecast($(this).text());
        
        // });
    })
}
