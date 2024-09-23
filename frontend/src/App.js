import Navbar from "./component/navbar/Navbar";
import Footer from "./component/Footer/Footer";
import Router from "./Router/Router";
import { authAction } from "./store";
import { useDispatch } from "react-redux";

import "./App.css"
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if(sessionStorage.getItem("Id")) {
      dispatch(authAction.login());
    }
  })
  
  return (
    <div className="main">
      <Navbar/>
      <Router/>
      <Footer/>
    </div>
  );
}

export default App;
