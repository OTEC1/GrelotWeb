import React, { Component }  from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCartPlus, faGift, faPaintBrush, faPrint, faShippingFast, faUserFriends } from "@fortawesome/free-solid-svg-icons";


const Leftside = (props) =>{
    return (<Container>
                    <ArtCard>
                          <HeaderTeaser>
                                <a>
                                <span>Explore</span>
                                </a>
                          </HeaderTeaser>

                          <Items>
                                <a>
                                    <span>
                                        <FontAwesomeIcon icon={faBell}  id="notify"/>
                                        <label>&nbsp;New in </label>
                                    </span>
                                </a>
                         </Items>


                         <Items>
                                <a>
                                    <span>
                                        <FontAwesomeIcon icon={faGift} id="gift"/>
                                        <label> Gift card</label>
                                    </span>
                                </a>
                        </Items>
                            

                        <Items>
                                    <a>
                                    <span>
                                        <FontAwesomeIcon icon={faShippingFast}  id="bulk"/>
                                        <label>Bulk orders</label>
                                    </span>
                                    </a>
                        </Items>



                        <Items>
                                    <a>
                                    <span>
                                        <FontAwesomeIcon icon={faPaintBrush} id="custom"/>
                                        <label>Branding</label>
                                    </span>
                                    </a>
                         </Items>
                    
                    </ArtCard>
    </Container>
    );
};




const Container = styled.div`
grid-area: leftside;
position: fixed;
font-family: "Poppins", sans-serif;

@media(max-width:768px){
display: none;
}
`;


const ArtCard = styled.div`
text-align:center;
overflow:hidden;
margin-bottom:8px;
border-radius: 5px;
transition: box-shadow 83ms;
position: relative;

`;



const HeaderTeaser = styled.h3`
font-weight: 900;
font-size:22px;
color:#000000;
text-align: left;
padding-left: 18px;

`;


const UserInfo = styled.div`  


`;


const Items = styled.a`
text-align:left;
padding: 12px;
font-size:15px;
display:block;
margin: 10px;
height: 10px;
margin-left:-7px;

&:hover{
transform: scale(1.1);
z-index: 1;
transition: transform 900ms;
}

span{
display:flex;
align-items: center;
margin:10px;
font-size: 15px;
};

label{
text-align: left;
color: #959595;


}

#gift{
color:#FF5D16;
margin-right: 10px;
font-size: 14px;
}

#notify{
color:#FF1010;
margin-right: 10px;
font-size: 14px;
}

#bulk{
color:#20FF10;
margin-right: 10px;
font-size: 14px;
}

#custom{
color:#10D6FF;
margin-right: 10px;
font-size: 14px;
}

`;



export default Leftside;