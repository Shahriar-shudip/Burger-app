import React, { useState } from "react";
import { TextField, colors , Button } from "@material-ui/core";
import Axios from 'axios'
import {useDispatch , useSelector} from 'react-redux'
import "./log_style.css";
const Signup = () => {
const [email, setEmail] = useState('')
const [password , setPassword] = useState('')
const [confirmPassword , setConfirmPassword] = useState('') 
const [error , setError] = useState(false)
const [phone , setPhone] = useState('')
const [name , setName] = useState('')
const [missMatch , setmissMatch] = useState(false) 
const dispatch = useDispatch();
 const formSubmit =(e)=>{
    e.preventDefault()
    Axios({
        url: "http://localhost:9000/register/",
        method: "post",
        data: {
          // sending user email and password
          name : name,
          email: email,
          password: password,
          phone:phone
        },
      }).then((r)=>{
        console.log(r.data.user)
        const result = r.data.user
        if(result === "invalid"){
          localStorage.setItem('authTrue' , "false")
          setError(true)
        }
        else{
          setError(false)
          localStorage.setItem('authTrue' , "true")
          dispatch({type : 'showLogin' , payload : false})
        }
        
      }).catch(e=>{
        console.log(e)
      })

 }
  
  return (
    
      <form className="login" onSubmit={formSubmit}>
        <div
          style={{
            alignContent: "center",
            color: "white",
            fontStyle: "bold",
          }}
        >
          {" "}
          Signup!
        </div>
        {
          error?
          <div className="error">
          Invalid user cradentials
          </div>: <div></div>
        }
          <TextField
          className="input"
          id="outlined-secondary"
          label="Outlined secondary"
          variant="outlined"
          color="green"
          label="Name"
          type="text"
          value={name}
          onChange={(e)=> setName(e.target.value)}
        />
        <br></br>
        <br></br>
        <TextField
          className="input"
          id="outlined-secondary"
          label="Outlined secondary"
          variant="outlined"
          color="green"
          label="Email"
          type="text"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
        />
        <br></br>
        <br></br>
        <TextField
          className="input"
          id="outlined-secondary"
          label="Outlined secondary"
          variant="outlined"
          color="green"
          label="Phone"
          type="text"
          value={phone}
          onChange={(e)=> setPhone(e.target.value)}
        />
        <br></br>
        <br></br>
        <TextField
          className="input"
          id="outlined-secondary"
          label="Outlined secondary"
          variant="outlined"
          color="green"
          label="Password"
          type="password"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
        />

        <br></br>
        <br></br>
        <TextField
          className="input"
          id="outlined-secondary"
          label="Outlined secondary"
          variant="outlined"
          color="green"
          label="ConfirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e)=> setConfirmPassword(e.target.value)}
        />
        <br></br>
        <br></br>
        {
          password!== confirmPassword?
          <div className="error">
          Password doeenot match 
          </div>: <div></div>
        }
        <br></br>
        <br></br>
        <Button variant="contained"  style={{ width:'400px',height:'50px', backgroundColor:'#3483eb', color:'white'}} 
         onClick={formSubmit}>
          Login
        </Button>
      </form>
   
  );
};

export default Signup;