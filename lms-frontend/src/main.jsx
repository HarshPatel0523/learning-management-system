import { createRoot } from 'react-dom/client'
import './index.css'
import {Toaster} from 'react-hot-toast'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import App from './App.jsx'
import store from './Redux/store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
        <App />
        <Toaster />
    </BrowserRouter>
  </Provider>
)
