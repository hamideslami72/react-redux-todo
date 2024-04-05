import { useEffect, useRef, useState } from "react"


export default function Video(){

    const [isPlaying, setIsPlaying] = useState(false)

    const videoRef = useRef(null)

    const handelClick = () => {
        setIsPlaying(!isPlaying)
        if(!isPlaying){
            videoRef.current.play()
        }else{
            videoRef.current.pause()
        }
        
    }

    return(
        <div className="grid grid-row gap-4 items-center justify-center py-4 bg-cyan-200 w-1/5 mx-auto">
            <div className="">
                <video width="400" ref={videoRef} controls>
                    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="flex gap-2">
                <button onClick={handelClick} className="py-1 px-4 bg-violet-700 text-white rounded">
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
            </div>
        </div>
    )
}