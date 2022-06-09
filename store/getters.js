export default {
  isLoggedIn(state) {
    try {
      return state.authUser.uid !== null
    } catch {
      return false
    }
  },
  userData(state) {
    try {
      return state.userData
    } catch {
      return false
    }
  },
  isLoaded(state) {
    try {
      return state.authUser !== null && state.userData !== null
    } catch {
      return false
    }
  },
  isAdmin(state) {
    try {
      if (state.userData.admin !== null) {
        console.info('----❕ | ⛹  >  MIDDLEWARE auth', state.userData.admin)
        return state.userData.admin
      } else {
        return false
      }
    } catch {
      return false
    }
  },
}
