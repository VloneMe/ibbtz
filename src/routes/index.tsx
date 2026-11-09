import { createBrowserRouter, Navigate } from 'react-router-dom'
import RootLayout from '../components/layout/RootLayout'
import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Feedback from '../pages/Feedback'
// import Events from '../pages/Events'
import EventDetail from '../pages/EventDetail'
import Gallery from '../pages/Gallery'
import GalaRegistration from '../pages/GalaRegistration'
import AdminDashboard from '../pages/AdminDashboard'
import NotFound from '../pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'aboutus',
        element: <About />,
      },
      // {
      //   path: 'ibb',
      //   element: <Events />,
      // },
      {
        path: 'event/:id',
        element: <EventDetail />,
      },
      {
        path: 'gallery',
        element: <Gallery />,
      },
      {
        path: 'contactus',
        element: <Contact />,
      },
      {
        path: 'feedback',
        element: <Feedback />,
      },
      {
        path: 'iba',
        element: <GalaRegistration />,
      },
      {
        // Old link kept alive for anyone who already shared it
        path: 'gala',
        element: <Navigate to="/iba" replace />,
      },
      {
        path: 'admin',
        element: <AdminDashboard />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])
