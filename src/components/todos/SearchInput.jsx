import { useDebugValue, useEffect, useState } from "react"
import useSearch from "../hook/useSearch"
import useFormInput from "../hook/useFormInput"


export default function SearchInput(){

    const searchTermProps = useFormInput('')

    const searchText = useSearch(searchTermProps.value, 1000)

    useEffect(() => {

        if(searchTermProps.value != ''){
            console.log(`Send Request Ajax ${searchTermProps.value}`)
        }

    } , [searchText])

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3  bg-white">
                <div className="flex items-center mb-6">
                    <h1 className="mr-6 text-4xl font-bold text-purple-600">Search Input</h1>
                </div>
                <input 
                    type="text"
                    {...searchTermProps} 
                    // onChange={(event) => {setSearchTerm(event.target.value)}}
                    className="w-full py-2 px-4 border border-purple-200" 
                    placeholder="What do you want?"
                />
            </div>
        </div>
    )
}