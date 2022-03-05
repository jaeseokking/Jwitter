import {auth} from "fBase";
import React, { useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
  } from "firebase/auth";

const Auth = ({isLoggedIn}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "email"){
            setEmail(value);
        } else if(name ==="password"){
            setPassword(value);
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(email)
        console.log(password)
        try{
            let data;
            if(newAccount){
                //계정생성
                 data = await createUserWithEmailAndPassword(
                    auth ,email, password
                )
            } else {
                //로그인
                 data = await signInWithEmailAndPassword(
                    auth, email, password
                )
            }
            console.log(data);
        }catch(error){
            setError(error.message);
        }
       
    }

    const toggleAccount = () => setNewAccount(prev => !prev);
    const onSocialClick = async (event) => {
        const {target : {name}} = event;
        let provider
        if(name === "google"){
            provider = new GoogleAuthProvider();
        }else if(name === "github"){
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(auth, provider);
        console.log(data)
    } 
    return(
    <div>
        <form onSubmit={onSubmit}>
            <input 
                name="email" 
                type="email" 
                placeholder="Email" 
                value={email} 
                required
                onChange={onChange}

            />
            <input 
                name="password" 
                type="password" 
                placeholder="Password" 
                value={password} 
                required
                onChange={onChange}

            />
            <input type="submit" value={newAccount ? "Create Account" : "Log In"}/>
            <div>{error}</div>
        </form>
        <span onClick={toggleAccount}>{newAccount ? "Sing In" : "Create Account"}</span>
        <div>
            <button name="google" onClick={onSocialClick}>Continue with Google</button>
            <button name="github" onClick={onSocialClick}>Continue with Github</button>
        </div>
    </div>
    )
}

export default Auth;