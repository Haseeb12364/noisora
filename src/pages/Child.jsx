import React from "react";

export default function Child({sendData}){
     const handleClick=()=>{
        sendData("Hello js")
     };
     return(
        <div>
            <h1>Child component</h1>
            <button onClick={handleClick}>send data to parent</button>
        </div>
     );














    
}
