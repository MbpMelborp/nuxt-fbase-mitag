export default function ({ $auth, store, redirect, route }) {
  console.log('🏁 authtag.js', process.client)
  // if (process.client) {
  console.info(
    '----❕ | ⛹  >  MIDDLEWARE authtag',
    store.getters.userData,
    store.getters.isAdmin
  )
  if (store.getters.userData)
    if (!store.getters.isAdmin) {
      // if (process.env.NODE_ENV !== 'production')
      redirect('/')
    }
  // }
}
