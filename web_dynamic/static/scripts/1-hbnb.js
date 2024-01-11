$(function() {
  const amanities = {};
  $('input type="checkbox"').change(function () {
    if (this.checked) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenities[$(this).attr('data-id)];
    }
    const names =Object.values(amenities);
    if (names.length > 0) {
      $('div.amenities > h4').text(names.json(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });
});
