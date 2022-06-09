export default function ({ $auth, store, redirect, route }) {
  console.info('----❕ | ⛹  >  MIDDLEWARE auth', store.getters.isLoggedIn)
  if (!store.getters.isLoggedIn) {
    console.info('----❕ | ⛹  >  MIDDLEWARE auth', "Redirect to '/'")
    // if (process.env.NODE_ENV !== 'production')
    redirect('/')
  }
}
