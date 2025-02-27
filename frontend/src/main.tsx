import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import HomePage from './pages/home/HomePage.tsx'
import NoPageFound from './pages/404.tsx'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import Relevant from './pages/home/homeRelevant.tsx'
import Latest from './pages/home/homeLatest.tsx'
import Top from './pages/home/homeTop.tsx'
import Login from './pages/user/loginPage.tsx'
import Signup from './pages/user/signupPage.tsx'
import Profile from './pages/user/profile.tsx'
import AddBlog from './pages/blogs/addBlog.tsx'
import Blog from './pages/blogs/blog.tsx'

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
  },
  {
    path: '/profile',
    element: <Profile />,
    errorElement: <NoPageFound />
  },
  {
    path: '/addblog',
    element: <AddBlog />,
    errorElement: <NoPageFound />
  },
  {
    path: '/blog/:_id',
    element: <Blog />,
    errorElement: <NoPageFound />
  },
])

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router}/>
    </StrictMode>
  </Provider>,
)
