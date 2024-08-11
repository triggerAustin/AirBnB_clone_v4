$(document).ready(function () {
    // This empty object is to keep track of the selected amenities.
    const amenities = {};

    $(document).on('change', "input[type='checkbox']", function () {
        // Check if the checkbox is checked or not
        if (this.checked) {
            // Add the amenity to the object
            amenities[$(this).data('id')] = $(this).data('name');
        } else {
            // Remove the amenity from the object
            delete amenities[$(this).data('id')];
        } 

        const names_of_Amenities = Object.values(amenities);
        if (names_of_Amenities.length > 0) {
            $('div.amenities > h4').text(names_of_Amenities.join(', '));
        } else {
            $('div.amenities > h4').html('&nbsp;');
        } 
    });

    // API request to get status code of response
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
        if (textStatus === 'success' && data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });

    // Fetch places (task 4)
    $.ajax({
        // Specify the HTTP method as POST
        type: 'POST',
        // URL of the API endpoint
        url: 'http://0.0.0.0:5001/api/v1/places_search',
        data: '{}',  // empty JSON object
        // expect and specify the content and the reponse as JSON
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) { // this function is to be executed if the request was successful. 
            for (let i = 0; i < data.length; i++) {
                let place = data[i];
                $('.places').append(
                    '<article>' +
                    '<h2>' + place.name + '</h2>' +
                    '<div class="price_by_night"><p>$' + place.price_by_night + '</p></div>' +
                    '<div class="information">' +
                    '<div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div>' +
                    '<div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div>' +
                    '<div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div>' +
                    '</div>' +
                    '<div class="description"><p>' + place.description + '</p></div>' +
                    '</article>'
                );
            }
        }
    });

    // Filter places by Amenity (task 5)
    $('.filters > button').click(function () {
        $('.places > article').remove(); // remove all articl elements  from  places section
        $.ajax({
            // Specify the HTTP method as POST
            type: 'POST',
            // URL of the API endpoint
            url: 'http://0.0.0.0:5001/api/v1/places_search',
            // a JSON object containing the selected amenities
            data: JSON.stringify({'amenities': Object.keys(amenities)}),
            // expect and specify the content and the reponse as JSON
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) { // this function is to be executed if the request was successful.
                for (let i = 0; i < data.length; i++) {
                    let place = data[i];
                    $('.places').append(
                        '<article>' +
                        '<h2>' + place.name + '</h2>' +
                        '<div class="price_by_night"><p>$' + place.price_by_night + '</p></div>' +
                        '<div class="information">' +
                        '<div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div>' +
                        '<div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div>' +
                        '<div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div>' +
                        '</div>' +
                        '<div class="description"><p>' + place.description + '</p></div>' +
                        '</article>'
                    );
                }
            }
        });
    });
});
