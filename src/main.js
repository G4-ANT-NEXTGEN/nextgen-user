import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Vue3Toastify, { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'tom-select/dist/css/tom-select.css'

import BaseButton from './components/ui/base/BaseButton.vue'
import BaseInput from './components/ui/base/BaseInput.vue'
import BaseModal from './components/ui/base/BaseModal.vue'
import BaseSelect from './components/ui/base/BaseSelect.vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('BaseButton', BaseButton)
app.component('BaseInput', BaseInput)
app.component('BaseModal', BaseModal)
app.component('BaseSelect', BaseSelect)

app.use(Vue3Toastify, {
  autoClose: 3000,
  position: toast.POSITION.TOP_RIGHT,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  draggable: true,
  newestOnTop: true,
  theme: 'light',
})

app.mount('#app')
