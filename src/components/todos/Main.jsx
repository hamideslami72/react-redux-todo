import { useState } from "react";
import TodoApp from "./TodoApp";
import SearchInput from "./SearchInput";
import StopWatch from "./StopWatch";
import Video from "./Video";
import StatusUser from "./StatusUser";
import PostForm from "./PostForm";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Main(){

    let todoSetting = [
        {
            id : 1,
            title : "React Todo List",
            isActive : true
        },
        {
            id : 2,
            title : "Vue Todo List",
            isActive : false
        }
    ] 


    return(
        <>
            <div className="bg-gray-100 pt-5">
                {/* <StopWatch /> */}
                {/* <Video /> */}
                {/* <StatusUser /> */}
                {/* <SearchInput /> */}
                {/* <PostForm /> */}
                { todoSetting.map((item) => (item.isActive ? <TodoApp key={item.id} todoSetting={item}/> : '' )) }
            </div>
            <ToastContainer />
        </>
    )
}