const $ = require('jquery');
const Barba = require('barba.js');

function getYear() {
  const date = new Date();
  const year = date.getFullYear();
  $('.year').text(year);
}

Barba.Dispatcher.on('newPageReady', () => {
  getYear();
});
