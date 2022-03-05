import React from "react";
import {Link} from "react-router-dom"
const Navigation = ({userObj}) => {
    
    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/profile">{userObj.displayName ? userObj.displayName : "User"}의 My profile</Link>
            </li>
        </ul>
    )
}

export default Navigation;