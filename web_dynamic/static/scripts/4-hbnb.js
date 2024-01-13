$(function() {
  const amenities = {};
  $('input[type="checkbox"]').change(function () {
    if (this.checked) {
      amenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenities[$(this).data('id')];
    }
    const names =Object.values(amenities);
    if (names.length > 0) {
      $('div.amenities > h4').text(names.join(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });
});

// Wait for DOM content to load- GET Request
$(function() {
  // Make a GET request to the API endpoint
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    // Get the div#api_status element
    const apiStatusDiv = $('#api_status');

  // Check the status
  if (data.status === 'OK') {
    // Add class 'available' to div#api_status if status is 'OK'
    apiStatusDiv.addClass('available');
  } else {
    apiStatusDiv.removeClass('available');
  }
  })
  .fail(function (error) {
    console.error('error fetching API status', error);
  });
});

// Wait for DOM content to load- POST Request on button click
$('button').click(function() {
  //Make a POST request
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({amenities: Object.keys(amenities) }),
    success: function (data) {
      //clear existing articles
      $('section.places').empty();

      // Loop through the results and create article tags for Places
      data.forEach(function(place) {
        const article = $('<article>');

        // Create the title
        const title = $('<div class="title_box">');
        title.append(`<h2>${place.name}</h2>`);
        title.append(`<div class="price_by_night">$${place.price_by_night}</div>`);
        article.append(title);

        // Create info div
        const info = $('<div class="info"');
        info.append(`<div class="max_guest">${pace.max_guest} Guest${pace.max_guest !== 1 ? 's' : ''}</div>`);
        info.append(`<div class="number_rooms">${place.number_rooms} Bedroom${pace.number_rooms !== 1 ? 's' : ''}</div>`);
        info.append(`<div class="number_bathrooms">${place.number_bathrooms} Bathroom${pace.number_bathrooms !== 1 ? 's' : ''}</div>`);
        article.append(info);

        // Create description div
        const description = $('<div class="description">');
        description.html(place.description);
        article.append(description);

        // Append the article to the places Section
        placesSection.append(article);
      });
    },
    error: function (error) {
      console.error('error fetching places data', error);
    }
  });
});
