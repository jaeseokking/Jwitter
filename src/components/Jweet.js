import { dbService, storageService } from "fBase";
import { doc, deleteDoc , updateDoc} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";

const Jweet = ({jweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newJweet, setNewJweet] = useState(jweetObj.text);
    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure you want delete this jweet?");
        console.log(ok);
        if(ok){
            //delete jweet
            const JweetText = doc(dbService, "jweets", `${jweetObj.id}`)
            await deleteDoc(JweetText);
            if(jweetObj.attachmentUrl){
                const JweetImage = ref(storageService, jweetObj.attachmentUrl);
                await deleteObject(JweetImage);
            }

        }
    }


    const toggleEditing = () => setEditing(prev => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        const JweetTextRef = doc(dbService, "jweets", jweetObj.id);
        await updateDoc(JweetTextRef, {
            text : newJweet
        });
        setEditing(false);

    }
    const onChange = (event) => {
        const {target : {value}} = event;
        setNewJweet(value);
        
    }
  return(
      <div>
        {
            editing ?
                <>
                    <form>
                        <input type="text" placeholder="Edit your jweet" value={newJweet} onChange={onChange}  required/>
                        <input type="submit" onClick={onSubmit} value="Update Jweet"/>
                    </form> 
                    <button onClick={toggleEditing}>Cancel</button>
                </> 
                : 
                <> 
                    <h4>{jweetObj.text}</h4>
                    {jweetObj.attachmentUrl && <img src={jweetObj.attachmentUrl} width="50px" height="50px"/>}
                        {isOwner && (
                            <>
                                <button onClick={onDeleteClick}>Delete Jweet</button>
                                <button onClick={toggleEditing}>Edit Jweet</button>     
                            </>
                        )}
                </>
        }
       </div>
    )
}

export default Jweet;