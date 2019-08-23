const fcmAdmin = require('firebase-admin')

function sendToDevice(deviceToken) {
  const titleAndBody = {
    title: 'Hi there!!',
    body: 'Have you been on Mars for the past two weeks or something?',
  }
  const message = {
    notification: {
      // you have to duplicate title body under the 'notification' and 'data' nodes (because of specific of how Android's background push notification works)
      ...titleAndBody,
      title: 'Hi there!!',
      body: 'Have you been on Mars for the past two weeks or something?',
    },

    data: {
      // you have to duplicate title body under the 'notification' and 'data' nodes (because of specific of how Android's background push notification works)
      ...titleAndBody,
      url: 'https://duckduckgo.com',
      some_useful_key: 'my another value',
    }
  }

  return messagingSrv.sendToDevice(deviceToken, message)
    .then((response) => {
      // Response is a message ID string.
      console.log(`Successfully sent message to device ${deviceToken}:`, response)
    })
    .catch((error) => {
      console.error(`Error sending message to device ${deviceToken}`, error)
    })
}


async function sendAll() {
  const sentPromises = []
  try {
    deviceTokens.forEach(token => {
      sentPromises.push(sendToDevice(token))
    })
    await Promise.all(sentPromises)
    console.log('All messages been sent.')
  } catch (err) {
    console.error('Ups, something bad happened', err)
  }
}

// You have to declare an environment variable with path to Firebase service account key:
// export  GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/service-account-key.json
// You can download it from the Firebase console here:
// https://console.firebase.google.com/project/YOUR-PROJECT-NAME/settings/serviceaccounts/adminsdk

fcmAdmin.initializeApp({
  credential: fcmAdmin.credential.applicationDefault(),
  databaseURL: 'https://YOUR-PROJECT-NAME.firebaseio.com'
})

// Please see https://github.com/dpa99c/cordova-plugin-firebasex#cloud-messaging
// https://firebase.google.com/docs/reference/admin/node/admin.messaging.Messaging.html
// https://firebase.google.com/docs/cloud-messaging/send-message

// devices tokens
const deviceTokens = [
  // place device tokens here
  //'token123',
  //'toke321'
]

let messagingSrv = fcmAdmin.messaging()
sendAll().finally(() => {
  process.exit() // FCM Admin does not let node thread to terminate for some reason
})

