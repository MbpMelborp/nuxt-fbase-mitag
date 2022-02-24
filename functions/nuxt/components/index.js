export const AppFooter = () => import('../../components/AppFooter.vue' /* webpackChunkName: "components/app-footer" */).then(c => wrapFunctional(c.default || c))
export const AppHero = () => import('../../components/AppHero.vue' /* webpackChunkName: "components/app-hero" */).then(c => wrapFunctional(c.default || c))
export const AppNav = () => import('../../components/AppNav.vue' /* webpackChunkName: "components/app-nav" */).then(c => wrapFunctional(c.default || c))
export const FormLogin = () => import('../../components/FormLogin.vue' /* webpackChunkName: "components/form-login" */).then(c => wrapFunctional(c.default || c))
export const LogoTailwind = () => import('../../components/LogoTailwind.vue' /* webpackChunkName: "components/logo-tailwind" */).then(c => wrapFunctional(c.default || c))
export const NuxtLogo = () => import('../../components/NuxtLogo.vue' /* webpackChunkName: "components/nuxt-logo" */).then(c => wrapFunctional(c.default || c))
export const TagFormPerfil = () => import('../../components/TagFormPerfil.vue' /* webpackChunkName: "components/tag-form-perfil" */).then(c => wrapFunctional(c.default || c))
export const TagHero = () => import('../../components/TagHero.vue' /* webpackChunkName: "components/tag-hero" */).then(c => wrapFunctional(c.default || c))
export const Trama = () => import('../../components/Trama.vue' /* webpackChunkName: "components/trama" */).then(c => wrapFunctional(c.default || c))
export const Tutorial = () => import('../../components/Tutorial.vue' /* webpackChunkName: "components/tutorial" */).then(c => wrapFunctional(c.default || c))
export const UserTags = () => import('../../components/UserTags.vue' /* webpackChunkName: "components/user-tags" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
