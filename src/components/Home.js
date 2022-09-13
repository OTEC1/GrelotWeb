import React, { Component }  from 'react';
import styled from "styled-components";
import Leftside from "./Leftside";
import Main from "./Main.js";
import Rightside from "./Rightside";
import { useEffect, useState } from 'react';
import { getPosts, getPosting } from '../actions';
import { connect } from 'react-redux';
import axios from 'axios'
import Loader from 'react-loader-spinner';

const Home  = (props) => {

let L1,L2;
var size;


useEffect(() => {
  props.getPosting()
},[])


return <Container>
                <>
                {props.posts !== undefined ?
                    props.posts.length > 0 ? (              
                        <Layout>
                            <Leftside>
                                { 
                                    size =  props.posts.length/2,
                                    L1 = props.posts.slice(0,size),
                                    L2 = props.posts.slice(size, props.posts.length)
                                }
                            </Leftside>
                            <Main  leftdata={L1}/>
                            <Rightside rightdata={L2}/>
                        </Layout>
                      ) : (<p>
                        <Loader
                            type="Oval"
                            color="#FF5D16"
                            height={100}
                            width={100} 
                        />
                      </p>)  
                      
                    : <h3>Loading... </h3> 
                    }
                </>
        </Container>  
}



const Container =  styled.div`
padding-top: 100px;
max-width: 100%;

h3{
margin-top:50%;
width: 15px;
margin-left:auto;
margin-right:auto;
}

@media(max-width:768px){
padding-top: 100px; 
}
p{
text-align: center;
margin-top: 50px;
margin-top: 25vh;
}
`;








const Layout = styled.div`
display:grid;
grid-template-areas: "leftside main rightside";
grid-template-columns: minmax(0, 6fr) minmax(0,11fr) minmax(0px, 11fr);
column-gap: 25px;
row-gap:25px;
margin: 25px 0;
@media(max-width:768px){
display: flex;
flex-direction: column;
padding: 0 5px;
}
`;


const mapStateToProps =  (state) => {
return {
user: state.userState.user,
posts: state.postState.posts
};


}

const   mapDispatchStatetoProps = (dispatch) => ({
getPosting: ()  => dispatch(getPosting())
})

export default connect(mapStateToProps,mapDispatchStatetoProps)(Home);