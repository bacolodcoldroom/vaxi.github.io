const cacheName = 'CC_123456';
/*
Copyright 2015, 2019, 2020, 2021 Google LLC. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

// Incrementing OFFLINE_VERSION will kick off the install event and force
// previously cached resources to be updated from the network.

const OFFLINE_VERSION = 1;
const CACHE_NAME = 'offline';
// Customize this with a different URL if needed.
const OFFLINE_URL = 'offline.html';

const staticAssets = [
  './',
  './index.html',
  './gfx/icon-512x512.png',  './gfx/icon-192x192.png',  
  './gfx/jadmin.jpg',

  './misc/jbe_fmlib.js', './misc/jbe_map.js',
  './main_styles.css',   './mobile.css',

  './js/leaflet.js',              './js/leaflet.css',
  './js/images/jRedMarker.png',   './js/images/jblueMarker.png',
  './js/images/layers.png',       

  './js/axios.min.js',  './js/enadlib.js',   './js/coke.js',     './js/je_msg.js',
    
   
  './app_admin.js', 
  './app_camera.js', 
  './app_daily.js',   
  './app_db.js', 
  './app_dtr.js', 
  './app_idx.js', 
  './app_main.js', 
  './app_prn.js', 
  './app_report.js', 
  './app_setting.js',     
  './rep_dtr.js', './rest_api.js',     
  
  '../gfx/snd/chimes.mp3', 
  './gfx/proc_logo.gif',  
  './gfx/jprn.png', './gfx/jrefresh.png', './gfx/jpdf.png',

  './gfx/avatar.png',    './gfx/dots.png',    
  './gfx/jadd.png',      './gfx/jback.png',  
  './gfx/jbell.png',     './gfx/jcall.png',
  './gfx/jcam.png',      './gfx/jcancel.png', 
  './gfx/jcart.png',     './gfx/jcategory.png', 
  './gfx/jchat.png',     './gfx/jdele.png',  
  './gfx/jedit.png',     './gfx/jham.png',   
  './gfx/jhome.png',     './gfx/jimage.png', 
  './gfx/jimg_error.png','./gfx/jNext.png', 
  
  './gfx/jnotif.png',    './gfx/jPrev.png', 
  './gfx/jproduct.png',   './gfx/jshare.png', 
  './gfx/jpromo.png',    './gfx/jpurchase.png',  
  './gfx/jrefresh.png',  './gfx/jsave.png',
  './gfx/jsearch.png',   './gfx/jsend.png',
  './gfx/jsite.png',     './gfx/jsms.png',   
  './gfx/landmark.png',  './gfx/qrcode.png',  
    
  './manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Setting {cache: 'reload'} in the new request will ensure that the response
    // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
    await cache.add(new Request(OFFLINE_URL, {cache: 'reload'}));
  })());
  // Force the waiting service worker to become the active service worker.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Enable navigation preload if it's supported.
    // See https://developers.google.com/web/updates/2017/02/navigation-preload
    if ('navigationPreload' in self.registration) {
      await self.registration.navigationPreload.enable();
    }
  })());

  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // We only want to call event.respondWith() if this is a navigation request
  // for an HTML page.
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        // First, try to use the navigation preload response if it's supported.
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) {
          return preloadResponse;
        }

        // Always try the network first.
        const networkResponse = await fetch(event.request);
        return networkResponse;
      } catch (error) {
        // catch is only triggered if an exception is thrown, which is likely
        // due to a network error.
        // If fetch() returns a valid HTTP response with a response code in
        // the 4xx or 5xx range, the catch() will NOT be called.
        console.log('Fetch failed; returning offline page instead.', error);

        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(OFFLINE_URL);
        return cachedResponse;
      }
    })());
  }

  // If our if() condition is false, then this fetch handler won't intercept the
  // request. If there are any other fetch handlers registered, they will get a
  // chance to call event.respondWith(). If no fetch handlers call
  // event.respondWith(), the request will be handled by the browser as if there
  // were no service worker involvement.
});