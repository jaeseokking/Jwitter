import AuthForm from "components/AuthForm";
import {auth} from "fBase";
import {
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
  } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter, faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
    const onSocialClick = async (event) => {
        const {target : {name}} = event;
        let provider
        console.log(name)
        if(name === "google"){
            provider = new GoogleAuthProvider();
        }else if(name === "github"){
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(auth, provider);
        console.log(data)
    } 

 
    return(
    <div className="authContainer">
        <div style={{width : "30px"}} >
        <span style={{position : "relative", fontWeight: 600 , fontSize : "30px", top : 55 , left : 35, color : "#2CAAFF"}}>Jwitter</span>
        <FontAwesomeIcon
            icon={faTwitter}
            color={"#04AAFF"}
            size="3x"
            style={{marginBottom : 30}}
        />
        </div>
        <AuthForm/>
        <div className="authBtns">
            <button className="authBtn googleBtn" name="google" onClick={onSocialClick}><span style={{marginLeft : 5}}>Continue with Google</span><FontAwesomeIcon icon={faGoogle} style={{marginLeft : 5 , marginRight : 5}}/></button>
            <button className="authBtn githubBtn" name="github" onClick={onSocialClick}><span style={{marginLeft : 5}}>Continue with Github</span><FontAwesomeIcon icon={faGithub} style={{marginLeft : 5 , marginRight : 5}}/></button>
        </div>
    </div>
    )
}

export default Auth;