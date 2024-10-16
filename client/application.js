/*function getBathValue() {
    var uiBathrooms = document.getElementsByName("bath");
    for(var i in uiBathrooms) {
      if(uiBathrooms[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function getBedValue() {
    var uiBHK = document.getElementsByName("bed");
    for(var i in uiBHK) {
      if(uiBHK[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }

function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("total_sqft");
    var bed = getBedValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");
  
    url = "http://127.0.0.1:5000/predict_house_price"; 
  
    $.post(url, {
        total_sqft: parseFloat(sqft.value),
        bed: bed,
        bath: bathrooms,
        location: location.value
    },function(data, status) {
        console.log(data.price_prediction);
        estPrice.innerHTML = "<h2>" + data.price_prediction.toString() + " Lakh</h2>";
        console.log(status);
    });
  }
*/
function onClickedEstimatePrice(event) {
    event.preventDefault();
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("total_sqft").value; // Get value directly
    var bed = document.getElementById("bed").value; // Get value directly
    var bathrooms = document.getElementById("bath").value; // Get value directly
    var location = document.getElementById("uiLocations").value; // Get selected location
    var estPrice = document.getElementById("uiEstimatedPrice");

    //var url = "http://127.0.0.1:5000/predict_house_price"; 
    var url = "/api/predict_house_price"; // for nginx server

    // Send the AJAX POST request
    $.post(url, {
        total_sqft: parseFloat(sqft),
        bed: parseInt(bed),
        bath: parseInt(bathrooms),
        location: location
    }, function(data, status) {
        console.log(data.estimated_price); // Use 'estimated_price' instead of 'price_prediction'
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
        console.log(status);
    });
}

function onPageLoad() {
    console.log( "document loaded" );
    // var url = "http://127.0.0.1:5000/get_location_names"; 
    var url = "/api/get_location_names"; 
    $.get(url,function(data, status) {
        console.log("got response for get_location_names request");
        if(data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
  }
  
window.onload = onPageLoad;
