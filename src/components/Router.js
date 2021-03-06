import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({refreshUser, userObj}) =>{
    return (
        <Router>
            {userObj && <Navigation userObj={userObj}/>}
            <Switch>
                {userObj ?(
                    <div 
                        style={{
                            maxWidth : 890,
                            width : "100%",
                            margin: "0 auto",
                            marginTop : 80,
                            display:"flex",
                            justifyContent : "center"

                        }}
                    > 
                        <Route exact path="/">
                            <Home userObj={userObj}/>
                        </Route>
                        <Route expact path="/profile" >
                            <Profile userObj={userObj} refreshUser={refreshUser}/>
                        </Route>
                        <Redirect from="*" to="/"/>
                    </div> ):(
                    <> 
                    <Route expact path="/">
                        <Auth/>
                    </Route>
                    <Redirect from="*" to="/"/>

                    </>
                    )
                }
            </Switch>
        </Router>
    )
}

export default AppRouter;