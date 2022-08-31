import React, { Component }  from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faPhotoVideo, faVideo } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import PostModel from './Postmodel';
import swal from 'sweetalert2'
import {connect} from  'react-redux'





const  Selectaction  = (props) => {
 

    const [showModel, setShowModel] = useState("close");
    const [sectionToOpen, setSectionToOpen] = useState("none");
   
       const  sendRequestToModel = (event) => {
        event.preventDefault();
        if(event.target !== event.currentTarget){
            return;
        }
        if(props.user){
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
                };
          }else
              swal.fire(
                         {text:'Pls sign in to upload your products ',
                         icon:'warning'})
        }
   

    


    return (<Container>
            <Section>
                <TopSection>
                    <PictureCard>
                        <CardBackground/>
                            <Avata>
                                <FontAwesomeIcon  icon={faPhotoVideo} />
                            </Avata>
                            <Info onClick={(event) => {sendRequestToModel(event); setSectionToOpen("Picture");}}> Photo + </Info>
                    </PictureCard>

                    <VideoCard>
                        <CardBackground/>

                        <Avata>
                                <FontAwesomeIcon icon={faVideo}/>
                            </Avata>
                            <Info onClick={(event) => {sendRequestToModel(event); setSectionToOpen("Video");}}> Video + </Info> 
                    </VideoCard>


                    <VideoCallCard>
                        <CardBackground/>
    
                            <Avata>
                                <FontAwesomeIcon icon={faPhone} />
                            </Avata>
                            <Info onClick={(event) => {sendRequestToModel(event); setSectionToOpen("Vidcal");}}>Connect via Video Call </Info>
                    </VideoCallCard>

                </TopSection>
            </Section>
            <PostModel  showModel={showModel} sectionToOpen={sectionToOpen}   sendRequestToModel={sendRequestToModel}/>
    </Container>
    )
};



const Container =  styled.div`
         padding-top: 200px;
         max-width: 100%;
         margin-bottom:100px;
        

     
`;


const Section = styled.section`
        width:80%;
        height: auto;
        text-align: center;
        margin:  auto;
       

     

`;


const TopSection = styled(Section)`
        width:100%;
        height:270px;
        display: flex;
        flex-wrap: wrap;

        @media(max-width:768px){
            height:100px;
        }
`;




const CardBackground = styled.div`
        background: url('/images/card-bg.svg');
        background-position:center;
        background-size:462px;
        height:54px;
        width:100%;
        border-radius:0 20px 0px 0px;

        @media(max-width:768px){
          border-radius:10px 10px 0px 0px;
        }
      


`;


const InnerDivs = styled.div`
     box-shadow: 0 0 0 1px rgba(0 0 0/15%), 0 0 0 rgba(0 0 0/20%);
     border-radius:0px 20px 0px 20px;
     margin:10px;
     background:#fff;

     @media(max-width:768px){
          border-radius:10px 10px 10px 10px;
        }
    
   
`;


const  Avata = styled.div`
    width:100%;
    height:200px;
    font-size:150px;
    margin-bottom:10px;
    color:#BFD3D6;

    @media(max-width:968px){
        font-size:100px;
        height:100px;
    }

    @media(max-width:768px){
        font-size:30px; 
        height:20px; 
        margin-top:5px;
        
    }
`;



const Info = styled.div`
        margin:20px;
        font-weight:500;
        width:auto;
        padding:10px;
        border-radius:4px;
        background: #f5f5f5;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

`;


const VideoCard = styled(InnerDivs)`
        flex: 1 1 160px; 

        @media(max-width:768px){
            flex: 1 1 50px; 
        }
`;



const PictureCard = styled(InnerDivs)`
        flex: 1 1 160px;
        @media(max-width:768px){
            flex: 1 1 50px; 
        }
`;



const VideoCallCard = styled(InnerDivs)`
        flex: 1 1 160px;  
        @media(max-width:768px){
            flex: 1 1 50px; 
            padding=bottom:150px;
        }     
`;


const mapStateToProps = (state) => {
    return{
        user:state.userState.user,
    };
};


const mapDispatchToProps = (dispatch) => ({
    
})

export default connect(mapStateToProps,mapDispatchToProps)(Selectaction);