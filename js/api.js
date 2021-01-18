/*$(documet).ready(function(){

    $('submitWeather').click(function(){

        var city = $("#city").val();

        if(city != ''){

            $ajax({

                url: 
                type: "GET",
                dataType: "jsonp",
                success: function(data){
                    console.log(data);
                } 
            });

        } else {
            $("error").html('Error);
        }

    });
    
});*/

const clickHandler = async () => {
    const townTitle = document.getElementById("town").value;
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const url = 'https://api.meteo.lt/v1/places/{place-code}/forecasts/{forecast-type}' + townTitle;
        
    const response = await fetch(proxy+url);
    const { results } = await response.json();
        
    if (results[0]) { 
        const {airTemperature, cloudCover, windSpeed} = results[0]
        document.getElementById('temperature').innerHTML = airTemperature;
        document.getElementById('cloud').src = cloudCover;
        document.getElementById('speed').innerHTML = windSpeed;
    } else alert("Miestas nerastas.")
}