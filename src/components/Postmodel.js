import React, { Component, useEffect }  from 'react';
import styled from "styled-components";
import AWS from 'aws-sdk';
import AgoraRTC from 'agora-rtc-sdk';
import {postArticleAPI} from '../actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faShare, faVideo} from "@fortawesome/free-solid-svg-icons";
import {useState,useRef} from "react";
import {connect} from "react-redux";
import firebase from 'firebase/compat';
import axios from 'axios';
import swal from 'sweetalert2'
import {v4 as uuid4} from 'uuid'
require('dotenv').config();



 AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
});


const bucket = new AWS.S3({
    apiVersion: process.env.REACT_APP_API_VERSION,
    httpOptions: {timeout: 0},
    params: {Bucket: process.env.REACT_APP_S3_BUCKET},
    region: process.env.REACT_APP_REGION, 
});




const Postmodel = (props) => {
    useEffect(() =>{
        axios.get(process.env.REACT_APP_ACCESS_FIREBASE_ENDPOINT3)
              .then(res => {
                    setCategory(res.data.message);
              })
              .catch(err => {
                  console.log(err)
              });


        axios.get(process.env.REACT_APP_ACCESS_FIREBASE_ENDPOINT4)
              .then(res => {
                 setCategoryUpload(res.data.message);
              })
              .catch(err => {
                  console.log(err);
              })

        },[])


    const [editorText1, setEditorText1] = useState("");
    const [editorText2, setEditorText2] = useState("");
    const [editorText3, setEditorText3] = useState("");
    const [shareImage, setShareImage] = useState('');
    const [videofile, setVideofile] = useState('');
    const [progress , setProgress] = useState(0);
    const videoElem = useRef();
  
    const [Category, setCategory] = useState([]);
    const [catselect, setCatselet] = useState('');

    const [gender, setGender] = useState('');
    const [categoryUpload, setCategoryUpload] = useState([]);

 

    const  handle = (e) => {
        if(editorText1 && editorText2 && editorText3){

                const file = e.target.files[0];
                setProgress(0);
                if(file === '' || file === undefined){
                    alert('The file is  a  ${typeof image}');
                    return;
                }
                if(file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg"  || file.type === "image/webp"){
                    console.log("Piture");
                    setShareImage(file);
                }else if(file.type === "video/mp4"){
                        console.log("Video");
                        setVideofile(file);
                }     
          
            }else
               swal.fire({
                    text:'Pls fill out all fields !',
                    icon: 'info'})
    }



    const handelOption1 =(e) => {
        setGender(e.target.value)
    }

    const handelOption2 =(e) => {
        setCatselet(e.target.value)
    }


  


    const PostData = (e) => {

        e.preventDefault();
        if(e.target !== e.currentTarget){
            return;
        }

        
        let filestoupload = [];
        let m1,m2;
        var ts=Math.floor(Date.now()/1000);
        let img_format,vid_format;
        
        const file1 = shareImage;
        const file2 = videofile;
        const file3 = editorText1;
        const file4 = editorText2;
        const file5 = editorText3;
        
        if(gender ===  undefined || gender === "Product Gender" || gender.length<=0 || Category === "Ad Category" || Category.length<=0 || Category === undefined)
             swal.fire({text:"Pls select category",icon:'warning'})
        else
            if(file1 !== ''){
          
              m1 = new Map();
              m1.set("id",file1.name);
              m1.set("ext",".png");
              m1.set("data",file1);
              filestoupload.push(m1);
              for(var x= 0; x < filestoupload.length; x++){
                m1 = filestoupload[x];
                img_format = addextension(m1.get("id"),ts,m1.get("ext"));
                img_format = img_format.replace(/ /g, '')
                SEND_TO_S3(img_format,m1.get("data"),1);
                sendDB(img_format,vid_format,file3,file4,file5);
              }
     
        }else if(file2 !== ''){

              m2 = new Map();
              m2.set("id",file2.name);
              m2.set("ext",".mp4");
              m2.set("data",file2);
              filestoupload.push(m2);
            for(var x= 0; x < filestoupload.length; x++){
                m2 = filestoupload[x];
                vid_format = addextension(m2.get("id"),ts,m2.get("ext"));
                vid_format = vid_format.replace(/ /g, '')
                SEND_THUMBNAIL(vid_format,m2.get("data"),2);
                sendDB(img_format,vid_format,file3,file4,file5);
            }
        }else 
             swal.fire({text:'Pls select a media file',icon:'warning'})
        

     
           

    }



    const sendDB = (img_format,vid_format,file3,file4,file5) => {
        const payload = {
            image: img_format ? img_format: '',
            video: vid_format ? vid_format : '',
            user: props.user,
            price: file3,
            title: file4,
            description: file5,
            productgender: gender,
            productaudience: catselect,
            productID: uuid4(),

        };
        props.PostData(payload);
     }

    


   
     function datatoBlob(dataurl){
         let array, binary,i,len;
         binary = atob(dataurl.split(',')[1]);
         array =  [];
         i = 0;
         len = binary.length;
         while(i < len){
             array.push(binary.charCodeAt(i));
             i++;
         }
         return new Blob([new Uint8Array(array)], {
             type: "image/png"
         });
     };


     const SEND_THUMBNAIL =  (args,data, section)  => {
        if(args.length > 0){
           let file = args.toString().replace(".mp4",".png");
             const canvas = document.createElement("canvas");
             canvas.width = videoElem.current.videoWidth;
             canvas.height = videoElem.current.videoHeight;
             canvas.getContext("2d").drawImage(videoElem.current,0,0,videoElem.current.videoWidth,videoElem.current.videoHeight);
             SEND_TO_S3_THUMBNAIL(file,datatoBlob(canvas.toDataURL()),data,section);
        }
      }



     const SEND_TO_S3_THUMBNAIL = (args,data,dataVideo,section) => {
      
        const   params = {
              ACL: process.env.REACT_APP_READ_RULE,
              Body: data,
              Bucket: process.env.REACT_APP_S3_BUCKET,
              Key:  process.env.REACT_APP_S3_THUMB_SECTION+args.trim()
          };
  

      bucket.putObject(params)
              .on('httpUploadProgress', (e) => {
              })
              .on('httpDone', (e) => {
                    SEND_TO_S3(args,dataVideo,section);
              })
              .send((err) => {
                  if(err) {
                      alert("Snap error occurred");
                      setProgress(0);
                      console.log(err);
                  }
              });  
   }  



    const addextension = (data,stamp,extension) => {
        var  formated = data.substring(0,data.indexOf("."));
        formated = formated+"_"+stamp+""+extension;
        return formated;
    }





    const SEND_TO_S3 = (args,data, section) => {
      
        const   params = {
              ACL: process.env.REACT_APP_READ_RULE,
              Body: data,
              Bucket: process.env.REACT_APP_S3_BUCKET,
              Key: section == 1 ? process.env.REACT_APP_S3_PICTURE_SECTION+args.trim() : process.env.REACT_APP_S3_VIDEO_SECTION+args.toString().replace("png","mp4").trim()
          };
  

      bucket.putObject(params)
              .on('httpUploadProgress', (e) => {
                      setProgress(Math.round((e.loaded / e.total) * 100));
              })
              .on('httpDone',(e)=>{
                  swal.fire({text:"Ads has been submitted ",icon: 'success'});
                  CLOUD(section == 1 ? process.env.REACT_APP_S3_PICTURE_SECTION+args.trim() : process.env.REACT_APP_S3_VIDEO_SECTION+args.toString().replace("png","mp4").trim())
              })
              .send((err) => {
                  if(err) {
                      alert("Snap error occurred");
                      setProgress(0);
                      console.log(err);
                  }
              });  
   }



    const CLOUD = async (url)  => {
        let map = await axios.post(process.env.REACT_APP_CLOUDINARY,{url:process.env.REACT_APP_APP_S3_BASE_MEDIA_URL+url,publicface:process.env.REACT_APP_APP_NAME+props.user.User.userType+props.user.User.businessName+"/"+url.substring(url.indexOf("/")+1)})
            console.log(map.data.message);
    }



    const reset =  (e) => {
        setEditorText1("");
        setEditorText2("");
        setEditorText3("");
        setShareImage("");
        setVideofile("");
        setProgress(0);
        props.sendRequestToModel(e);
    };




    const sendInvite = (area) => {

     
    };


    
    let handelError = function(err){
        console.log("Error: ",err);
    };


    let remoteContainer = document.getElementById("remote-container");

    function addVideoStream(elementId){
        let streamDiv = document.createElement("div");
        streamDiv.id = elementId;
        streamDiv.style.transform = "rotateY(180deg)";
        remoteContainer.appendChild(streamDiv);
    };



    function removeVideoStream(elementId){
            let remoteDiv = document.getElementById(elementId);
            if(remoteDiv) 
                remoteDiv.parentNode.removeChild(remoteDiv);
    }


     let options = {
        appId : process.env.REACT_APP_APP_ID_AGORA,
        channel: "test",
        token: "0064c579a842acd4bacbb3d245b57d27911IAAYqE5uAi93yko9KhGxMdpUEMb1w+nS7kREZAyjm83fyAx+f9gAAAAAEAD5orABlYyTYQEAAQCMjJNh",
      
    }


    const Request = () => {

            let client = AgoraRTC.createClient({
                mode:"rtc",
                codec: "vp8",
            });

        

            client.init(options.appId, function(){
                console.log("client success");
            }, function(err){
                console.log("client init failed ", err);
            });



            client.join(options.token, options.channel, null, (uid) =>{

                let localStream = AgoraRTC.createStream({
                    video: true,
                    audio: true,
                });

                localStream.init(() => {
                    localStream.play('me');
                    client.publish(localStream, handelError);
               }, handelError);
            }, handelError);



            client.on('stream-added', function (evt){
                client.subscribe(evt.stream, handelError);
            });
            

            
            client.on('stream-subscribed', function (evt){
                let stream = evt.stream;
                let streamId = String(stream.getId());
                addVideoStream(streamId);
                stream.play(streamId);
            });


            client.on('stream-removed', function (evt){
                let stream = evt.stream;
                let streamId = String(stream.getId());
                stream.close();
                removeVideoStream(streamId);
            });
        

            client.on('peer-leave', function (evt){
                let stream = evt.stream;
                let streamId = String(stream.getId());
                stream.close();
                removeVideoStream(streamId);
            });

        }; 
    

    return(
        <>

        
        {props.showModel === "open" &&(
            <Container>
                <Content>

                    <Header>
                    <h2>Create a Post</h2>
                    <button  onClick={(event) => reset(event)}>X</button>
                    </Header>

                        <SharedContent>
                                <UserInfo>
                                    {props.user ?  <img src={props.user.photoURL} alt=""/> : <img src="/images/user.svg" alt=""/> }
                                    <span>{props.user ? props.user.displayName : "Name"}</span>
                                </UserInfo>

                                <Editor>
                                <input type="text" placeholder="Item Price"  value={editorText1}  onChange={(e) => setEditorText1(e.target.value)}  autoFocus={true}/>
                                <input type="text" placeholder="Item name"  value={editorText2}  onChange={(e) => setEditorText2(e.target.value)} />
                               
                                <select  onChange={handelOption1}>
                                    {categoryUpload.map(option => (<option key={option}>{option}</option>))}
                                </select>
                                
                                <select  onChange={handelOption2}>
                                    {Category.map(option => (<option key={option}>{option}</option>))}
                                </select>
                                <textarea  placeholder="Pls insert creative  description for your Ads" value={editorText3}  onChange={(e) => setEditorText3(e.target.value)} />
                               
                           
                                    {props.sectionToOpen === "Picture" ?
                                        (
                                        <UploadImage>
                                        <input type="file"   name="image" id="file" style={{display: "none"}}  onChange={handle}  accept="image/png, image/gif, image/jpeg, image/jpg"/>
                                        <p><label  htmlFor="file">{"Choose  image + "}</label></p>
                                        {shareImage && <img src={URL.createObjectURL(shareImage)}/>}
                                        </UploadImage>
                                       ):(
                                        <UploadImage>
                                            <input  type="file"   name="image" id="file-input" style={{display: "none"}}  onChange={handle}  accept="video/mp4,video/x-m4v,video/*"/>
                                            <p><label  htmlFor="file-input">Choose Video + </label></p>
                                            <video 
                                            id="video"
                                            ref={videoElem}
                                            src={videofile && editorText1 && editorText2 && editorText3 && !progress ? URL.createObjectURL(videofile):''}
                                            type="video/mp4"
                                            width="100%"
                                            height="100%"
                                            controls
                                            />
                                        </UploadImage>
                                    )}
                                  
                                    
                                </Editor>  
                                
                            </SharedContent>

                            <ShareCreation>
                                <Attach/>
                            <PostButton  disabled={!editorText1 && !editorText2  ? true : false}  onClick={(e) => PostData(e)}>
                                Post: {progress}%
                            </PostButton>
                        </ShareCreation>

                </Content>
        </Container>
        )}

        {props.showModel === "open" && props.sectionToOpen === "Vidcal"
         &&(
            <Container>
                <Content>
                    <Header>
                    <h2>Video call room</h2>
                    <button  onClick={(event) => reset(event)}>X</button>
                  </Header>

                    <SharedContent>
                        <UserInfo>
                            {props.user ?  <img src={props.user.photoURL} alt=""/> : <img src="/images/user.svg" alt=""/> }
                        <span>{props.user ? props.user.displayName : "Name"}</span>
                        </UserInfo>
                    </SharedContent>


                    <AGORA_SECTION>

                        <div id="me">
                         
                        </div>

                        <div id="remote-container">

                        </div>
                    </AGORA_SECTION>

                <ShareCreation>
                   <Attach>
                       <PostButton  onClick={() => sendInvite()}>
                       Send invite <FontAwesomeIcon  icon={faShare}/>
                       </PostButton>                     
                   </Attach>
                 
                   <PostButton id="join" onClick={() =>  Request()}>
                       Create room
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
color:black;
width:100%;
z-index:999;
background-color: rgba(0,0,0,0.8);







`;



const Content  =  styled.div`
max-width:35%;
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

::-webkit-scrollbar {
display: none;
}
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

padding:5px 24px;

textarea{
width:98%;
min-height:100px;
resize: none;
padding:5px;
margin-bottom:10px;
border: 0.5px solid #e6e6e6;
:focus{
border: 3px solid #ccc;
}
}

input{
width:98%;
height: 35px;
font-size:16px;
margin-bottom: 10px;
padding:5px;
border: 0.5px solid #e6e6e6;
:focus{
border: 3px solid #ccc;
}
}



select{
width:102%;
padding:12px;
margin-bottom: 10px;
border: 0.5px solid #e6e6e6;
}

`;



const AGORA_SECTION = styled.div`

#me{
position: relative;
width: 50%;
margin: 0 auto;

}
#me video{
position: relative !important;
}
#remote-container{
display: flex;
}
#remote-container video{
height: 200px;
position: relative !important;
}

`;





const UploadImage = styled.div`
text-align: center;
line-height: 30px;
img{
width:100%;
max-height: 50%;
margin-top:12px;
}
label{
padding: 10px;
border-radius:4px;
background: #f5f5f5;
box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}
video{
padding-top:10px;
}
`;




const  mapStateToProps = (state)  => {
    return {
        user: state.userState.user,
    };
};

const mapDistpachToProps = (dispatch) => ({
    PostData: (payload) => dispatch(postArticleAPI(payload)),
});

export default  connect(mapStateToProps,mapDistpachToProps)(Postmodel);

