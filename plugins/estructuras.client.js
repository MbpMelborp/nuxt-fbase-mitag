// import moment from 'moment'
// const now = new Date()
// const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
// const minDate = new Date(today)
// minDate.setYear(minDate.getFullYear() - 65)
// const maxDate = new Date(today)
// maxDate.setYear(maxDate.getFullYear() - 18)
// const maxDateS = moment(maxDate).format('YYYY-MM-DD')

export default ({ context, app }, inject) => {
  inject('estructuras', (type) => {
    const typ = {
      tag: {
        id: null,
        tag: null,
        usado: true,
        theme: 'default',
        email:
          process.env.NODE_ENV !== 'production'
            ? `test${Math.random()}@gmail.co`
            : '',
        titulo: null,
        foto: null,
        primer_nombre: process.env.NODE_ENV !== 'production' ? `Nombre1` : '',
        segundo_nombre: process.env.NODE_ENV !== 'production' ? `Nombre2 ` : '',
        apellidos: process.env.NODE_ENV !== 'production' ? `Apellidos` : '',
        password: process.env.NODE_ENV !== 'production' ? `Problem4321` : '',
        telefono_celular:
          process.env.NODE_ENV !== 'production' ? `3007856334` : '',
        telefono_celular_info: null,
        telefono_fijo:
          process.env.NODE_ENV !== 'production' ? `3007856334` : '',
        celular: null,
        fecha_nacimiento: process.env.NODE_ENV !== 'production' ? `` : '',
        empresa: process.env.NODE_ENV !== 'production' ? `` : '',
        cargo: process.env.NODE_ENV !== 'production' ? `` : '',
        info: {
          varios: [],
          iconos: [],
          telefonos: [],
          emails: [],
          notas: [],
          direcciones: [],
          medias: [],
        },
        leads: [],
        terminos: false,
      },
    }
    return typ[type]
  })
}
