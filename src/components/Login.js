import React, { useState } from 'react'
import { useHistory } from 'react-router';


const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let history = useHistory();
    const handleSubmit = async (e) => {

        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        // console.log(json);
        if (json.success) {
            //save the auth and redorect
            localStorage.setItem('token', json.authtoken);
            history.push("/");
            props.showAlert("Logged in successfully", "success")

        }
        else {
            props.showAlert("Invalid Credentials", "danger")
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    var state = false;
    const toggle = () => {
        if (!state) {
            document.getElementById("password").setAttribute("type", "text");
            document.getElementById("eye").style.color = "blue";
            state = true;
            
        }
        if(state) {
                setTimeout(() => {
                document.getElementById("password").setAttribute("type", "password");
                document.getElementById("eye").style.color = "black";
                state = false;
            }, 400);
        }
    }

    return (
        <div className="mt-2 ">
            <h1>Login to continue...</h1>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
                    <span id="eye" onClick={toggle}><i className="fas fa-eye"></i></span>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
