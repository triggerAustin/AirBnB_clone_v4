$(document).ready(function () {
    //require the request module for api call
    const request = require('request');
    //this empty object is to keep track the selected amenities.
    const amenities = {};
    $(document).on('change', "input[type='checkbox']", function () {
        // Check if the checkbox is checked or not
        if (this.checked) {
            // add the amenity to the object
        amenities[$(this).data('id')] = $(this).data('name');
      } else {
            // remove amenity from the object
        delete amenities[$(this).data('id')];
      } 
      const names_of_Amenities = Object.values(amenities);
      if (names_of_Amenities.length > 0) {
        $('div.amenities > h4').text(Object.values(amenities).join(', '));
      } else {
        $('div.amenities > h4').html('&nbsp;');
      } 
    });

    //API request to get status code of response
    request('http://0.0.0.0:5001/api/v1/status/', (err, res, body) => {
        if (res.statusCode == 'OK'){
	    $('api_status').removeClass('unavailable');
	    $('api_status').addClass('available');
      }
      else{
            $('api_status').removeClass('available');
	    $('api_status').addClass('unavailable');
      }
    });
  });
