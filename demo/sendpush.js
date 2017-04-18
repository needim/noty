const webpush = require('web-push')

const vapidKeys = webpush.generateVAPIDKeys()

// Create a project on the Firebase Developer Console for the key
// https://console.firebase.google.com/
webpush.setGCMAPIKey(process.env.NOTY_PUSH_API_KEY)

webpush.setVapidDetails(
  'mailto:nedimarabaci@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

const pushSubscription = {
  endpoint: '<-https://android.googleapis.com/gcm/send/dF3pK2rWhOQ..........->',
  keys: {
    auth: '<-insert-auth-key-here->',
    p256dh: '<-insert-p256dh-key-here->'
  }
}

webpush.sendNotification(pushSubscription, JSON.stringify({
  title: 'Noty title',
  body: 'Noty body',
  icon: 'https://avatars1.githubusercontent.com/u/3040386?v=3&s=200',
  image: 'https://cdn.dribbble.com/users/252805/screenshots/2760603/dribbble-notification.png',
  url: 'http://ned.im/noty/?ref=webPushTest',
  actions: [
    {action: 'actionYes', 'title': 'Yes', 'icon': 'https://cdn2.iconfinder.com/data/icons/navigation-set-arrows-part-two/32/Check-128.png'},
    {action: 'actionNo', 'title': 'No', 'icon': 'https://cdn0.iconfinder.com/data/icons/navigation-set-arrows-part-one/32/Close-128.png'}
  ]
}))
