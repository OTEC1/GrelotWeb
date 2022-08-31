import React, { Component ,useRef}  from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCircle, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState} from 'react';
import {connect} from 'react-redux'
import style from '../signincss/style.css'
import Player  from './Player'
import swal from 'sweetalert2'
import {useHistory}  from 'react-router'
import { ArtCard,MiddleMan,HorizontalView,Postusersection,Favorite,LastMan,VerticalView} from '../signincss/Styles';
import { RiPlayCircleLine, RiPlayLine, RiArrowRightCircleLine, RiArrowLeftCircleLine} from 'react-icons/ri';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';


const Main = (props) =>{


    let SIZE = props.leftdata.length/2;
    const [showModel, setShowModel] = useState("close");
    const [sectionToOpen, setSectionToOpen] = useState("none");
    const [option, setOption] = useState('');
    const [doc_id, setdoc_id] = useState('');
    const imageholder = useRef();
    const videoholder  = useRef();
    const history = useHistory();


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

                };
        }
   

        const  itemselected =  (e,model)  => {
            history.push('/itemselected/'+e+"/"+model);
        } 


      

  
    

    
   
    return (<Container>
        <ArtCard>
           <MiddleMan>
               <HorizontalView>
                    <Slider
                      autoplay={1}
                      previousButton={<RiArrowLeftCircleLine  color="red"/>} 
                      nextButton={<RiArrowRightCircleLine color="red"/>}>
                       {props.leftdata.slice(0,SIZE).map((e,index) =>     
                        e.UserPost.image ?
                           <div>   
                                    <div  id="post_top_section">   
                                        <Postusersection key={index}>
                                            <img  src={e.User.image}/>
                                            <div  id="DN">{e.UserPost.title}</div>
                                            <div  id="PR">N{e.UserPost.price}</div>
                                        </Postusersection>
                                    </div>

                                    <div  id="post_bottom_section">
                                            <Favorite onClick={() => itemselected(e.UserPost.doc_id,"P")}>
                                            <FontAwesomeIcon icon={faCartPlus} id="heart"/>
                                            </Favorite>
                                    </div>

                                    <img onClick={() => itemselected(e.UserPost.doc_id,"P")}
                                        key={index} 
                                        src={process.env.REACT_APP_APP_S3_IMAGE_BUCKET+e.UserPost.image}
                                        ref={imageholder} />
                            </div>
                             :
                           <div onClick={(event) => {sendRequestToModel(event); setSectionToOpen(e.UserPost.video ? e.UserPost.video : '');  setdoc_id(e.UserPost.doc_id);  setOption("V"); }}>
                             

                               <div  id="post_top_section">   
                                    <Postusersection key={index}>
                                        <img  src={e.User.image}/>
                                        <div  id="DN">{e.UserPost.title}</div>
                                        <div  id="PR">N{e.UserPost.price}</div>
                                    </Postusersection>
                                </div>

                            

                                <div  id="post_bottom_section">
                                        <Favorite onClick={() => itemselected(e.UserPost.doc_id,"V")}>
                                        <FontAwesomeIcon icon={faCartPlus} id="heart"/>
                                        </Favorite>
                                </div>

                                  
                             <RiPlayCircleLine
                                    id="play"
                                    size="35"
                                    color="#ffffff"
                                    />
   
                                <img
                                    id="post_img"
                                    ref={videoholder}
                                    src={process.env.REACT_APP_APP_S3_THUMB_NAIL_BUCKET+e.UserPost.video.toString().replace("mp4","png")}
                                    onError={(e)=>{e.target.onerror = null; e.target.src="./images/error.png"}}
                                />

                          </div>
                           )} 
                    
                     </Slider>

               </HorizontalView>
             
           </MiddleMan>
          </ArtCard>



        
         <ArtCard>
           <LastMan>
           {props.leftdata.slice(SIZE,props.leftdata.length).map((m,index) => 
               <VerticalView>
                       <div  id="post_top_section">   
                            <Postusersection key={index}>
                                <img  src={m.User.image}/>
                                <div  id="DN">{m.UserPost.title}</div>
                                <div  id="PR">N{m.UserPost.price}</div>
                            </Postusersection>
                        </div>

                       

                        <div  id="post_bottom_section">
                                <Favorite onClick={() => itemselected(m.UserPost.doc_id,"P")}>
                                <FontAwesomeIcon icon={faCartPlus} id="heart"/>
                                </Favorite>
                         </div>

                       

                       {(
                        m.UserPost.image ?
                        <img id="post_img" onClick={() => itemselected(m.UserPost.doc_id,"P")} 
                          key={index}  src={process.env.REACT_APP_APP_S3_IMAGE_BUCKET+m.UserPost.image}/>
                          :
                          <div className='react-player-vertical'
                               onClick={(event) => {sendRequestToModel(event); setSectionToOpen(m.UserPost.video ? m.UserPost.video : ''); setdoc_id(m.UserPost.doc_id);  setOption("V");}} >

                             <RiPlayCircleLine
                                    id="play"
                                    size="35"
                                    color="#ffffff"
                                    />

                                <img
                                    id="post_img"
                                    src={process.env.REACT_APP_APP_S3_THUMB_NAIL_BUCKET+m.UserPost.video.toString().replace("mp4","png")}
                                    onError={(e)=>{e.target.onerror = null; e.target.src="./images/error.png"}}
                                />
                          </div>
                        )}
                </VerticalView>
                   )}
           </LastMan>
        </ArtCard>

        
        <Player  showModel={showModel} sectionToOpen={sectionToOpen}   sendRequestToModel={sendRequestToModel}  doc_id={doc_id}  option={option}/>
       </Container>
    )




  
    
}

const Container = styled.div`
    grid-area: main;
`;


const  mapStateToProps = (state)  => {
    return {
        user: state.userState.user,
    };
};

const mapDispatchStatetoProps = (disptach) => ({
   
})

export default connect(mapStateToProps,mapDispatchStatetoProps)(Main);