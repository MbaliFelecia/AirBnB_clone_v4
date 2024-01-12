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

// Wait for DOM content to load
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
