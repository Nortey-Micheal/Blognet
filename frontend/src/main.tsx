import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import HomePage from './pages/HomePage.tsx'
import NoPageFound from './pages/404.tsx'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import Relevant from './pages/homeRelevant.tsx'
import Latest from './pages/homeLatest.tsx'
import Top from './pages/homeTop.tsx'
import Login from './pages/loginPage.tsx'
import Signup from './pages/signupPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NoPageFound />,
    children: [
      {
        path: '',
        element: <Relevant />
      },
      {
        path: '/latest',
        element: <Latest />
      },
      {
        path: '/top',
        element: <Top />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <NoPageFound />
  },
  {
    path: '/signup',
    element: <Signup />,
    errorElement: <NoPageFound />
  }
])

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router}/>
    </StrictMode>
  </Provider>,
)
