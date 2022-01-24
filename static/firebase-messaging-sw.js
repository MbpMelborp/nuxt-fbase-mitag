
    importScripts(
      'https://www.gstatic.com/firebasejs/9.6.4/firebase-app-compat.js'
    )
    importScripts(
      'https://www.gstatic.com/firebasejs/9.6.4/firebase-messaging-compat.js'
    )
    firebase.initializeApp({"apiKey":"AIzaSyCLIhpkgR0WEBx2VaRhSjUJSV-2BpeA2Ws","authDomain":"mitag-b1e8a.firebaseapp.com","projectId":"mitag-b1e8a","storageBucket":"mitag-b1e8a.appspot.com","messagingSenderId":"812923620139","appId":"1:812923620139:web:cc678a897a76519103936e","measurementId":"G-R7H677H8SR"})

    // Retrieve an instance of Firebase Messaging so that it can handle background
    // messages.
    const messaging = firebase.messaging()

    // Setup event listeners for actions provided in the config:
    self.addEventListener('notificationclick', function(e) {
      const actions = [{"action":"goToUrl","url":"https:\u002F\u002Fgithub.com\u002Flupas"},{"action":"goToModuleGithub","url":"https:\u002F\u002Fgithub.com\u002Fnuxt-community\u002Ffirebase-module"}]
      const action = actions.find(x => x.action === e.action)
      const notification = e.notification

      if (!action) return

      if (action.url) {
        clients.openWindow(action.url)
        notification.close()
      }
    })

    