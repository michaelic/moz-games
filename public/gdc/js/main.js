(function () {
  if ('serviceWorker' in navigator) {
    // Service Workers require HTTPS (http://goo.gl/lq4gCo). `localhost`
    // on a custom port is whitelisted.
    if (location.protocol === 'file:') {
      // Just don't execute the SW code if we're viewing the document.
      return;
    }
    if (location.protocol === 'http:' &&
        (!location.port || location.port === '80')) {
      // Change the protocol to HTTPS if we're running on a real server.
      location.protocol = 'https:';
    }

    if (localStorage.disable_sw) {
      console.log('Service Workers are temporarily disabled');
      navigator.serviceWorker.getRegistration('./sw.js').then(function (sw) {
        if (sw) {
          console.log('Temporarily disabling Service Workers, unregistering…');
          sw.unregister();
        }
      });
      return;
    }

    navigator.serviceWorker.register('./sw.js', {scope: './'}).then(function (sw) {
      if (navigator.serviceWorker.controller) {
        console.log('Page successfully fetched from cache by the Service Worker');
      } else {
        console.log('Page successfully registered by the Service Worker');
      }
    }).catch(function (err) {
      console.error('Service Worker error occurred: ' + err);
    });
  } else {
    console.warn('Service Workers are not supported in your browser');
  }
})();

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-49796218-16', 'auto');
ga('send', 'pageview');
