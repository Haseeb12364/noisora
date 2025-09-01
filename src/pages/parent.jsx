import React ,{ useState } from "react";
import Child from"./Child";
 export default function Parent(){
     const [childData,setChildData]=useState("");
     const handleDatafromChild=(data)=>{
         setChildData(data);
     };
     return(
        <div>
            <h1 className="text-white text-xl  ">
                parent component
            </h1>
            <p>data from Child:{childData}</p>
           <Child sendData={handleDatafromChild}/>
        </div>
     );
 }
 