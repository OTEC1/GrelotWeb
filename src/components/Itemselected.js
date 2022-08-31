import React, { useState } from 'react'
import  styled from 'styled-components'
import { connect } from 'react-redux';
import { useEffect} from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Item from './Item'
require('dotenv').config()

const Itemselected = (props) => {

const [datas, setDatas] = useState([]);
const  {e,option} = useParams();


useEffect(() => {
    axios.post(process.env.REACT_APP_ACCESS_FIREBASE_ENDPOINT1,{data:e})
    .then(response => {
        setDatas(response.data);
    }).catch(err => {
       console.log(err);
})

   
},[])

    return(
       <Item  dataPass={datas} id={e} model={option} />
    )
}



const mapStateToProps = (state) => {
     return {
          user: state.userState.user,
     }
}


const mapDispatchStatetoProps = (dispatch) => ({

})

export default connect(mapStateToProps,mapDispatchStatetoProps)(Itemselected)