import React  from 'react';
import { Switch , Route , Redirect } from "react-router-dom";
import mainRouter  from "./router"


function App() {
  return (
   <Switch>
     {mainRouter.map((item=>{
       return <Route  path={item.path} exact={item.exact} component={item.component} key={item.path}></Route>;
     }))}

     <Redirect from="/" to="/shop"></Redirect>
   </Switch> 
  );
}

export default App;
