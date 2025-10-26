import { useState } from "react"
import type { LoginData } from "../types/types";

export default function Login(){

    const [data, setData] = useState<LoginData>({
        emailId:'',
        password:''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name,value} = event.target;
        setData((prev) => ({
            ...prev,
            [name as keyof LoginData] : value
        }))
    };
    console.log('data is---',data)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    return(
        <>
        <div className="login-container">
            <form action="submit" onSubmit={handleSubmit}>
                <input 
                type="text" 
                name="emailId"
                id="emailId" 
                placeholder="Enter your emailId" 
                value={data.emailId} 
                onChange={(e)=>handleChange(e)}
                // className="bg-inherit"
                />

                <input 
                type="text"
                name="password" 
                id="password" 
                placeholder="Enter your password" 
                value={data.password} 
                onChange={(e)=>handleChange(e)} />

            </form>
        </div>
        </>
    )
}