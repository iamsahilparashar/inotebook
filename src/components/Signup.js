import React, { useState } from 'react'
import { useHistory } from 'react-router';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let history = useHistory();
    const handleSubmit = async (e) => {
        const { name, email, password, cpassword } = credentials;
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //save the auth and redorect
            localStorage.setItem('token',json.authtoken);
            history.push("/"); 
            props.showAlert("Account created successfully" , "success")

        }
        else{
            props.showAlert("Invalid Details" , "danger")
        }

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    var state = false;
    const toggle = () => {
        if (!state) {
            document.getElementById("password").setAttribute("type", "text");
            document.getElementById("eyeSign").style.color = "blue";
            state = true;
            
        }
        if(state) {
                setTimeout(() => {
                document.getElementById("password").setAttribute("type", "password");
                document.getElementById("eyeSign").style.color = "black";
                state = false;
            }, 400);
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password"onChange={onChange}   minLength = {5} required />
                    <span id="eyeSign" onClick={toggle}><i className="fas fa-eye"></i></span>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange}  minLength = {5} required />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Signup
