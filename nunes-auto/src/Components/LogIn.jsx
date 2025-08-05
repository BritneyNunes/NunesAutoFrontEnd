import React, { useState } from 'react'
import "./LogIn.css"
import { Link } from "react-router-dom"
import SignUp from './SignUp'
import { useNavigate } from "react-router-dom";

function LogInForm() {
    const [data, setData] = useState({});
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleLogin = async (e) =>{
        e.preventDefault();
        setError("")

        try{
            let response = await fetch("http://localhost:3000/checkpassword" ,{
                method: "GET",
                headers: {
                  Authorization: `Basic ${btoa(`${data.Email}: ${data.Password}`)}`,
                },
            });

          response = await response.json();
          console.log("Frontend Response", response);
          console.log("Frontend Data", data);

          if(response){
            localStorage.setItem("user", JSON.stringify(data));
            navigate("/home");
          } else{
            setError("Invalid username or password");
            alert(error)
          }
        } catch (error){
            setError("Error siging in, please try again")
            alert(error)
        }
    };


    return (
    <div id='main'>
      <div className='LGformContainer'>
        <h3 className='LGheading'>Log In</h3>
        <hr />
        <form className='LGform' action="submit">
          <label id='LGlabel'>User Name:</label>
          <input id='LGinput' type='text' placeholder="John Doe" onChange={(e) => setData({ ...data, NameAndSurname: e.target.value })} required></input>
          <label id='LGlabel'>Email:</label>
          <input id='LGinput' type='email' placeholder="johndoe@gmail.com" onChange={(e) => setData({ ...data, Email: e.target.value })} required></input>
          <label id='LGlabel'>Password:</label>
          <input id='LGinput' type='text' placeholder='johnisawesome5' onChange={(e) => setData({ ...data, Password: e.target.value })} required></input>
          <button className='LGbutton' onClick={handleLogin} >Log In</button>
          <hr></hr>
          <p>Don't have an account? <Link to="/" element={<SignUp />}>Sign Up</Link></p>
          <br/>
        </form>
      </div>
    </div>
    )
}

export default LogInForm