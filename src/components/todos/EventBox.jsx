import { useState } from "react";

export default function EventBox(props){

    let styleTitleBox = {
        backgroundColor: "gray",
    }

    const [titleStyle , setTitleStyle] = useState({});



    return(
        <div>
            <h4 className="text-3xl font-bold underline"
                onMouseEnter={(e) => setTitleStyle(styleTitleBox)} 
                onMouseLeave={(e) => setTitleStyle({})} 
                style={titleStyle}
            >
                {props?.course?.title}
            </h4>
            <p>{props?.course?.description}</p>
        </div>
    )
}