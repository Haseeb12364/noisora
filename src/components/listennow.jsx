import { useEffect,useState } from "react";
function Songs(){
   const [songs,setsongs]=useState();
   const [loading,setloading]=useState(true);

useEffect(()=>{
    fetch('https://itunes.apple.com/search?term=eminem&entity=song&limit=10')

    .then(res=>res.json())
    .then (data=> {
        setsongs(data.results);
        setloading(false)
    })
},[]);
 if(loading)  return<p>loading songs.. </p>
  
 return(
    <div className="songlist">
      <p>
        tpo eminem songs
      </p>
      <ul>
        {songs.map((song) => (
          <li key={song.trackId}>
            <img src={song.artworkUrl100} alt={song.trackName} />
            <p>{song.trackName} — {song.artistName}</p>
            <audio controls src={song.previewUrl}></audio>
          </li>
        ))}
      </ul>
    </div>   


)   }  
  export default Songs