import React, { useState } from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({isLoggedIn}) =>{
    return (
        <Router>
            {isLoggedIn && <Navigation/>}
            <Switch>
                {isLoggedIn ?
                    <> 
                        <Route exact path="/">
                            <Home/>
                        </Route>
                        <Route expact path="/profile">
                            <Profile/>
                        </Route>
                        <Redirect from="*" to="/"/>
                    </> :
                    <> 
                    <Route expact path="/">
                        <Auth/>
                    </Route>
                    <Redirect from="*" to="/"/>

                    </>
                }
            </Switch>
        </Router>
    )
}

export default AppRouter;