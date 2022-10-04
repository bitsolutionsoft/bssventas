

import React, { useState } from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Login from "../Login/Login";
import Menu from "../Menu/Menu";


function routes() {

  return (
  
    <BrowserRouter > 
    <Switch> 
      <Route exact path="/" component={Login} />
      <Route exact path="/Menu" component={Menu}/>
  
      </Switch> 
    </BrowserRouter>
   
  );
}

export default routes;

