export default function ({ $auth, store, redirect, route }) {
  console.log('🏁 authtag.js', process.client)
  // if (process.client) {
  console.info(
    '----❕ | ⛹  >  MIDDLEWARE authtag',
    store.getters.userData,
    route.params.id
  )
  if (store.getters.userData)
    if (!store.getters.isLoggedIn) {
      if (process.env.NODE_ENV !== 'production') redirect('/')
    } else if (store.getters.userData.tag !== route.params.id) {
      if (process.env.NODE_ENV !== 'production') redirect('/perfil')
    }
  // }
}
