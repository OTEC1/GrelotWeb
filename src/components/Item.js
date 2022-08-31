import React from 'react'
import { connect } from "react-redux";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import ShareDialog from './ShareDialog';
import { useState } from 'react';
import {Rating} from 'react-simple-star-rating';
import swal from 'sweetalert2'
import axios  from 'axios';
import { RiAddLine, RiBankCard2Line, RiCommandLine, RiPencilLine, RiPulseLine, RiShoppingBag2Line, RiShoppingBasket2Line, RiShoppingCart2Line, RiThumbUpFill, RiThumbUpLine } from 'react-icons/ri';
import ReactPlayer from 'react-player';
import { TimestreamQuery } from 'aws-sdk';
import {BrowserView, MobileView} from 'react-device-detect'
import { addtocart } from '../actions';




const Item = (props) => {


    const list  =  ["facebook.svg", "twitter.svg","whatsapp.svg","instragram.svg"];
    const [showModel, setShowModel] = useState("close");
    const [rate, setRating] = useState(0);
    const [respones, setResponse] = useState(''); 
    const [quantity, setQuantity] = useState(1);
    const [thumbs, setThumbs] = useState(true);
    const [sectionToOpen, setSectionToOpen] = useState("none");



    const handlequantityInput = (e)  => {
        const value = e.target.value.replace(/\D/g, "");
        if(!value.toString().startsWith("0"))
              setQuantity(value);
    }

   
    const updateProductRating = () => {

        if(thumbs)
            setThumbs(false);
         else
             setThumbs(true);

            axios.post(process.env.REACT_APP_ACCESS_FIREBASE_ENDPOINT2, {
                Client:{
                    doc_id: props.id,
                    email: props.user ? props.user.email : "SessionID", 
                },
                ClientAction: {
                    thumb: !thumbs ? 0 : 1,    
                    image: props.dataPass.message.UserPost.image,
                },
              })
               .then(res => {
                  console.log(res)
              }).catch(err => {
                  console.log(err);
              })
            

    }

    const  sendRequestToModel = (event) => {
        event.preventDefault();
     
                switch(showModel){
                    case "open":
                        setShowModel("close");
                        break;

                    case "close":
                        setShowModel("open");
                    break;

                    default:
                        setShowModel("close");
                        break;

                        console.log("OK ! ")
                };
        }


    const handleRating = (rate: number) => {
        setRating(rate);
    }

    let lists = [];
    lists.push(props.dataPass);


   
   
    let sessioncart = []; let cartstate = [];
    const addItemtosessioncart = (v) => {
       setResponse("Added to cart")
       snackbar(); sessioncart = []
       cartstate  = JSON.parse(localStorage.getItem("cart"));

       if(cartstate)
            for(var n=0; n <= cartstate.length; n++)
                    if(cartstate[n] != null && cartstate[n] != undefined)
                        sessioncart.push(cartstate[n]);
      else
        console.log("none")

        sessioncart.push(v);
        localStorage.setItem("cart",JSON.stringify(sessioncart));
        props.addtocart();


        console.log(localStorage.getItem("cart"));

    }





    const checkout = () => {
            localStorage.removeItem("cart");
            props.addtocart();
            console.log("E")
    }



    function snackbar() {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      }

   
    return(
        <>
        {console.log(lists)}
          {lists.length > 0  ? (
                <Container>
                     {lists.map((e) => (
                         <>
                         {e.message!=undefined ? (
                            <>
                                    <Imagelayout>
                                        {props.model === "P" ?
                                            <img   src={process.env.REACT_APP_APP_S3_IMAGE_BUCKET+e.message.UserPost.image}  onError={(e)=>{e.target.onerror = null; e.target.src="./images/error.png"}}/>  
                                            : <>
                                                    <BrowserView>
                                                        <ReactPlayer 
                                                            url={process.env.REACT_APP_APP_S3_VIDEO_BUCKET+e.message.UserPost.video}   
                                                            playing={true}
                                                            loop={true}
                                                            controls={true}
                                                            muted={true}
                                                            width="90%"
                                                            height="75vh"/>
                                                    </BrowserView>

                                                    <MobileView>
                                                        <ReactPlayer 
                                                            url={process.env.REACT_APP_APP_S3_VIDEO_BUCKET+e.message.UserPost.video}   
                                                            playing={true}
                                                            loop={true}
                                                            controls={true}
                                                             muted={true}
                                                            width="99%"
                                                            height="50vh"/>
                                                    </MobileView>
                                                </>
                                        }

                                        <Social_user_handles>
                                            <User>
                                                
                                            </User>
                                            <PostSocial>
                                                <Share onClick={sendRequestToModel}>
                                                    Share
                                                </Share>
                                            </PostSocial>
                                         </Social_user_handles>

                                       <UserView>
                                       
                                        </UserView>
                                </Imagelayout>
                                
                        



                                <Detailslayout>
                                    <Social_user_handles>
                                        <User>
                                           {e.message.User.businessName}
                                        </User>

                                        <Social>
                                            {list.map(w => 
                                            <img  src={"/images/"+w}/>
                                            )}
                                        </Social>
                                    </Social_user_handles>

                                    <Item_meta_data>
                                        <Space>

                                        </Space>


                                       <TopChain>
                                           <Title>
                                            <ul>   
                                            <li>
                                                <span id="price">N{e.message.UserPost.price}</span>   
                                            </li>

                                            <li>
                                                <span id="tag">Tag: {e.message.UserPost.title}</span>
                                            </li>

                                            <li>
                                                <span id="gender">Gender:  {e.message.UserPost.targeted_audience}</span>
                                             </li>          
                                            </ul>
                                            </Title>

                                            <Des>
                                                <ul>
                                                    <li>
                                                    Description:
                                                    <br/> {e.message.UserPost.description}
                                                    </li>
                                                </ul>
                                            </Des>
                                            
                                       </TopChain>

                                       <MiddleChain>

                                           <BuyContainer>
                                                <Buy_section>
                                                <label>Quantity</label> 
                                                <input type="text"  value={quantity}  onChange={handlequantityInput} />
                                                </Buy_section>

                                                <Add2cart>
                                                    <button onClick={(evt) => addItemtosessioncart({name:e.message.UserPost.title, img_url: props.model === "P" ? e.message.UserPost.image : e.message.UserPost.video, quantity:quantity, doc_id:props.id,model:props.model, price:e.message.UserPost.price})}>ADD TO CART
                                                        <RiShoppingCart2Line
                                                        id="cart"
                                                        size="15"
                                                        color="#fff"/>
                                                    </button>
                                                </Add2cart>

                                            </BuyContainer>

                                          
                                            <Ratings>

                                                <div id="rating">
                                                    <Rating onClick={handleRating}
                                                            ratingValue={rate}
                                                            size={25}
                                                            iconsCount={5}
                                                            readonly={true}
                                                            emptyColor="#f1a545"
                                                            />
                                                    </div>

                                                    <div id="Popup">
                                                       <button>Drop a Review +</button>
                                                    </div>
                                                       

                                                <div id="thumbs">
                                                   {thumbs ?
                                                        (
                                                            <RiThumbUpLine 
                                                                onClick={updateProductRating}
                                                                id="thumb"
                                                                size={30}
                                                                color="#000"/>
                                                        )
                                                        :
                                                        (

                                                        <RiThumbUpFill
                                                            onClick={updateProductRating}
                                                            id="thumb"
                                                            size={30}
                                                            color="#0D9CFC"/>
                                                        
                                                        )
                                                    }
                                                    
                                                </div>
                                               

                                            </Ratings>
                                       </MiddleChain>

                                       <BottomChain>
                                           <PayButton>
                                               <button  onClick={(e) => checkout()}> checkout <RiBankCard2Line id="card" size="20"  color="#000"/> </button>
                                           </PayButton>  
                                       </BottomChain>

                                       <MoreContent>
                                                
                                        </MoreContent>  

                                    </Item_meta_data>
                                </Detailslayout>
                               </>
                             ):(<div id="load">
                                <Loader
                                    type="Oval"
                                    color="#FF5D16"
                                    height={100}
                                    width={100}
                                /> 
                          </div>)}
                     </>
                     ))}
                 <ShareDialog showModel={showModel} sectionToOpen={sectionToOpen}   sendRequestToModel={sendRequestToModel}/>
                 <div id="snackbar">{respones}</div>
            </Container>
         ): (<h1>Loading...</h1>)
         }
       </>
    )

}

