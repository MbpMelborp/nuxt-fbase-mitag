export default function ({ $auth, store, redirect, route }) {
  if (store.getters.isLoggedIn) {
    // if (process.env.NODE_ENV !== 'production') 
    redirect('/')
  }
}
