// Wait for DOM content to load
$(function() {
  // Make a GET request to the API endpoin
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
  });
  .fail(function (error) {
    console.error('error fetching API status', error);
  });
});