const Container = styled.div`
width:80%;
margin-left: auto;
margin-right: auto;
padding-top: 150px;
overflow-x: hidden;

::-webkit-scrollbar {
display: none;
}

#load{
margin:auto;
margin-top:25vh;
text-align: center;
}




#snackbar {
  visibility: hidden; 
  min-width: 200px;
  margin-left: -125px; 
  background-color: #333; 
  color: #fff; 
  text-align: center; 
  border-radius: 2px; 
  padding: 16px;
  position: fixed; 
  z-index: 9999; 
  border-radius:10px;
  left: 50%;  
  margin-top: 50px;
}
#snackbar.show {
  visibility: visible; 
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
  from {top: 0; opacity: 0;}
  to {top: 30px; opacity: 1;}
}

@keyframes fadein {
  from {top: 0; opacity: 0;}
  to {top: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {top: 30px; opacity: 1;}
  to {top: 0; opacity: 0;}
}

@keyframes fadeout {
  from {top: 30px; opacity: 1;}
  to {top: 0; opacity: 0;}
}





@media(max-width:1200px){
width: 100%;
}

@media(max-width:768px){
width: 100%;

#snackbar {
margin-left: -120px; 
}

}





`;


const Imagelayout = styled.div`
position: relative;
width: 50%;
height: 75vh;
float: left;
border-radius: 20px;


img{
width: 100%;
max-width:100%;
min-width:100%;
height: 100%;
max-height:100%;
min-height:100%;
object-fit: cover;
}



@media(max-width:768px){
width: 100%;
height: 70%;
}


`;



