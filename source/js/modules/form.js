/* eslint-disable no-alert, no-console */
const $ = require('jquery');

$('#contact').submit(function formSubmition(e) {
  e.preventDefault();

  const $form = $(this);
  $.post($form.attr('action'), $form.serialize()).then(() => {
    alert('Thank you!');
  });
});
