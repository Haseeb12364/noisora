import { BiColor } from "react-icons/bi"
import { Link } from "react-router-dom"



    const topGenres=[
        {name:"kpop",color:"#75C922",img:"kpop.png" },
        {name:"Indie",color:"#CF25A0",img:"Indie.png" },
         {name:"R&B",color:"#4A558F",img:"R&B.png" },
          {name:"Pop",color:"#BD6220",img:"Pop.png" },
           {name:"Slowed rewerbs",color:"#ffff" },
            // {name:"kpop",color:"#75C922" }
    ]
    const browseAll=[
        {name:"Made for you",color:"#1E82AC",img:"you.png" },
        {name:"Released",color:"#76259C",img:"released.png" },
        {name:"Music Charts",color:"#25319C",img:"music.png" },
        {name:"Podcasts",color:"#9C2542",img:"podcast.png" },
        {name:"Bollywood",color:"#9C7425",img:"bollywood.png" },
        {name:"pop fusion",color:"#479775",img:"fusion.png" },
    ];
export default function Explore() {

    return (<div className="min-h-screen bg-gradient-to-b from-black to-gray-900  text-white p-4 ">
        <div className="w-[300px] flex items-center justify-between mb-6">
            <div className="flex items-center ">
                <img
                    src="/musium logo.png"

                    className="w- h-16 object-contain"
                />

                <h1 className="text-3xl font-bold text-cyan-400">Search</h1>
            </div>

        </div>
        <input className="w-full rounded-xl mr-4 text-lg glow-btn" type="text" placeholder="Songs/Artists/Products&more..." />


        {/* top geners */}
        <div className="mt-4">
            <h2 className="ml-8 font-semibold text-3xl p-3">Your Top Geners</h2>
            <div className="grid grid-cols-3 gap-3 mb-6  mt-5 p-6" >
                {topGenres.map((genre,index)=>(
                    <div key={index} className="relative h-36  rounded-xl overflow-hidden" style={{ backgroundColor: genre.color }}>
                        <h4 className="text-white font-bold text-xl p-4" >{genre.name}</h4>
                          <img src={genre.img} className="ml-44 h-64     "  alt={genre.name} />
                            
                            </div>
                ))}
            
                </div>
                </div>
           
        {/* /////////////////////////// */}
        {/* BrowseAll */}
        <div className="mt-4">
            <h2 className="ml-8 font-semibold">Browse All</h2>
            <div className="grid grid-cols-3 gap-3 mb-6  mt-5 p-6" >
                {/* <div className=" mt-4 bg-green-500 ml-6 "> <h4>Made For</h4></div> */}
                {browseAll.map((item,index)=>(
                    <div key={index} className="mt-4 ml-6 h-52 rounded-xl overflow-hidden" style={{ backgroundColor: item.color }}>
                         <h4 className="text-white font-bold text-3xl p-8" >{item.name}</h4>
                             <img src={item.img} className="ml-44 h-48"  alt={item.name} />
                          </div>
                ))}
               
            
        
                </div>
              
                </div>
                </div>
    );
}

     

