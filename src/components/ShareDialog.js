import React from "react"
import styled from "styled-components"
import { connect } from "react-redux";

const ShareDialog =  (props) => {

    const list  =  ["facebook.svg", "twitter.svg","tiktok.svg","whatsapp.svg","instragram.svg"];

    const reset =  (e) => {
        props.sendRequestToModel(e);
    };

    return(
        <>
        {props.showModel === "open" && props.sectionToOpen.length > 0
         &&(
            <Container>
                <Content>

                    <Header>
                    <h2>Share this Post </h2>
                    <button  onClick={(event) => reset(event)}>X</button>
                    </Header>
                        <SharedContent>
                                <Editor>
                                {list.map(w => 
                                   <img  src={"/images/"+w}/>
                                )}
                                </Editor>  
                            </SharedContent>

                            <ShareCreation>
                                <Attach/>
                        </ShareCreation>
                </Content>
               </Container>
        )}
        </>
    )

}

const Container = styled.div `
    position:fixed;
    top:0;
    left:0;
    bottom:0;
    z-index: 99999;
    color:black;
    width:100%;
    background-color: rgba(0,0,0,0.8);
`;



const Content  =  styled.div`
    max-width:30%;
    background-color: white;
    max-height:auto;
    overflow:initial;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    top:25vh;
    margin: 0 auto;

    @media(max-width: 768px){
        top:25vh;
        max-width:100%;
    }
   
`;




const Header  =  styled.div`
     display:  block;
     padding : 16px 20px;
     border-bottom: 1px solid rgba(0,0,0,0.15);
     font-size:16px;
     line-height: 1.5;
     color: rgba(0,0,0,0.6);
     font-weight: 400;
     display:flex;
     justify-content: space-between;
     align-items:center;
     button{
         height:40px;
         width:40px;
         min-width:auto;
         border-radius: 50%;
     }
`;



const SharedContent = styled.div`
    display:flex;
    flex-direction: column;
    flex-grow:1;
    overflow-y:auto;
    vertical-align: baseline;
    background: transparent;
    padding: 8px 12px;
`;



const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 24px;
    svg,img{
        width:48px;
        height:48px;
        background-clip: content-box;
        border:2px solid  transparent;
        border-radius:50%;
        padding:5px;
    }
    span{
        font-weight:600;
        font-size:16px;
        line-height:1.5px;
    }
`;



const ShareCreation = styled.div`
    display:flex;
    justify-content: space-between;
    padding: 12px 24px 12px 16px;
`;


const Attach = styled.div`
    display:flex;
    align-items:center;
    height:40px;
    min-width: auto;
    color: rgba(0,0,0,0.5);
`;



const Editor = styled.div`

padding:12px 24px;
text-align: center;

img{
width: 40px;
height: 40px;
margin:10px;
border-radius: 50%;
}

@media(max-width:768px){
padding:10px 20px;
img{
margin:7px;
}
} 
`;





const  mapStateToProps = (state)  => {
    return {
        user: state.userState.user,
    };
};

const mapDistpachToProps = (dispatch) => ({
   
});

export default  connect(mapStateToProps,mapDistpachToProps)(ShareDialog);