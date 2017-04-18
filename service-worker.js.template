self.addEventListener('install', event => {
  self.skipWaiting()
  console.log('worker installed', event)
})

self.addEventListener('activate', event => {
  console.log('worker activated', event)
})

self.addEventListener('push', event => {
  console.log('push fired', event)

  const data = event.data.json()

  const options = {
    body: data.body,
    icon: data.icon ? data.icon : '',
    image: data.image ? data.image : '',
    data: {
      url: data.url
    }
  }

  if (data.actions)
    options.actions = data.actions

  event.waitUntil(
    Promise.all([
      self.registration.showNotification(data.title, options)
    ])
  )
})

self.addEventListener('notificationclick', event => {
  console.log('notificationclick fired', event)
  // INFO: You can customize this callback for your needs

  // currently we are closing notification on click
  event.notification.close()

  if (event.action) {
    console.log('action clicked', event.action)
  }

  // then if url is provided open a new window
  var clickResponsePromise = Promise.resolve()
  if (event.notification.data && event.notification.data.url) {
    clickResponsePromise = clients.openWindow(event.notification.data.url)
  }

  event.waitUntil(
    Promise.all([
      clickResponsePromise
    ])
  )
})
