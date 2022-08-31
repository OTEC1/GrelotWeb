import React, {Component,useState}  from 'react';
import styled from "styled-components"
import {Redirect} from "react-router"
import {connect} from 'react-redux';
import { signInAPIGoogle } from "../actions";
import {useHistory} from 'react-router'
import Swal from 'sweetalert2'

const Login = (props) => {

    const [usertypes, setusertypes] = useState(['Select usertype','Fashion Designer', 'Fabric Dealer','Customer']); 
    const [usertype, setusertype] = useState(''); 
    const [click, setclick] = useState(false); 

    let history = useHistory();

    const OpenPage = () => {
      history.push("/register")
    }



    const Login = () => {
        history.push("/usertype")
      }


    const handlechange  = (e)  => {
        setusertype(e.target.value);
    }


    const open = () => {
        props.Signin(usertype);
        setclick(true);
    }

    return (
        <Container>
            {props.user && <Redirect to="/"/>}
            <Nav>
                <a href="/">
                    <Grelot>Grelot</Grelot>
                </a>
                <div>
                   <SignIn onClick={(e)=> Login()}>Signin</SignIn>
                </div>
            </Nav>
            <Section>
                    <Hero>
                        <h1>Connect on Grelot Space</h1>
                        <img src="images/login_logo.png" alt=""/>
                    </Hero>
                    <Form>
                        <UserType>
                            <select  onChange={handlechange}>
                                {usertypes.map((v,i) =>   <option>{v}</option> )}
                            </select>
                        </UserType>

                        <Google onClick={() => {usertype.length > 0 && usertype !== "Select usertype"  ? open()  :  Swal.fire({title:'', text:'Pls select usertype', icon:'info'})}}>
                            <img src="images/google.svg" alt=""/>
                            {!click ? "Sign in with Google" : "Loading..."}
                        </Google>

                        <DontHaveAccount onClick={(e) => OpenPage()}>
                            Don't have an account?  Register
                        </DontHaveAccount>
                    </Form>
            </Section>
        </Container>
    )
}


const Container =  styled.div`
padding: 0px;
`;


const Nav = styled.nav`
max-width: 1128px;
margin: auto;
padding: 12px 0 16px;
display: flex;
align-items: center;
position: relative;
justify-content: space-between;
flex-wrap: nowrap;

& > a{
width : 135px;
height: 34px;
text-decoration: none;
@media (max-width: 768px){
padding: 0 5px;

}
}

`;



const Grelot = styled.h1`
font-size: 25px;
color:#FF5D16;
font-family: "Poppins", sans-serif;
`;


const SignIn = styled.a`
box-shadow:  inset 0 0 0 1px #0a66c2;
color: #0a66c2;
border-radius: 24px;
transition-duration: 167ms;
font-size: 16px;
font-weight: 600;
line-height: 40px;
padding: 10px 24px;
text-align: center;
background-color: rgba(0, 0, 0, 0);
&::hover{
background-color: rgba(112, 181, 249, 0.15);
color: #FF5D16;
text-decoration:none;
}

`;


const Section = styled.section`
display: flex;
align-content: start;
min-height: 700px;
padding-bottom:138px;
padding-top: 40px;
padding: 60px 0;
position: relative;
flex-wrap: wrap;
width: 100%;
max-width: 1128px;
align-items: center;
margin:auto;
@media(max-width: 768){
margin: auto;
min-height: 0px;
}

`;


const Hero = styled.div`
width: 100%;
h1{
padding-bottom: 0;
width: 55%;
font-size: 56px;
color:#FF5D16;
font-weight: 200;
line-height: 70px;
@media(max-width: 768px){
text-align:center;
font-size: 20px;
width: 100%;
line-height: 2;
}
}

img{
//z-index : -1;
width: 700px;
height: 670px;
position: absolute;
bottom: -2px;
right: -100px;
@media(max-width: 768px){
top:230px;
width: 100%;
margin: auto;
position: initial;
height: initial;
}
}
`;



const Form= styled.div`
margin-top: 100px;
width: 480px;
@media(max-width: 768px){
margin-top: 20px;

}
`;


const Google = styled.button`
display: flex;
justify-content: center;
background-color: #fff;
align-items: center;
height: 56px;
width: 100%;
border-radius: 28px;
box-shadow: inset 0 0 0 1px rgba(0 0 0 /60%),
inset 0 0 0 2px rgba(0 0 0 /0%) inset 0 0 0 1px rgba(0 0 0 /0);
vertical-align:middle;
z-index: 0;
transition-duration: 167ms;
font-size: 20px;
color: rgba(0 0 0 0.6);
&:hover{
background-color: rgba(207,207, 207, 0.25);
color: rgba(0, 0, 0, 0.75);
}
`;


const UserType = styled(Google)`
background:none;
border:none;
padding:10px;
margin:10px;
select{
padding:10px;
border-radius: 28px;
}
&:hover{
background: none;
color: none;
}
`;


const DontHaveAccount = styled.div`
display: flex;
margin-top:30px;
justify-content: center;
align-items: center;
height: 56px;
width: 100%;
cursor: pointer;
font-family: "Poppins", sans-serif;

`;


const mapStateToProps = (state) => {
return {
user: state.userState.user,
};
}



const mapDispatchToprops = dispatch => ({ 
   Signin: (e) => dispatch(signInAPIGoogle(e)),
});


export default connect(mapStateToProps,mapDispatchToprops)(Login);