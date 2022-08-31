import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Pushy from 'pushy-sdk-web'
import {routernewuser} from '../actions'
import { connect } from 'react-redux'
import Swal from 'sweetalert2';
import Loader from 'react-loader-spinner'
var validator = require("email-validator");



const Register = (props) => {

 let users = ['Select UserType','Fahsion Designer','Fabric Dealer', 'Beta customer'];

 const [nofity, setnofity] = useState(0);
 const [email, setemail] = useState('');
 const [Whatsapp, setWhatapp] = useState('');
 const [buttonOk, setbuttonOk] = useState(false);
 const [countrycode, setcountrycode] = useState('');
 const [businessname, setBusinessname] = useState('');
 const [businessaddress, setbusinesaddress] = useState('');
 const [click, setclick] = useState(false);


 const loop = () => {
   setnofity(prev => prev+1);
 }


 const register_new_user = () => {
    
    if(document.getElementById("password").value  !== document.getElementById("confirmpassword").value){
            Swal.fire({title:'Password not match',text:"Password Does'nt match ",icon:'warning'});
            setbuttonOk(false);
     }else 
         if(buttonOk){
                Pushy.register({appId: process.env.REACT_APP_APP_ID_PUSHY})
                        .then(function (usertoken){
                            routernewuser(Merge(usertoken))
                                setclick(true);
                          }).catch(err => {
                           console.log(err)
           })    
    }
       
 }



 const Merge = (usertoken) => {
     const payload = {
            User:{
                Usertoken:"",
                businessaddress: businessaddress ? businessaddress : "",
                businessname: businessname ? businessname : "",
                devicetoken: usertoken,
                email:email,
                img_url:"",
                usertype:sessionStorage.getItem("ust"),
                whatappnumber:countrycode+Whatsapp,
            }
     }
     return payload;
 }


const PhoneNumberisValid = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if(!value.toString().startsWith("A-Z")){
       setWhatapp(value);
       setnofity(prev => prev+1);
    }
}


const ValidateEmail = (e) => {
    if(validator.validate(e)){
        setemail(e);
        setnofity(prev => prev+1);
    }else
        setemail('');  
}


const confirmPass = () => {
    if(buttonOk)
       if(document.getElementById("password").value  !== document.getElementById("confirmpassword").value){
            Swal.fire({title:'Password not match',text:"Password Does'nt match ",icon:'warning'});
                setbuttonOk(false);
       }
}


const CALL = async () => {
    const res = await fetch(process.env.REACT_APP_END+process.env.REACT_APP_IPDATA)
      const data = await res.json();
         setcountrycode("+"+data.calling_code);
}

 useEffect(() => {
       Revalidate(sessionStorage.getItem("ust") === "Customer" ? 1 : 0);
        if(nofity < 2)
            CALL();
 },[nofity])



 function Revalidate (n) {
    if(document.getElementById("password").value && document.getElementById("confirmpassword").value && email.length > 0 && (valid(n)))
        setbuttonOk(true);      
    else
        setbuttonOk(false);
 }



 function valid(n){
    return n === 1 ? true :  businessaddress.length > 0 && businessname.length > 0
 }

 






  return (
    <Container>
        <div class="wrapper fadeInDown">
            <div id="formContent">

                <h2 class="inactive underlineHover">Sign Up </h2>

                <div class="fadeIn first">
                   <img src="./images/user.svg"  alt="User Icon" />
                </div>
        
                <div>
                    {sessionStorage.getItem("ust") !== "Customer" ?
                    <input type="text" id='busniessname'  class="fadeIn second" name="login" placeholder="Business name"  value={businessname} onChange={(e) =>{ setBusinessname(e.target.value);  loop()} }/>
                    :""}

                    <input type="text" id='Whatsapp' class="fadeIn second" name="login" placeholder="Whatsapp number" value={Whatsapp} onChange={(e) => { setWhatapp(e.target.value); loop();}}  onBlur={(e)=> PhoneNumberisValid(e)} />
                    
                    {sessionStorage.getItem("ust") !== "Customer" ?
                    <input type="text" id='businessaddress' class="fadeIn second" name="login" placeholder="Business Address" value={businessaddress} onChange={(e) => { setbusinesaddress(e.target.value); loop()} }/>
                    :""}
                    <input type="text" id='email'  class="fadeIn second" name="login" placeholder="Email" value={email}  onChange={(e) =>{ setemail(e.target.value); loop()} }    onBlur={(e) => ValidateEmail(email)}/>
                    <input type="password" id='password' class="fadeIn second" name="login" placeholder="Password" onChange={(e) => loop()}/>
                    <input type="password" id="confirmpassword" class="fadeIn third" name="login" placeholder="Confirm password" onChange={(e) => loop()}  onBlur={(e) => confirmPass()}/>
                    
                    <Button disabled={!buttonOk ? false : true }  onClick={(e) => register_new_user()}> {click ? <Loader type="Oval"color="#e5e5e5" height={15} width={15} /> : "Signup"}</Button>
                </div>

             </div>
        </div>
    </Container>
  )

}


