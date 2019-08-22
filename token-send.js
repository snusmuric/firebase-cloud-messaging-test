const FCM = require('fcm-node');

const serverKey = 'firebase server key from the console';
const fcm = new FCM(serverKey);

// devices tokens
const deviceTokens = [
  // place device tokens here (sent to server from the device or copied from the device somehow)
  //'token123',
  //'toke321'
]
// see https://github.com/dpa99c/cordova-plugin-firebasex#cloud-messaging
// https://firebase.google.com/docs/cloud-messaging/concept-options.html#notifications_and_data_messages

function sendToDevice(deviceToken) {
  const message = {
    to: deviceToken,

    notification: {
      // you have to duplicate title body under the 'notification' and 'data' nodes (because of Android specific)
      title: 'Title of your push notification',
      body: 'Body of your push notification'
    },

    data: {
      // you have to duplicate title body under the 'notification' and 'data' nodes (because of Android specific)
      title: 'Title of your push notification',
      body: 'Body of your push notification',
      // put any number of custom tags here
      my_key: 'my value',
      my_another_key: 'my another value'
    }
  };

  fcm.send(message, function(err, response){
    if (err) {
      console.log("Something has gone wrong!");
    } else {
      console.log("Successfully sent with response: ", response);
    }
  });
}

deviceTokens.forEach(token => {
  sendToDevice(token)
})

// TODO figure out how to send to the specific topic
