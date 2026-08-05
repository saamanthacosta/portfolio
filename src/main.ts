import { createApp } from 'vue'
import App from './App.vue'

import './assets/styles/base.css'
import { i18n } from './i18n'

type ClickOutsideBinding = (event: MouseEvent) => void

const clickOutside = {
  mounted(el: HTMLElement, binding: { value: ClickOutsideBinding }) {
    const handler = (event: MouseEvent) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event)
      }
    }
    ;(el as HTMLElement & { _clickOutside?: (event: MouseEvent) => void })._clickOutside = handler
    document.addEventListener('click', handler)
  },
  unmounted(el: HTMLElement) {
    const handler = (el as HTMLElement & { _clickOutside?: (event: MouseEvent) => void })._clickOutside
    if (handler) {
      document.removeEventListener('click', handler)
    }
  },
}

const app = createApp(App)
app.use(i18n)
app.directive('click-outside', clickOutside)
app.mount('#app')
