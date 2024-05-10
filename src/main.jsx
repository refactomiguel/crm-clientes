import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import NuevoCliente, {action as nuevoClienteAction } from './pages/nuevo-cliente'
import Index, {loader as clientesLoader} from './pages'
import ErrorPage from './components/ErrorPage'
import EditarCliente, {loader as editClienteLoader, action as editClienteAction} from './pages/editar-cliente'
import { action as deleteClienteAction } from './components/Cliente'

const router = createBrowserRouter( [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index/>,
        loader: clientesLoader,
        errorElement: <ErrorPage/>
      },

      {
        path: '/nosotros',
        element: <h1>Nosotros</h1>
      },
      {
        path: '/clientes/nuevo',
        element: <NuevoCliente />,
        action: nuevoClienteAction,
        errorElement: <ErrorPage/>
      },
      {
        path: '/clientes/:id/editar',
        element: <EditarCliente/>,
        loader: editClienteLoader,
        errorElement: <ErrorPage/>,
        action: editClienteAction
      },
      {
        path: '/clientes/:id/borrar',
        action: deleteClienteAction
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
