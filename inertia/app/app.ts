/// <reference path="../../adonisrc.ts" />
/// <reference path="../../src/shared_kernel/infrastructure/config/inertia.ts" />

import '../css/app.css';
import { createApp, h } from 'vue'
import type { DefineComponent } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    return resolvePageComponent(
      `../pages/${name}.vue`,
      import.meta.glob<DefineComponent>('../pages/**/*.vue'),
    )
  },

  setup({ el, App, props, plugin }) {

    createApp({ render: () => h(App, props) })

      .use(plugin)
      .mount(el)
  },
})
