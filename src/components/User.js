import React, { Component, useEffect }  from 'react';
import styled from "styled-components";
import {connect} from "react-redux";
import {useHistory} from 'react-router';
require('dotenv').config();

const VendorUser = (props) => {


const history = useHistory();

const redirectUser = () => {
    {props.user ? props.user.User.userType !== process.env.REACT_APP_USERTYPE  ? history.push("/selectaction") :  history.push("/") : history.push("/") }
}


useEffect(() => {
console.log(props.user);
},[])

    return (
        <Container>
            <Section>
                <Signinusersection>
                    <User_Page>
                       <CardBackground/>
                           <UserInfo>
                                <UserNameDisplay>
                                Welcome <br/> {props.user ? props.user.User.email : "user" }  
                                </UserNameDisplay>
                            </UserInfo>

                            <Sharebox  onClick={redirectUser}>
                               {props.user ? props.user.User.usertype !== process.env.REACT_APP_USERTYPE ? "Add a post Section" : "Video call section" : "Video call section"} 
                                <div>
                                    {props.user ?  <img src={props.user.photoURL} alt=""/> : <img src="images/user.svg" alt=""/>}
                                    <button> 
                                        {props.user ? props.user.User.usertype !== process.env.REACT_APP_USERTYPE ? "Start a post" : "Start video call" : "Start video call"}
                                    </button>
                                </div>
                            </Sharebox>
                     </User_Page>
                 </Signinusersection>

                <Signinuserrightsection>
                
                </Signinuserrightsection>
                
            </Section>
        </Container>
    );
};


const Container =  styled.div`
padding-top: 150px;
max-width: 100%;


@media(max-width:768px){
padding-top: 30px; 
}
`;


const Section = styled.section`
width:100%;
height: 100vh;
text-align: center;

@media(max-width: 768px) {
height: auto;
}

`;


const User_Page =  styled.div`
overflow:hidden;
margin-bottom: 8px;
width:100%;
background-color: #fff;
border-radius: 5px;
transition: box-shadow 83ms;
border:none;
box-shadow: 0 0 0 1px rgba(0 0 0/15%), 0 0 0 rgba(0 0 0/20%);

@media(max-width:768px){
width:100%;
margin-left:auto;
margin-right:auto;
}
`;



const User_Page2 =  styled(User_Page)`
height:200px;
width:200px;
margin-top:50px;

@media(max-width:768px){
width:100%;
margin-left:auto;
margin-right:auto;
}
`;



const UserInfo = styled.div`
border-bottom:1px solid rgba(0,0,0,0.15);
padding: 12px 12px 16px;
word-wrap:break-word;
word-break:break-word;

`;



const CardBackground = styled.div`
background: url('/images/card-bg.svg');
background-position:center;
background-size:462px;
height:54px;
margin: -12px -12px 0;


`;


const UserNameDisplay = styled.div`
margin-top:20px;

`;

const CommonCard = styled.div`
text-align:center;
overflow:hidden;
margin-bottom:3px;
background-color:#fff;
border-radius:5px;
position:relative;
border:none;
box-shadow: 0 0 0 1pz rgba(0 0 0 /15%), 0 0 0 rgba(0 0 0/20%);

`;



const Sharebox = styled(CommonCard)`
display: flex;
flex-direction:column;
color:#95ab7b;
margin: 0 0 8px;
background:white;
margin-top:15px;

div{
button{
outline:none;
color:rgba(0,0,0,0.6);
font-size:14px;
line-height:1.5px;
min-height:48px;
background:transparent;
border:none;
display:flex;
align-items:center;
font-weight:600;
}
&:first-child{
display:flex;
align-items:center;
padding: 8px 16px 0px 16px;
}
img{
width:58px;
border-radius:50%;
margin-right:8px;
}
button{
margin: 4px 0;
flex-grow:1;
border-radius:35px;
padding-left:16px;
border:1px solid rgba(0,0,0,0.15);
background:#fff;
text-align:left;
}
}



@media(max-width:768px){
div{
img{
    width:38px;
}
button{
min-height:38px;
}
}
}
`;


const Signinusersection  = styled.div`
height: 80vh;
width: 40%;
display: inline-block;
overflow:hidden;
margin-bottom:8px;
border-radius: 5px;
transition: box-shadow 83ms;
position: relative;
border: none;
margin-bottom: 25px;
margin:10px;



@media(max-width: 768px) {
width: 90%;
display: block;
margin: auto;
margin-bottom: 25px;
margin-top: 100px;

}

`;


const Signinuserrightsection = styled(Signinusersection)`
box-shadow: 0 0 0 1px rgba(0 0 0/15%), 0 0 0 rgba(0 0 0/20%);

`;





const mapStateToProps = (state) => {
return {
    user: state.userState.user,
};
};


const mapDistpatchToProps = dispatch => ({});

export default connect(mapStateToProps,mapDistpatchToProps)(VendorUser);