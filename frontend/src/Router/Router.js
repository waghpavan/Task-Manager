import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom'; // Import HashRouter
import Home from '../component/Home/Home';
import About from "../component/About/About";

import ToDo from '../component/ToDo/ToDo';
import History from '../History/History';
import SignIn from '../component/SignIn/SignIn';
import SignUp from '../component/SignUp/SignUp';

function Router() {
  return (
    <div>
      <HashRouter>  {/* Use HashRouter instead of BrowserRouter */}
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/about' element={<About/>}></Route>

            <Route path='/todo' element={<ToDo/>}></Route>
            <Route path='/taskhistory' element={<History/>}></Route>
            
            <Route path='/SignIn' element={<SignIn/>}></Route>
            <Route path='/SignUp' element={<SignUp/>}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default Router;
