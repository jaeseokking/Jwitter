import React, { useState } from "react";
import {auth} from "fBase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";

const inputStyles = {};

const AuthForm = () => {
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
   
    return(
        <>
        <form onSubmit={onSubmit} className="container">
            <input 
                className="authInput"
                name="email" 
                type="email" 
                placeholder="Email" 
                value={email} 
                required
                onChange={onChange}

            />
            <input 
                className="authInput"
                name="password" 
                type="password" 
                placeholder="Password" 
                value={password} 
                required
                onChange={onChange}

            />
            <input className="authInput authSubmit" type="submit" value={newAccount ? "Create Account" : "Log In"}/>
        <div>{error && <span className="authError">{error}</span>}</div>
    </form>
    <span onClick={toggleAccount} className="authSwitch">{newAccount ? "Sing In" : "Create Account"}</span>
    </>
    )
}

export default AuthForm;