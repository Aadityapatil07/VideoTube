import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter , RouterProvider} from 'react-router-dom'
import Home from './Pages/client-View/home'
import Subscriptions from './Pages/client-View/subscriptions'
import Playlists from './Pages/client-View/playlists'
import History from './Pages/client-View/history'
import LikedVideos from './Pages/client-View/likedVideos'
import Login from './Pages/auth/login'
import Register from './Pages/auth/register'
import Explore from './Pages/client-View/explore'
import Search from './Pages/client-View/search'
import WatchVideo from './Pages/client-View/watchVideo'
import Channel from './Pages/client-View/channel'
import UserDashboard from './Pages/client-View/userDashboard'
import { Provider } from 'react-redux'
import store from './store/store'
import { Toaster } from './components/ui/toaster'
import Playlist from './Pages/client-View/playlist'



const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children : [
      {
        path:"/",
        element:<Home/>   
      },
      {
        path:"explore",
        element: <Explore/>
      },
      {
        path:"search",
        element: <Search/>
      },
      {
        path:"watch-video/:videoId",
        element: <WatchVideo/>
      },
      {
        path:":ChannelName",
        element: <Channel/>
      },
      {
        path:"feed",
        children:[
          {
            path:"subscriptions",
            element: <Subscriptions/>
          },
          {
            path:"playlists",
            element:<Playlists/>
          },
          {
            path:"history",
            element: <History/>
          },
          {
            path:"liked-videos",
            element:<LikedVideos/>
          }
        ]
      },
      {
        path:"auth",
        children:[
          {
            path:"login",
            element:<Login/>
          },
          {
            path:"register",
            element:<Register/>
          }
        ]
      },
      {
        path:"user",
        children:[
          {
            path:"Dashboard",
            element:<UserDashboard/>
          },
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <RouterProvider router={router}/>
    <Toaster/>
    </Provider>,
)
