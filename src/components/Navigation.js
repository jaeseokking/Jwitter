import React from "react";
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({userObj}) => {
    
    return (
        <nav>
            <ul style={{display : "flex" , justifyContent : "center", marginTop : 50}}>
                <li>
                    <Link to="/" style={{marginRight : 30 }}>
                        <span style={{position : "relative", fontWeight: 600 , fontSize : "22px", top : 21.5, left : 40, color : "#2CAAFF"}}>Jwitter</span>
                        <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x"/>
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/profile"
                        style={{
                            marginLeft : 10,
                            display : "flex",
                            flexDirection : "column",
                            alignItems : "center",
                            fontSize : 12
                        }}
                    >
                    <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x"/>
                    <span style={{marginTop : 10}}>
                        {userObj.displayName ? `${userObj.displayName}'s Profile` : "Profile"}       
                    </span>
                    </Link>

                </li>
            </ul>
        </nav>
    )
}

export default Navigation;