import React, { Component, useEffect }  from 'react';
import styled from "styled-components";
import AWS from 'aws-sdk';
import AgoraRTC from 'agora-rtc-sdk';
import {postArticleAPI} from '../actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faShare, faVideo} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {connect} from "react-redux";
import firebase from 'firebase/compat';
import swal   from 'sweetalert2';
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import { faCartPlus} from "@fortawesome/free-solid-svg-icons";
import {useHistory}  from 'react-router'


const Videomodel = (props) => {


    const reset =  (e) => {
        props.sendRequestToModel(e);
    };


    const history = useHistory();

    const  itemselected =  ()  => {
        history.push('/itemselected/'+props.doc_id+"/"+props.option);
    } 
 

  
    return(
        <>
        {props.showModel === "open" && props.sectionToOpen.length > 0
         &&(
            <Container>
                <Content>

                    <Header>
                    <h2></h2>
                    <button  onClick={(event) => reset(event)}>X</button>
                    </Header>
                        <SharedContent>
                            
                                    <Editor>
                                        <ReactPlayer   
                                            width="100%" 
                                            playing={true}
                                            loop={true}
                                            controls={true}
                                            url={process.env.REACT_APP_APP_S3_VIDEO_BUCKET+props.sectionToOpen}/>
                                    </Editor>  
                                
                            </SharedContent>
                            <ShareCreation>
                                <Attach/>
                            <PostButton onClick={(e) => itemselected()}>
                            <FontAwesomeIcon icon={faCartPlus} id="heart"/>
                            </PostButton>
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
    max-width:50%;
    background-color: white;
    max-height:90%;
    overflow:initial;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    top:32px;
    margin: 0 auto;

    @media(max-width: 768px){
        top:10%;
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





const PostButton = styled.button`
    min-width:60px;
    border-radius: 20px;
    padding-left: 16px;
    padding-right: 16px;
    height: 35px;
    right:2px;
    background: ${(props) => (props.disabled ?  "rgba(0,0,0,0.8)" : "#0a66c2")};
    color: ${(props) => (props.disabled ? "rgba(1,1,1,0.2)": "white")};
    &:hover{
        background: ${(props) => (props.disabled ? "rgba(0,0,0,0.08)" : "#004162")};
    }
`;


const Editor = styled.div`

        padding:12px 24px;

        textarea{
            width:100%;
            min-height:100px;
            resize: none;
            padding:5px;
        }

        input{
            width:100%;
            height: 35px;
            font-size:16px;
            margin-bottom: 10px;
            padding:5px;

        }


        
        select{
            width:100%;
            margin:5px;
            padding:12px;
            margin-bottom: 10px;

        }

`;


const  mapStateToProps = (state)  => {
    return {
        user: state.userState.user,
    };
};

const mapDistpachToProps = (dispatch) => ({
   
});

export default  connect(mapStateToProps,mapDistpachToProps)(Videomodel);