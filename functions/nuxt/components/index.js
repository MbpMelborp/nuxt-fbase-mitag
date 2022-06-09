export const AppFooter = () => import('../../components/AppFooter.vue' /* webpackChunkName: "components/app-footer" */).then(c => wrapFunctional(c.default || c))
export const AppHero = () => import('../../components/AppHero.vue' /* webpackChunkName: "components/app-hero" */).then(c => wrapFunctional(c.default || c))
export const AppNav = () => import('../../components/AppNav.vue' /* webpackChunkName: "components/app-nav" */).then(c => wrapFunctional(c.default || c))
export const ContactItem = () => import('../../components/ContactItem.vue' /* webpackChunkName: "components/contact-item" */).then(c => wrapFunctional(c.default || c))
export const FormLogin = () => import('../../components/FormLogin.vue' /* webpackChunkName: "components/form-login" */).then(c => wrapFunctional(c.default || c))
export const Iconos = () => import('../../components/Iconos.vue' /* webpackChunkName: "components/iconos" */).then(c => wrapFunctional(c.default || c))
export const LogoTailwind = () => import('../../components/LogoTailwind.vue' /* webpackChunkName: "components/logo-tailwind" */).then(c => wrapFunctional(c.default || c))
export const Media = () => import('../../components/Media.vue' /* webpackChunkName: "components/media" */).then(c => wrapFunctional(c.default || c))
export const Navigation = () => import('../../components/Navigation.vue' /* webpackChunkName: "components/navigation" */).then(c => wrapFunctional(c.default || c))
export const NuxtLogo = () => import('../../components/NuxtLogo.vue' /* webpackChunkName: "components/nuxt-logo" */).then(c => wrapFunctional(c.default || c))
export const TagEdit = () => import('../../components/TagEdit.vue' /* webpackChunkName: "components/tag-edit" */).then(c => wrapFunctional(c.default || c))
export const TagFormPerfil = () => import('../../components/TagFormPerfil.vue' /* webpackChunkName: "components/tag-form-perfil" */).then(c => wrapFunctional(c.default || c))
export const TagHero = () => import('../../components/TagHero.vue' /* webpackChunkName: "components/tag-hero" */).then(c => wrapFunctional(c.default || c))
export const TagItemDirForm = () => import('../../components/TagItemDirForm.vue' /* webpackChunkName: "components/tag-item-dir-form" */).then(c => wrapFunctional(c.default || c))
export const TagItemDirView = () => import('../../components/TagItemDirView.vue' /* webpackChunkName: "components/tag-item-dir-view" */).then(c => wrapFunctional(c.default || c))
export const TagItemEmailForm = () => import('../../components/TagItemEmailForm.vue' /* webpackChunkName: "components/tag-item-email-form" */).then(c => wrapFunctional(c.default || c))
export const TagItemEmailView = () => import('../../components/TagItemEmailView.vue' /* webpackChunkName: "components/tag-item-email-view" */).then(c => wrapFunctional(c.default || c))
export const TagItemIcoForm = () => import('../../components/TagItemIcoForm.vue' /* webpackChunkName: "components/tag-item-ico-form" */).then(c => wrapFunctional(c.default || c))
export const TagItemIcoView = () => import('../../components/TagItemIcoView.vue' /* webpackChunkName: "components/tag-item-ico-view" */).then(c => wrapFunctional(c.default || c))
export const TagItemLinkForm = () => import('../../components/TagItemLinkForm.vue' /* webpackChunkName: "components/tag-item-link-form" */).then(c => wrapFunctional(c.default || c))
export const TagItemLinkView = () => import('../../components/TagItemLinkView.vue' /* webpackChunkName: "components/tag-item-link-view" */).then(c => wrapFunctional(c.default || c))
export const TagItemMediaForm = () => import('../../components/TagItemMediaForm.vue' /* webpackChunkName: "components/tag-item-media-form" */).then(c => wrapFunctional(c.default || c))
export const TagItemMediaView = () => import('../../components/TagItemMediaView.vue' /* webpackChunkName: "components/tag-item-media-view" */).then(c => wrapFunctional(c.default || c))
export const TagItemNotaForm = () => import('../../components/TagItemNotaForm.vue' /* webpackChunkName: "components/tag-item-nota-form" */).then(c => wrapFunctional(c.default || c))
export const TagItemNotaView = () => import('../../components/TagItemNotaView.vue' /* webpackChunkName: "components/tag-item-nota-view" */).then(c => wrapFunctional(c.default || c))
export const TagItemTelForm = () => import('../../components/TagItemTelForm.vue' /* webpackChunkName: "components/tag-item-tel-form" */).then(c => wrapFunctional(c.default || c))
export const TagItemTelView = () => import('../../components/TagItemTelView.vue' /* webpackChunkName: "components/tag-item-tel-view" */).then(c => wrapFunctional(c.default || c))
export const TagLeadForm = () => import('../../components/TagLeadForm.vue' /* webpackChunkName: "components/tag-lead-form" */).then(c => wrapFunctional(c.default || c))
export const TagView = () => import('../../components/TagView.vue' /* webpackChunkName: "components/tag-view" */).then(c => wrapFunctional(c.default || c))
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
