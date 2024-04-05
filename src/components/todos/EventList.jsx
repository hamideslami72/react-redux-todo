import EventBox from "./EventBox"

export default function EventList({children}){
    return(
        <div>
            <h2> Event List: </h2>
            { children }
        </div>
    )
}