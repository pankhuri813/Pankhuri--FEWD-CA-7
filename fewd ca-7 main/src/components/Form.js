import { useState } from "react";
import {useForm} from 'react-hook-form';
import { Link } from "react-router-dom";
import "./form.css";
import React from "react";
import { Button } from "@mui/material";
import {Typography} from "@mui/material";

function Form() {
  //difining initial states as an object
  const initialValues = { username: "", email: "", number:"", password: "", repeatPass:"" };

  //using useState hook
  const {register, handleSubmit} = useForm()
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [repeatPasswordShown, setRepeatPasswordShown] = useState(false);

  //for onChange event handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // for onSubmit event handler
  const handleSubmitForm = () => {
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    //difining an object for errors
    const errors = {};

    //regex conditions
    const regexEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i;
    const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{10,}$/
    const regexNum = /(\d{3})[ -]?(\d{3})[ -]?(\d{4})/i;


    //conditions and the error messages if conditions doesn't matches


    //conditions and error messages for username
    if (!values.username) {
      errors.username = "Username is required!";
    }
    else if (values.username.length < 3) {
      errors.username = "Name must be more than 3 characters";
    } else if (values.username.length > 30) {
      errors.username = "Name cannot exceed more than 30 characters";
    }
  


    //conditions and error messages for mail
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regexEmail.test(values.email)){
      errors.email = "This is not a valid email format!";
    }

    //conditions and error messages for number
    if(!values.number){
      errors.number = "Number can't be empty!"
    }
    else if(!regexNum.test(values.number)|| values.number.length>10 ){
      errors.number = "Invalid Number!";
    }

    
    //conditions and error messages for password
    if (!values.password) {
      errors.password = "Password is required!";
    } 
    else if(!regexPass.test(values.password)){
      errors.password = "Password should be 10 digit long, should include ateast one uppercase,one lowercase, one number and one special character!"
    }

    //conditions and error messages for repeatPassword
    if(!values.repeatPass){
      errors.repeatPass = "Confirm Your Password!"
    }
    else if(values.repeatPass !==values.password){
      errors.repeatPass = "Password Doesn't match!"
    }

    return errors;
  };

  // saving data to sessionStorage on clicking the button 
  const save=()=>{
    if(Object.keys(formErrors).length === 0 && isSubmit){
      sessionStorage.setItem('name', formValues.username)
      

    }
    sessionStorage.setItem('mail', formValues.email)
    
  }
  
        

  
const namefromSessionStorage = sessionStorage.getItem('name')

  return (
    <div className="container">
      
      
  
         { namefromSessionStorage ?(
           <>
                {/* if user had already once submitted the the heading and the button will only be displayed */}
                  <Typography variant="h3" style={{marginTop:'2rem',marginBottom:'2rem',width:'100%', fontSize:'2rem'}}>
                  Thanks! You have successfully Signed in
                  </Typography>
                   
                 
                 <Link to="/" className="button">
                 <Button variant="contained" size="large" color="success" style={{position:'unset'}}>
            Back To Home!
           </Button>
                   </Link>
            </>
        ):(
        

      <form onSubmit={handleSubmit(handleSubmitForm)}>
      
      
        {/* if keys in the object error is 0 and all the fields are filled then conditon */}
        <div className="form">
        { Object.keys(formErrors).length === 0 && isSubmit  ?(
       <h1>Thankyou for your Coorperation</h1>
      ):( <h1>Fill Your credentials</h1>)}

      {/* input field for username */}
          <div className="field">
            <input
              type="text"
              {...register("username")}
              placeholder="Your Name"
              value={formValues.username}
              onChange={handleChange}/>
              </div>
          
          <p>{formErrors.username}</p>
          {/* p for if any errors for username*/}
          
          
          {/* input field for e-mail*/}
          <div className="field">
            <input
              type="text"
              {...register("email")}
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}/>
              </div>

          <p>{formErrors.email}</p>
          {/* p for if any errors fore-mail*/}


          {/* input field for phone-number*/}
          <div className="field">
            <input
              type="text"
              {...register("number")}
              placeholder="PhoneNumber"
              value={formValues.number}
              onChange={handleChange}/>
              </div>

          <p>{formErrors.number}</p>
          {/* p for if any errors for phone-number*/}
          
          
          {/* input field for password*/}
          <div className="field">
            <input   className="pass-input"
            // type according to state {to show hide pass}
              type={passwordShown ? "text" : "password"}

              {...register("password")}

              placeholder="Password"

              value={formValues.password}

              onChange={handleChange}/>

              {/* changing true to false and false to true while pressing h2*/}
              <h2 id="pass" onClick={()=>setPasswordShown(!passwordShown)}>👁</h2>
          </div>
          <p>{formErrors.password}</p>
          {/* p for if any errors for password*/}



          {/* input field for repeat-password*/}
          <div className="field">
            <input
            // type according to state {to show hide pass}
              type={repeatPasswordShown ? "text" : "password"}

             {...register("repeatPass")}

              placeholder="Confirm your Password"

              value={formValues.repeatPass}

              onChange={handleChange}/>

              {/* changing true to false and false to true while pressing h2*/}
              <h2 id="pass" onClick={()=>setRepeatPasswordShown(!repeatPasswordShown)}>👁</h2>
            
            </div>
          <p>{formErrors.repeatPass}</p>
          {/* p for if any errors for repeat-password*/}



          {/* if keys in the object error is 0 and all the fields are filled then the heading and back to home button will  be displayed 
          and the data will be save in sessionStorage */}
          {Object.keys(formErrors).length === 0 && isSubmit  ?(

             <Link to="/" className="button">
                 <Button variant="outlined" size="large" onClick={()=>save()} color="success"style={{position:'unset'}} >
            Back To Home!
           </Button>
           </Link>
          ):
          // if condition doesn't fullfilled
           <Button variant="contained" size="large" type="submit" color="error" style={{position:'unset'}} disableRipple>
            Register!
           </Button>
           }
        </div>
      </form>
     
     )}
    </div>
      
  );
}

export default Form;