const Container = styled.div`
background-color: #FFAA00;
font-family: "Poppins", sans-serif;
height: 100vh;


a{
color:#FF5D16;
display:inline-block;
text-decoration: none;
font-weight: 400;
}



h2 {
text-align: center;
font-size: 16px;
font-weight: 600;
text-transform: uppercase;
display:inline-block;
margin: 40px 8px 10px 8px; 
color: #cccccc;
}



/* STRUCTURE */

.wrapper {
display: flex;
align-items: center;
flex-direction: column; 
justify-content: center;
width: 100%;
min-height: 100%;
padding: 20px;
}



#formContent {
-webkit-border-radius: 10px 10px 10px 10px;
border-radius: 10px 10px 10px 10px;
background: #ffffff;
padding: 30px;
width: 90%;
max-width: 450px;
position: relative;
padding: 0px;
-webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
text-align: center;
}


@media(max-width:768px){
#formContent {
width: 100%;
}

}


#formFooter {
background-color: #f6f6f6;
border-top: 1px solid #dce8f1;
padding: 25px;
text-align: center;
-webkit-border-radius: 0 0 10px 10px;
border-radius: 0 0 10px 10px;
}



/* TABS */

h2.inactive {
color: #cccccc;
}

h2.active {
color: #0d0d0d;
border-bottom: 2px solid #5fbae9;
}



/* FORM TYPOGRAPHY*/

input[type=button], input[type=submit], input[type=reset]  {
background-color: ${(props) => !props.disabled ? "#f5f5f5" : "#FF5D16"};
border: none;
color: white;
padding: 15px 80px;
text-decoration: none;
display: inline-block;
text-transform: uppercase;
font-size: 13px;
-webkit-box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
box-shadow: 0 10px 30px 0 #e6e6e6; 
-webkit-border-radius: 5px 5px 5px 5px;
border-radius: 5px 5px 5px 5px;
margin: 5px 20px 40px 20px;
-webkit-transition: all 0.3s ease-in-out;
-moz-transition: all 0.3s ease-in-out;
-ms-transition: all 0.3s ease-in-out;
-o-transition: all 0.3s ease-in-out;
transition: all 0.3s ease-in-out;
}


input[type=button]:hover, input[type=submit]:hover, input[type=reset]:hover  {
background-color: #39ace7;
}


input[type=button]:active, input[type=submit]:active, input[type=reset]:active  {
-moz-transform: scale(0.95);
-webkit-transform: scale(0.95);
-o-transform: scale(0.95);
-ms-transform: scale(0.95);
transform: scale(0.95);
}

input[type=text], input[type=password] {
background-color: #f6f6f6;
border: none;
color: #0d0d0d;
padding: 15px 32px;
text-decoration: none;
display: inline-block;
font-size: 16px;
margin: 5px;
width: 85%;
border: 2px solid #f6f6f6;
-webkit-transition: all 0.5s ease-in-out;
-moz-transition: all 0.5s ease-in-out;
-ms-transition: all 0.5s ease-in-out;
-o-transition: all 0.5s ease-in-out;
transition: all 0.5s ease-in-out;
-webkit-border-radius: 5px 5px 5px 5px;
border-radius: 5px 5px 5px 5px;
}

input:focus {
background-color: #fff;
border-bottom: 2px solid #FF5D16;
}

input[type=text]:placeholder {
color: #cccccc;
}


select{
width: 85%;
border:0.5px solid #e6e6e6;
padding: 10px;
border-radius:5px;
margin:7px;
}




/* ANIMATIONS */
/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
-webkit-animation-name: fadeInDown;
animation-name: fadeInDown;
-webkit-animation-duration: 1s;
animation-duration: 1s;
-webkit-animation-fill-mode: both;
animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
0% {
opacity: 0;
-webkit-transform: translate3d(0, -100%, 0);
transform: translate3d(0, -100%, 0);
}
100% {
opacity: 1;
-webkit-transform: none;
transform: none;
}
}

@keyframes fadeInDown {
0% {
opacity: 0;
-webkit-transform: translate3d(0, -100%, 0);
transform: translate3d(0, -100%, 0);
}
100% {
opacity: 1;
-webkit-transform: none;
transform: none;
}
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@-moz-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

.fadeIn {
opacity:0;
-webkit-animation:fadeIn ease-in 1;
-moz-animation:fadeIn ease-in 1;
animation:fadeIn ease-in 1;

-webkit-animation-fill-mode:forwards;
-moz-animation-fill-mode:forwards;
animation-fill-mode:forwards;

-webkit-animation-duration:1s;
-moz-animation-duration:1s;
animation-duration:1s;


img{
width: 40px;
height: 40px;
border-radius:100px;
}
}

.fadeIn.first {
-webkit-animation-delay: 0.4s;
-moz-animation-delay: 0.4s;
animation-delay: 0.4s;
}

.fadeIn.second {
-webkit-animation-delay: 0.6s;
-moz-animation-delay: 0.6s;
animation-delay: 0.6s;
}

.fadeIn.third {
-webkit-animation-delay: 0.8s;
-moz-animation-delay: 0.8s;
animation-delay: 0.8s;
}

.fadeIn.fourth {
-webkit-animation-delay: 1s;
-moz-animation-delay: 1s;
animation-delay: 1s;
}



/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
display: block;
left: 0;
bottom: -10px;
width: 0;
height: 2px;
background-color: #FF5D16;
content: "";
transition: width 0.2s;
}

.underlineHover:hover {
color: #FF5D16;
}

.underlineHover:hover:after{
width: 100%;
}

*:focus {
outline: none;
} 

*{
box-sizing: border-box;
}
`;




const Button = styled.div`
background-color: ${(props) => !props.disabled ? "#f5f5f5" : "#FF5D16"};
border: none;
color: white;
padding: 15px 80px;
text-decoration: none;
display: inline-block;
text-transform: uppercase;
font-size: 13px;
-webkit-box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
box-shadow: 0 10px 30px 0 #e6e6e6; 
-webkit-border-radius: 5px 5px 5px 5px;
border-radius: 5px 5px 5px 5px;
margin: 5px 20px 40px 20px;
-webkit-transition: all 0.3s ease-in-out;
-moz-transition: all 0.3s ease-in-out;
-ms-transition: all 0.3s ease-in-out;
-o-transition: all 0.3s ease-in-out;
transition: all 0.3s ease-in-out;
:hover  {
background-color: ${(props) => !props.disabled ? "#f5f5f5" : "#39ace7"};
}

:active  {
-moz-transform: scale(0.95);
-webkit-transform: scale(0.95);
-o-transform: scale(0.95);
-ms-transform: scale(0.95);
transform: scale(0.95);
}


`;


const mapStateToProps = () => {
    return {};
  }
  

const mapDispatchToProps = (dispatch) => ({
   
})

export default  connect(mapStateToProps,mapDispatchToProps)(Register)