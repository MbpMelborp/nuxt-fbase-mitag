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
}