const Detailslayout = styled.div`
position: relative;
width: 50%;  
height: 75vh;
float: right;

@media(max-width:768px){
width: 100%;
}

`;




const  Item_meta_data = styled.div`
height: 100%;
width: 100%;
`;


const Space = styled.div`
width: 100%;
height: 10%;
`;

const TopChain =  styled.div`
width: 100%;
height: 20%;
display: flex;
margin-top: 10px;

@media(max-width:768px){
height:auto;
display:block;
margin-top: 40px;

} 

`;

const Title = styled.div`  
width: 50%;
height: 100%;
text-align: left;


ul li{
display: flex;
flex-wrap: wrap;
font-family: "Poppins", sans-serif;
margin-left: 10px;
}

#price{
font-size: 25px;
color:#FF5D16;
font-weight: 700;
}

#tag{
font-size: 15px;
color:#000;
}

#gender{
font-size: 12px;
color:#000;
}
@media(max-width:768px){
width: 100%;   
} 

`;


const Des = styled.div` 
width: 50%;
height: 100%;
top:0px;
right: 0px;
text-align: left;
display: flex;



ul li{
margin-left: 20px;
font-family: "Poppins", sans-serif;
overflow-y: scroll;
max-height: 90%;
text-align:left;

::-webkit-scrollbar {
display: none;
}

}

 

input{
width: 45px;
height: 23px;
border-radius: 2px;
padding: 3px;
text-align: center;
margin:3px;
background-color: #f5f5f5;
border: 0.1 solid #c7c7c7;
}


@media(max-width:768px){
width: 100%;
padding-bottom:15px;  
margin-top: 10px;

ul li{
margin-left: 10px;
max-height: 100%;
}

input{
position: absolute;
right: 3px;
}

} 

`;





const MiddleChain = styled.div`
width: 100%;
height: 20%;
display: flex;
margin-top:10px;

@media(max-width:768px){
height:auto;
display:block;
margin-top: 30px;

} 
`;

const BuyContainer = styled.div`
width: 100%;
height:100%;
display: flex;
flex-wrap: wrap;

`;

const Buy_section = styled(Des)` 
height: 50%;
width:100%;

label{
margin-top:8px;
margin-left:15px;
color:#c7c7c7;
}


@media(max-width:768px){
margin-top: 30px;

label{
justify-content: space-around;
}
} 

`;

