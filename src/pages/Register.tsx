import { useState } from "react"

export default function Register(){
    const [data,setData] = useState({
        username:'',
        mobileNumber:'',
        emailId:'',
        password:''
    });

    const handleChange = (event:any) => {
        const { name, value} = event.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();

    }

    return(
    <>
    <div className="register-container">
        <form action="submit" onSubmit={handleSubmit}>
            <input type="text" name="username" id="username" value={data.username} onChange={handleChange} placeholder="Enter your name" />
            <input type="text" name="mobileNumber" id="mobileNumber" value={data.mobileNumber} onChange={handleChange} placeholder="Enter your mobile No" />
            <input type="text" name="emailId" id="emailId" value={data.emailId} onChange={handleChange} placeholder="Enter your EmailId" />
            <input type="text" name="password" id="password" value={data.password} onChange={handleChange} placeholder="Enter your password" />
        </form>
    </div>
    </>
    )
}