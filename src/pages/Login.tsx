import { useState } from "react"

export default function Login(){

    const [data, setData] = useState({
        emailId:'',
        password:''
    });

    const handleChange = (event: any) => {
        const { name,value} = event.target;
        setData((prev) => ({
            ...prev,
            [name] : value
        }))
    };
    console.log('data is---',data)

    const handleSubmit = (e:any) => {
        e.preventDefault();
    }

    return(
        <>
        <div className="login -container">
            <form action="submit" onSubmit={handleSubmit}>
                <input type="text" name="emailId" id="emailId" placeholder="Enter your emailId" value={data.emailId} onChange={(e)=>handleChange(e)} />
                <input type="text" name="password" id="password" placeholder="Enter your password" value={data.password} onChange={(e)=>handleChange(e)} />

            </form>
        </div>
        </>
    )
}