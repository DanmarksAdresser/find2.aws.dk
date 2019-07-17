self.addEventListener('fetch', function(event) {
  event.respondWith(

    // IMPORTANT: Clone the request. A request is a stream and
    // can only be consumed once. Since we are consuming this
    // once by cache and once by the browser for fetch, we need
    // to clone the response.
    var fetchRequest = event.request.clone()

    return fetch(fetchRequest).then(
      function(response) {
        // Check if we received a valid response
        if(!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        // var responseToCache = response.clone()

        // caches.open('myfirstpwa')
        //   .then(function(cache) {
        //     cache.put(event.request, responseToCache)
        //   });

        return response;
      }
    )
  )
})