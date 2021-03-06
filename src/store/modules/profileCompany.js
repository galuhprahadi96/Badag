import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  state: {
    // urlAPI: process.env.VUE_APP_URL,
    dataCompany: [],
    dataCom: {},
    company_id: 1,
    user: {}
  },
  mutations: {
    setDataCompany(state, payload) {
      state.dataCompany = payload
      console.log(payload)
    },
    setDataCom(state, payload) {
      state.dataCom = payload
    }
  },
  actions: {
    addCompany(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_URL}company/profile/${payload}`,
            context.state.dataCom
          )
          .then(response => {
            context.commit('setDataCompany', response.data.data)
            // alert(response.data.msg)
            Swal.fire(
              'Notice!',
              `${response.data.msg}`,
              'success'
            )
            resolve(response.data.msg)
          })
          .catch(error => {
            // alert(error.response.data.msg)
            Swal.fire(
              'Notice!',
              `${error.response.data.msg}`,
              'error'
            )
            reject(error.response.data.msg)
            console.log(error.response.data.msg)
          })
      })
    },
    addComForm(context, payload) {
      console.log(payload)
      context.commit('setDataCom', payload)
    },
    pictureCompany(context, payload) {
      axios
        .patch(
          `${process.env.VUE_APP_URL}company/profile-image/${payload[1]}`,
          payload[0]
        )
        .then(response => {
          //   resolve(response.data)
          // alert(response.data.msg)
          Swal.fire(
            'Notice!',
            `${response.data.msg}`,
            'success'
          )
        })
        .catch(error => {
          //   reject(error.response.data.msg)
          // alert(error.response.data.msg)
          Swal.fire(
            'Notice!',
            `${error.response.data.msg}`,
            'error'
          )
        })
    }
  },
  getters: {}
}
