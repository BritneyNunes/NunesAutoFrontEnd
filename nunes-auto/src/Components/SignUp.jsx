import { useState, useEffect } from 'react'
import './SignUp.css'
import { Link } from "react-router-dom"
import LogInForm from './LogIn';
import { useNavigate } from "react-router-dom";

function Form() {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if(user){
      navigate("/home");
      console.log("User in local storage")
    } else{
      console.log("No user in local storage")
    }
  }, [navigate])

  const submition = async (e) => {
    e.preventDefault();
    let response = await fetch(
      "http://localhost:3000/users", {
      method: "post",
      body: JSON.stringify({ data }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    )
    response = await response.json();
    console.log("Response frontend", response);
    console.log("Data frontend", data)

    if (response) {
      alert("Welcome To The Nunes Auto Family");
      localStorage.setItem("user", JSON.stringify(data));
      setData(response)
      navigate("/home");
    }
  }

  return (
    <div className='main'>
      <div className='formContainer'>
        <h3 className='heading'>Sign Up</h3>
        <hr />
        <form className='form' action="submit">
          <label id='label'>User Name:</label>
          <input id='input' type='text' placeholder="John Doe" onChange={(e) => setData({ ...data, NameAndSurname: e.target.value })} required></input>
          <label id='label'>Email:</label>
          <input id='input' type='email' placeholder="johndoe@gmail.com" onChange={(e) => setData({ ...data, Email: e.target.value })} required></input>
          <label id='label'>Password:</label>
          <input id='input' type='text' placeholder='johnisawesome5' onChange={(e) => setData({ ...data, Password: e.target.value })} required></input>
          <label id='label'>User Number:</label>
          <input id='input' type='text' placeholder="081 234 5678" onChange={(e) => setData({ ...data, UserNumber: e.target.value })} required></input>
          <label id='label'>Gender</label>
          <label id='gender' htmlFor="male">Male</label>
          <input type='radio' value='Male' name='gender' id='male' checked={data.Gender === 'Male'} onChange={(e) => setData({ ...data, Gender: e.target.value })} required></input>
          <label id='gender' htmlFor="female">Female</label>
          <input type='radio' value='Female' name='gender' id='female' checked={data.Gender === 'Female'} onChange={(e) => setData({ ...data, Gender: e.target.value })} required></input>
          <button className='button' onClick={submition}>Sign Up</button>
          <hr></hr>
          <p>Already have an account?</p>
          <Link to="/login" element={<LogInForm />}>Log In</Link>
        </form>
      </div>
    </div>
  )
}

export default Form
