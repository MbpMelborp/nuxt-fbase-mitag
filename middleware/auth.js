export default function ({ $auth, store, redirect, route }) {
  console.info('----❕ | ⛹  >  MIDDLEWARE auth', store.getters.isLoggedIn)
  if (!store.getters.isLoggedIn) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('----❕ | ⛹  >  MIDDLEWARE auth', "Redirect to '/'")
      redirect('/')
    }
  }
}
