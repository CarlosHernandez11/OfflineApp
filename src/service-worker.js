/**
 * Check out https://googlechrome.github.io/sw-toolbox/docs/master/index.html for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */


'use strict';
importScripts('./build/sw-toolbox.js');

self.toolbox.options.cache = {
  name: 'ionic-cache'
};

// pre-cache our key assets
self.toolbox.precache(
  [
    './build/main.js',
    './build/main.css',
    './build/polyfills.js',
    'index.html',
    'manifest.json'
  ]
);

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.cacheFirst);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;

self.addEventListener('install', function(event){
  // only happens once for this version of the service worker
  // wait until the install event has resolved
  event.waitUntil(
    // then create our named cached
    caches
    .open('my-sw-cache')
    .then(function(cache) {
      // once created, lets add some local resouces
      return cache.addAll([
        './build/main.js',
        './build/main.css'
      ]);
    })
    .then(function(){
      console.log('Service worker is ready, and assets are cached');
    })
  )
})