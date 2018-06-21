const $ = require('jquery');

function getYear() {
  const date = new Date();
  const year = date.getFullYear();
  $('.year').text(year);
}

$(document).ready(() => {
  getYear();
});
