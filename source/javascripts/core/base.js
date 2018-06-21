const $ = require('jquery');
const Instafeed = require('instafeed.js');

function getYear() {
  const date = new Date();
  const year = date.getFullYear();
  $('.year').text(year);
}

$(document).ready(() => {
  getYear();
});

const feed = new Instafeed({
  get: 'tagged',
  tagName: 'awesome',
  clientId: '8d733874853341d2bec0b929411b75f4',
  accessToken: '12752195.1677ed0.8274541354a84f12a7bfc80f1f16a452',
});
feed.run();
