import { useState } from "react"
import useFormInput from "../hook/useFormInput"
import Alert from "../shared/Alert"


export default function PostForm(){

    const titleFormProps = useFormInput('')
    const categoryFormProps = useFormInput('')
    const bodyFormProps = useFormInput('')

    const [showMessageSucces, setShowMessageSucces] = useState(false)

    const onSubmitFormHandler = async(event) => {
        event.preventDefault();
        let data = {
            title: titleFormProps?.value,
            category: categoryFormProps?.value,
            body: bodyFormProps?.value
        }

        let res = await fetch('https://65f2e496105614e6549f327c.mockapi.io/article',{
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(data)
        }).then(res => {
            if (res.ok) {
                // return res.json();

                titleFormProps?.resetValue(),
                categoryFormProps?.resetValue(),
                bodyFormProps?.resetValue()

                setShowMessageSucces(true)
                setTimeout(() => {
                    setShowMessageSucces(false)
                }, 3000);
            }
            // handle error
            console.log(res)
          }).then(task => {
            // do something with the new task
          }).catch(error => {
            // handle error
          })
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full mx-auto shadow lg:w-1/3  bg-white divide-y">
                <div className="flex items-center px-4 py-4">
                    <h1 className="mr-6 text-4xl font-bold text-purple-600">Post Form</h1>
                </div>
                <div className="px-4 py-6">
                    {showMessageSucces && <Alert message=" Successfully Created "/>}
                    <form onSubmit={onSubmitFormHandler} className="grid gap-4">
                        <div className=" items-center">
                            <label htmlFor="title" className="mr-2 text-xl"> Title: </label>
                            <input 
                                type="text" 
                                id="title" 
                                className="w-full py-2 px-4 border border-slate-300"
                                {...titleFormProps}
                            />  
                        </div>
                        <div className=" items-center">
                            <label htmlFor="title" className="mr-2 text-xl"> Category: </label>
                            <input 
                                type="text" 
                                id="title" 
                                className="w-full py-2 px-4 border border-slate-300"
                                {...categoryFormProps}
                            />  
                        </div>
                        <div className="items-center">
                            <label htmlFor="title" className="mr-2 text-xl"> Body: </label>
                            <textarea 
                                name="" 
                                id=""  
                                rows="3" 
                                className="w-full py-2 px-4 border border-slate-300"
                                {...bodyFormProps}
                            >

                                </textarea>
                        </div>
                        <div className="items-center">
                            <button 
                                type="submit" 
                                className="py-2 px-4 bg-green-300 rounded-lg w-32"
                            >Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}