
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { Provider } from 'react-redux';
import {store} from './store';
import Login from './User/Login';
import './App.css'
import Book from './User/Book';
import Cart from './User/Cart';
import SignUp from './User/SignUp';
import Return from "./User/Return";
import { Feature } from "./User/Feature";



const router = createBrowserRouter([ 
  {
    path: "/",
    element: <Feature />,
    children: [
      {
  path: "",
  element: <Book />,
},

{
  path: "/cart",
  element: <Cart />,
},
{
  path: "/thetra",
  element: <Return />,
},
{
  path: "/login",
  element: <Login />,
},
{
  path: "/sign-up",
  element: <SignUp />,
},
],
},

]);

function App() {
 

  return (
    <div>
    <Provider store={store} >
    <RouterProvider router={router} />
    
  </Provider>
 
  </div>
  )
}

export default App
