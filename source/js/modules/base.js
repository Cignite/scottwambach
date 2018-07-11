const Barba = require('barba.js');

Barba.Pjax.Dom.wrapperId = 'body-container';
Barba.Pjax.Dom.containerClass = 'inner-container';

Barba.Pjax.start();

Barba.Prefetch.init();
