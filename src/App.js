import logo from './logo.svg';
import './App.css';
import Header from './component/Header/Header';
import Shop from './component/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './component/Review/Review';
import Inventory from './component/Inventory/Inventory';
import NotFound from './component/NotFound/NotFound';
import ProductDetails from './component/ProductDetails/ProductDetails';
import Login from './component/Login/Login';
import Shipment from './component/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';

export const userContext = createContext()

function App(props) {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h3>Email: {loggedInUser.email}</h3>
      <Router>
        <Header></Header>
          <Switch>
              <Route path="/shop">
                <Shop></Shop>
              </Route>
              <Route path="/review">
                  <Review></Review>
              </Route>
              <PrivateRoute path="/inventory">
                  <Inventory></Inventory>
              </PrivateRoute>
              <Route path="/login">
                <Login></Login>
              </Route>
              <PrivateRoute path="/shipment">
                <Shipment></Shipment>
              </PrivateRoute>
              <Route exact path="/">
                  <Shop></Shop>
              </Route>
              <Route path="/product/:productKey">
                <ProductDetails></ProductDetails>
              </Route>
              <Route path="*">
                  <NotFound></NotFound>
              </Route>
          </Switch>
      </Router>
    
     
    </userContext.Provider>
  );
}

export default App;