const Add2cart = styled(Des)`
height: 50%;
width:100%;
justify-content: space-between;


label{
margin-top:15px;
margin-left:5px;
}

button{
margin:10px;
width:90%;
height:auto;
background-color:#FF5D16;
border-radius:2px;
border:none;
padding:5px;
color:#fff;
font-weight:600;
cursor: pointer;
padding-bottom: 10px;
bottom:0px;
}

#cart{
margin-left:7px;
position: relative;
top: 3px;
}


@media(max-width:768px){

button{
margin:5px;
width:100%;
}

label{
margin-top:15px;
justify-content: space-between;
}
} 
`;




const Ratings = styled.div` 
height: 90%;
width:100%;
text-align:center;
position: relative;



#rating{
width: 100%
display: inline-block;
text-align:right;
padding: 5px;
}


#Popup{
display: inline-block;
background: red;
float: left;
}

button{
padding:10px;
border: none;
box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
cursor: pointer;
position: absolute;
bottom: 0px;

}



#thumbs{
width: 50%;
display: inline-block;
right:0px;
position: absolute;
bottom: 0px;
text-align:right;
}


#thumb{
position: relative;
top:7px;
}

@media(max-width:768px){
width: 97%;
margin-top: 30px;
margin:5px;


#Popup{
text-align:left;
margin-top:50px;
}

#thumbs{
text-align:right;
right:5px;
}

#thumb{
top:40px;
}

} 


`;


const BottomChain = styled.div`
width: 100%;
height: auto;
display: flex;
flex-wrap: wrap;
text-align: center;
margin:10px;




@media(max-width:768px){
height:auto;
display:block;
margin: 2px;
} 
`;


const PayButton = styled.div`
width: 100%;
height: 20%;
text-align: center;

#card{
position: relative;
top: 5px;
}


button{
width: 90%;
color:#000;
border-radius: 1 solid #000;
margin:auto;
padding-bottom: 7px;
text-align: center;
text-transform: uppercase;
}

@media(max-width:768px){
margin-top:70px;
button{
width:90%;
margin:0px;
padding: 10px;
}
}

`;



const MoreContent = styled.div` 
width: 99%;
height: 35%;
background-color: black;
margin: 12px;

@media(max-width:768px){
margin:0px;
margin-top: 30px;
} 

`;

const Social_user_handles = styled.div`
width: 100%;
height: 50px;
position: absolute;
top:0;
`;


const User = styled.div` 
width: 50%;
height: 100%;
float: left;


img{
width: 30px;
height: 30px;
margin: 7px;
border-radius: 50%;
border:2px solid #ffffff;
}

label{
position: absolute;
margin-left: 15px;
top:5px;
font-family: "Poppins", sans-serif;
font-weight: 700;
color: #000;
padding:5px;
background-color: #fff;
border-radius: 15px 0px 15px 0px;
}

@media(max-width:768px){
width: 25%;
margin-top: 20px;
}
`;


const UserView = styled.div` 
position: absolute;
width: 100%;
height: auto;
bottom: 0;

span{
float: right;
right: 2px;
bottom: 0px;
font-family: "Poppins", sans-serif;
font-weight: 900;
color: #000;
margin:7px;
font-size: 30pt;
background-color: #fff;
border-radius: 15px 0px 15px 0px;
padding: 5px;
}



`;


const Social = styled.div`  
width: 50%;
height: 100%;
float: right;
text-align: right;

img{
display: inline-block;
width: 30px;
height: 30px;
border-radius: 50%;
margin: 10px;
}

@media(max-width:768px){
width: 75%;
padding-top:7px;
margin-top: 20px;


img{
margin: 5px;
} 
}
`;


const PostSocial =  styled.div`

width: 50%;
height: 100%;
float: right;
text-align: right;

`;


const Share = styled.button`
min-width:60px;
border-radius: 20px;
padding-left: 16px;
padding-right: 16px;
height: 35px;
margin-top:5px;
margin-right: 7px;
background:"#0a66c2";
color:"white";

&:hover{
background: #FF5D16;
}

@media(max-width:768px){
z-index:8888888888888888;
}
`;


const mapStateToProps = (state) => {
return {
    user: state.userState.user,
}
}


const mapDispatchStatetoProps = (dispatch) => ({
addtocart : (e) => { dispatch(addtocart(localStorage.getItem("cart")))}
})

export default connect(mapStateToProps,mapDispatchStatetoProps)(Item);
