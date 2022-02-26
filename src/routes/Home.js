import React, { useState } from "react";
import { dbService } from "fBase";
import {addDoc, collection} from "firebase/firestore"

const Home = () => {
    const [jweet, setJweet] = useState("");
    const onSubmit = async(event) => {
        event.preventDefault();
        console.log('submit click')
        await addDoc(collection(dbService, "nweets"), {
            jweet,
            createdAt: Date.now(),
        })
        setJweet("");
       
    }
    const onChange = (event) => {
        const {target : {value}} = event;
        setJweet(value);
    }
    return(
        <div>
            <form>
                <input value={jweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}/>
                <input onSubmit={onSubmit} type="submit" value="Jweet"/>
            </form>
        </div>
    )

}
export default Home;