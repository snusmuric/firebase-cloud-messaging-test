const FCM = require('fcm-node');

// specify your Firebase cloud messaging Server Key. You can copy it from here:
// https://console.firebase.google.com/project/your_project_name/settings/cloudmessaging
const serverKey = 'your server key from Firebase console';
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
