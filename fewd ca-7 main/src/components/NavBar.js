import image from "../abc.png"
import "./navbar.css"
import { Link } from "react-router-dom"
import { Button } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import { useEffect } from "react";




function NavBar() {
  //useEffect for updating the e-mail on the nav-bar

  useEffect(()=>{
    setInterval(()=>{
      const name = sessionStorage.getItem('name')
      if(name){
        document.getElementById('register').style.display = 'none'
      }
      document.getElementById('abc').innerHTML = sessionStorage.getItem('mail')
    },100)
    return clearInterval()
  })

  // function for closing the dropdown in responsive
  const closingAfterClick=()=>{
    document.getElementById("nav-check").checked = false;
  }
  
  return (
    <div>
    <div class="nav">
<input type="checkbox" id="nav-check"/>
<div class="nav-header">
  <div class="nav-title" >

    <a href="https://kalvium.com/" target="_blank"><img src={image}/></a>
    
  </div>
</div>
<div class="nav-btn">
  <label for="nav-check">
    <span></span>
    <span></span>
    <span></span>
  </label>
</div>

<div id="nav-links" class="nav-links">
  <Link to='/' onClick={()=>closingAfterClick()}>
    <Button varient='text' startIcon={<HomeIcon/>}  style={{fontSize:'1.5rem',height:'5rem',color:'white'}}    disabled  >Home</Button>
  
  </Link>
  <Link to='/form' onClick={()=>closingAfterClick()} id="register">
  <Button varient='text' startIcon={<LoginIcon/>} onClick={()=>closingAfterClick()} style={{fontSize:'1.5rem',height:'5rem', color:'white'}}   disabled>Register</Button>

  
  </Link>
  
  <Button varient="text" startIcon={<AccountCircleIcon/>}  ><h6 id='abc'  onClick={()=>closingAfterClick()}></h6>
  </Button>
</div>

</div>
</div>
  )
}

export default NavBar