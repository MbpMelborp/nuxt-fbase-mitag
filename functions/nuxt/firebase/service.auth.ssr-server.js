import admin from 'firebase-admin'

const config = {"apiKey":"AIzaSyCLIhpkgR0WEBx2VaRhSjUJSV-2BpeA2Ws","authDomain":"mitag-b1e8a.firebaseapp.com","projectId":"mitag-b1e8a","storageBucket":"mitag-b1e8a.appspot.com","messagingSenderId":"812923620139","appId":"1:812923620139:web:cc678a897a76519103936e","measurementId":"G-R7H677H8SR"}

const simulateUserRecord = ({
  uid,
  email,
  email_verified: emailVerified,
  name: displayName
}) => ({
  uid,
  email,
  emailVerified,
  displayName
})

if (!admin.apps.length) {
  admin.initializeApp(config)
}

export default async ({ req, res }) => {
  if (!req || !req.headers.authorization) {
    return
  }

  // Parse the injected ID token from the request header.
  const authorizationHeader = req.headers.authorization || ''
  const components = authorizationHeader.split(' ')
  const idToken = components.length > 1 ? components[1] : ''

  try {
    // Try to verify the id token, additionally checking if the token was revoked
    const decodedToken = await admin.auth().verifyIdToken(idToken)

    if (decodedToken.uid) {
      const authUser = simulateUserRecord(decodedToken)

      res.locals = {
        ...res.locals,
        user: {
          ...authUser,
					allClaims: decodedToken,
					idToken,
        }
      }
    }
  } catch (e) {
    console.error(e)
  }
}
