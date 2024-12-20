import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider ,createBrowserRouter} from "react-router-dom";
import appStore from "./utils/appStore"
import { Provider } from "react-redux"
import Login from "./components/Login"
import Browse from "./components/Browse"
import MoviePage from './components/MoviePage';
import SearchPage from './components/SearchPage';
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/movie/:movieid",
    element:<MoviePage/>
  },
  {
    path:"/search",
    element:<SearchPage/>
  }
 
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={appStore} >
   <RouterProvider router={appRouter} />
   </Provider>
  </React.StrictMode>,
)


