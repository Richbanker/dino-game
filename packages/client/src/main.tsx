import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App'
import { IS_PORTFOLIO_DEMO } from './config/demoMode'
import { startServiceWorker } from './startServiceWorker'
import { routes } from './routes'
import { store } from './store'
import { fetchUserThunk } from './slices/userSlice'
import './index.css'

const router = createBrowserRouter(routes)

if (!IS_PORTFOLIO_DEMO) {
  store.dispatch(fetchUserThunk())
}

startServiceWorker()

const root = document.getElementById('root') as HTMLElement
const app = (
  <App store={store}>
    <RouterProvider router={router} />
  </App>
)

ReactDOM.hydrateRoot(root, import.meta.env.DEV ? <React.StrictMode>{app}</React.StrictMode> : app)
