import React, { useState } from 'react'
import { Link,Redirect } from 'react-router-dom'
import { signUp } from '../../APIs/apiCalls'

import '../../App.css'
import BackgroundImage from '../../assets/images/bg.png'
const HeaderStyle = {
    width: "100%",
    height: "100vh",
    background: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}
export default function SignUpPage() {
    const [un,setun]=useState();
    const [ps,setps]=useState();
    const [em,setem]=useState();
    const handleChangeun = (name) => (event) => {
        setun(event.target.value );
      };
    const handleChangeps = (name) => (event) => {
        setps(event.target.value );
      };
    const handleChangeuem = (name) => (event) => {
        setem(event.target.value );
      };
    const Register=()=>{
        signUp(un,ps,em).then((res)=>{
            if(res){
                window.location.href='/home'
            }else{
                alert("username already exists")
            }
        })
    }

    return (
        <div className="text-center m-5-auto">
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            <form >
                <p>
                    <label>Username</label><br/>
                    <input type="text" name="first_name" id="username" value={un} onChange={handleChangeun()} required />
                </p>
                <p>
                    <label>Email address</label><br/>
                    <input type="email" name="email" id="username" value={em} onChange={handleChangeuem()} required />
                </p>
                <p>
                    <label>Password</label><br/>
                    <input type="password" name="password" id="password" value={ps} onChange={handleChangeps()} required />
                </p>
                <p>
                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                </p>
                <p>
                    <button id="sub_btn" type="submit"  onClick={()=>{Register()}}>Register</button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )

}
