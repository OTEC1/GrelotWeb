import React, { Component, useEffect ,useState}  from 'react';
import styled from "styled-components";
import {faSearch, faShoppingCart, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";
import { signOutApi,addtocart} from "../actions";
import {connect} from 'react-redux';
import {RiCoinLine, RiGroup2Fill, RiShoppingCartLine, RiAccountBoxLine, RiAccountCircleLine, RiSearch2Line, RiMenu2Line, RiSdCardFill, RiSdCardMiniFill, RiMoneyCnyBoxLine, RiTimer2Line, RiBitCoinLine} from 'react-icons/ri'
import { faBell, faCartPlus, faGift, faPaintBrush, faPrint, faShippingFast, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import '../signincss/style.css'


const Header  =  (props)  => {


    
    const [open, setopen] = useState(false)
    const history = useHistory();
    


    const routechange = () => {
        history.push("/login");
    }


    const user = () => {
        history.push("/user");
    }



    const buy = () => {
        history.push("/loans");
    }


    const token = () => {
        history.push("/token");
    }


    const home = () => {
        history.push("/");
    }



    const drawer = () => {
      setopen(true)
    }


    useEffect(() => {
      
    },[props.cart])


    return (
        <>
        {open ? 
        <Drawer>
            <button onClick={(e) => setopen(false)}>X</button>


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
          </Drawer> 
        :
        <Container>
                        <Content>
                            <Logo>
                            <Slider onClick={drawer}><RiMenu2Line/></Slider>    
                            <Grelot onClick={home}> Grelot</Grelot>
                            </Logo>

                            
                            
                            <Search>
                                <div>
                                    <input type="text" placeholder="Search for items ... brands..."/>
                                </div>
                                <SearchIcon>
                                <RiSearch2Line 
                                    size="15px" 
                                    color="#000"/>
                                </SearchIcon>
                            </Search>
                            
                            <Nav>

                            <NavlistWrap>
                            <Navlist onClick={user}>
                                    <a>
                                        <RiAccountCircleLine size={15}/>
                                        <span>User</span>
                                    </a>
                                </Navlist>


                                <Navlist  onClick={token}>
                                    <a>
                                        <RiCoinLine size={15}/>
                                        <span>Tokens</span>
                                    </a>
                                </Navlist>


                                <Navlist  onClick={buy}>
                                    <a>
                                    <RiBitCoinLine size={15}/>
                                        <span>Loans</span>
                                    </a>
                                </Navlist>



                                <Navlist  onClick={buy}>
                                    <a>
                                    <RiMenu2Line size={15}/>
                                        <span>Feeds</span>
                                    </a>
                                </Navlist>


                               {props.cart ? 
                                <Navlist  onClick={buy}>
                                    <a>
                                    <RiShoppingCartLine size={15}/>
                                        <span>cart +1</span>
                                    </a>
                                </Navlist>
                                :""}



                                <User  onClick = {routechange}>
                                    <a>
                                        {props.user && props.user.photoURL ?  <img src={props.user.photoURL}  alt=""/> :  <img src="/images/user.svg"  alt=""/>}
                                        <span>
                                        <img src="/images/down-icon.svg"  alt=""/>
                                        </span>
                                    </a>
                                    <Signout onClick= {() => props.Signout()}>
                                        {props.user ? <span>Sign out</span> : <span>Sign in</span>}
                                    </Signout>
                                </User>
                                </NavlistWrap>



                                <BottomNavWrap>
                                    <div className='bottom-nav'>
                                    
                                        <div className='bn-tab' onClick={user}>
                                            <RiAccountCircleLine 
                                                size='25' 
                                                color='#000'/>
                                            <label className="tsp">User</label> 
                                        </div>
                                        


                                        <div className='bn-tab' onClick={token}>
                                                <RiCoinLine
                                                    size='25'
                                                    color='#000'/>
                                                <label className="tsp">Token</label> 
                                        </div>

                    

                                        <div className='bn-tab'  onClick={buy}>
                                                <RiBitCoinLine
                                                    size='25'
                                                    color='#000'
                                                    />
                                                <label className="tsp">Loans</label> 
                                        </div>



                                        <div className='bn-tab'  onClick={buy}>
                                                <RiMenu2Line
                                                    size='25'
                                                    color='#000'
                                                    />
                                                <label className="tsp">Feeds</label> 
                                        </div>


                                        {props.cart ? 
                                            <Navlist  onClick={buy}>
                                                <a>
                                                <RiShoppingCartLine size={15}/>
                                                    <span>+1</span>
                                                </a>
                                            </Navlist>
                                            :""}

                                        <User onClick = {routechange}>
                                            <a>
                                                {props.user && props.user.photoURL ? <img src={props.user.photoURL} /> : <img src="/images/user.svg"  alt=""/>}
                                                <span>
                                                <img src="/images/down-icon.svg"  alt=""/>
                                                </span>
                                            </a>
                                            <Signout onClick= {() => props.Signout()}>
                                                {props.user ? <span>Sign out</span> : <span>Sign in</span>}
                                            </Signout>
                                        </User>
                                    
                                    </div>
                            </BottomNavWrap>
                            </Nav>
                        </Content>
                    </Container>
                }
            </>
)
}



const HeaderTeaser = styled.h3`
font-weight: 900;
font-size:22px;
color:#000000;
text-align: left;
padding-left: 18px;

`;


const Container = styled.div`
background-color: white;
border-bottom: 1px solid rgba(0,0,0, 0.08);
left: 0;
padding: 0  24px;
position:  fixed;
top: 0;
width: 100%;
z-index: 999;


@media(max-width:768px){
height: 50px;
}
`;




const Drawer = styled.div`
position: absolute;
height: 100vh;
width: 100%;
background: #f5f5f5;
z-index:9000000;

button{
background: transparent;
border:none;
height: 24px;
width: 24px;
color: #FF5D16;
font-weight:700;
padding: 20px;
font-size:17pt;
cursor: pointer;
}
`;





const ArtCard = styled.div`
text-align:center;
overflow:hidden;
margin-bottom:8px;
border-radius: 5px;
transition: box-shadow 83ms;
margin-top:100px;
position: relative;
font-family: "Poppins", sans-serif;

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





const Slider = styled.div`
display:none;
color:#FF5D16;
@media(max-width:768px){
display:block;
margin-top: 3.5px;
right: 0px;
float: right;
font-size:20pt;

}


`;

const Content = styled.div`
display: flex;
align-items: center;
margin: 0 auto;
min-height: 100%;
max-width: 1128px;
`;


const Logo = styled.span`
margin-right: 8px;

a{
text-decoration:none;
font-style: initial;
}


@media(max-width:768px){
width:90%;
top:3px;
}
`;



const Grelot = styled.h1`
font-size: 25px;
color:#FF5D16;
margin-right:50px;
width:20%;
font-family: "Poppins", sans-serif;
cursor: pointer;



@media(max-width:768px){
margin-right:10px;
}

`;






const Search = styled.div`
opacity: 1;
flex-grow: 1;
position: relative;
& > div {
max-width:280px;
input{
border:none;
box-shadow:none;
background-color: #ffffff;
border-radius: 7px;
color:rgba(0,0,0,0.9);
width: 218px;
padding: 0 8px 0 40px;
line-height: 1.75;
font-weight:400;
font-size: 14px;
height: 34px;
border-color: #dce6f1;
vertical-align: text-top;
}  

@media(max-width:768px){
input{
display: none;
}
}
}

&:hover{
input{
background-color: #eef3f8;
width: 220px;
}
}
`;


const SearchIcon = styled.div`
width: 40px;
position: absolute;
z-index: 1;
top:10px;
left: 2px;
border-radius: 0 2px 2px 0;
margin:0;
pointer-events: none;
display: flex;
justify-content: center;

@media(max-width:768px){
display: none;
}


`;


const Nav = styled.nav`
margin-left: auto;
display: block;




@media(max-width: 768px){
position: fixed;
left: 0;
bottom: 0;
width: 100%;
} 
`;


const BottomNavWrap = styled.div`
display: none;
@media(max-width:768px){
display: block;
}

`;


const NavlistWrap = styled.ul`
display: flex;
flex-wrap: nowrap;
list-style-type: none;

@media(max-width: 1200px){
margin-right: 40px;
} 

@media(max-width:768px){
display:none;
}

`;


const Navlist = styled.li`
display: flex;
align-items: center;
a{
align-items: center;
background:transparent;
display: flex;
flex-direction: column;
font-size: 12px;
font-weight: 400;
justify-content: center;
line-height: 1.5;
min-height:42px;
max-width: 250px;
margin-left: 45px;
margin-top:15px;
position: relative;
text-decoration: none;

span{
color: rgba(0,0,0,0.6);
display: flex;
align-items: center;
}



@media(max-width: 768px){
min-width: 10px;
margin-left: 40px;
} 
}

&:hover, &:active{
a{
span{
color:rgba(0,0,0,0.9);
}
}

}
`;



const Signout = styled.div`
position:absolute;
margin-top:65px;
background:white;
border-radius: 0 0 5px 5px;
border-bottom: 2px solid rgba(0,0,0,0.15);
width:100px;
height:30px;
font-size:16px;
text-align:center;
align-items: center;
padding-top:10px;
transition-duration: 167ms;
text-align: center;
display: none;
font-weight:400;
color:#0a66c2;

@media(max-width:768px){
margin-top:10px;
}


`;


const User = styled(Navlist)`
a > svg {
width: 24px;
border-radius:50%;
}

a > img{
width:24px;
height:24px;
border-radius: 50%;
}

span{
display: flex;
align-items: center;
}

&:hover{
${Signout}{
align-items:center;
display:flex;
justify-content: center;
}
}
`;



const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
        cart: state.cartState.cart,
    };
};


const mapDispatchToProps = (dispatch) => ({
    Signout : () => dispatch(signOutApi()),
});

export default connect(mapStateToProps,mapDispatchToProps)(Header);