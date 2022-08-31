import  db, {auth,provider,signInWithPopup} from '../firebase';
import { collection, getDoc,doc, setDoc, query, getDocs} from 'firebase/firestore/lite';
import { SET_USER, GET_POSTS, CART_ORDER} from './actionType';
import Swal from 'sweetalert2'
import axios  from 'axios'
import {v4 as uuid4} from 'uuid'




export const setUser = (pay) => ({
    type:SET_USER,
    user: pay,
})


export const getPosts = (payload) => ({
    type: GET_POSTS,
    posts: payload,
})




export const cartAdded = (payload) => ({
    type: CART_ORDER,
    cart: payload,
})





export function signInAPIGoogle(usertype){
    return (dispatch) => {
        signInWithPopup(auth,provider)
            .then((paid) => {
                    axios.post(process.env.REACT_APP_SIGN_IN_GOOGLE,{User:{email:paid.user.email,usertype:usertype}})
                       .then((response) => {
                          if(response.status === 200){
                                if(JSON.stringify(response.data.message).length !== 2){
                                    let user = {User:{
                                        businessName:response.data.message.User.businessname,
                                        bussinessAddress:response.data.message.User.businessaddress,
                                        email:response.data.message.User.email,
                                        userType:response.data.message.User.usertype,
                                        whatappNumber:response.data.message.User.whatappnumber,
                                        img_url:response.data.message.User.img_url,
                                        user_id:response.data.message.User.doc_id
                                    }}
                                    dispatch(setUser(user));
                                }else
                                     Swal.fire({title:'info', text:response.data.message.length > 0 ?  response.data.message : "Account Doesn't exist !", icon:'warning'})

                        }

              })               
        })
        .catch((err) => alert(err.message)) 
    };
}










export function signOutApi(){
    return (dispatch) => {
        auth.signOut().then(() => {
            dispatch(setUser(null));
        })
        .catch((err) => {
            console.log(err.message);
        });
    };
}




export function getUserAuth() {
    return (dispatch) => {
        // auth.onAuthStateChanged(async (use) =>{
        //     if(use)
        //         dispatch(setUser(use));
            
        // });
    };
}


export function routernewuser(payload){
    payload.User.password = document.getElementById('confirmpassword').value;
        axios.post(process.env.REACT_APP_ADD_USER,payload)
            .then(res => {
                    console.log(res.data.message);

                    if(res.data.message === "Account created"){
                        Swal.fire({title:'info',text:res.data.message, icon:'info'});
                            window.location.assign("/userlogin");
                    }else
                        Swal.fire({title:res.data.message.code.toString().substring(res.data.message.code.toString().indexOf("/")+1), text:res.data.message.message, icon:'info'});

              }).catch( err => {
                console.log(err)
        })
}









export function  addtocart(cart){
    if(cart)
        return (dispatch) => {
            dispatch(cartAdded(cart));
        }
    else
        return (dispatch) => {
            dispatch(cartAdded(null));
        }
}




export function  postArticleAPI(payload){
    let id = uuid4()+Date.now();
     return async (dispatch) => {
        const ref = collection(db,process.env.REACT_APP_ACCESS_FIREBASE_TABLE1+"/"+payload.user.User.userType)
           await setDoc(doc(ref, id),
                    {User:{
                        businessName: payload.user.User.businessName,
                        bussinessAddress: payload.user.User.bussinessAddress,
                        email: payload.user.User.email,
                        userType: payload.user.User.userType,
                        whatappNumber: payload.user.User.whatappNumber,
                        img_url: payload.user.User.img_url,
                        user_id:payload.user.User.user_id
                    },
                    UserPost:{
                        doc_id: id,    
                        video: payload.video,
                        image: payload.image,
                        price: payload.price,
                        title:payload.title,
                        description: payload.description,
                        targeted_audience: payload.productgender,
                        category: payload.productaudience,
                        exif:0,
                        productid: payload.productID,
                        timestamp: payload.timestamp,
                    },
            })     
         };
}




export function getPosting(user_email){
    return async (dispatch) => {
        let  payload = []
           let list = ['Fabric Dealer','Fashion Designer'];
            for(let n = 0; n < list.length; n++)
                   payload.push(...await LoadPage(list[n]))
              dispatch(getPosts(payload)); 
            }
}   
    




async function LoadPage(usertype) {
    let payload = [];
      const ref = collection(db,process.env.REACT_APP_ACCESS_FIREBASE_TABLE1+"/"+usertype);
        const q = query(ref);
            const wait = await getDocs(q);
                wait.forEach((docs) => {
                    console.log("run");
                        payload.push(docs.data());
                });
        return payload;
}


export function getSinglePostAPI(id){
    return(dispatch) => {
        let payload;
        // database.collection(process.env.REACT_APP_ACCESS_FIREBASE_TABLE1)
        //      .where("UserPost.productid",id)
        //         .onSnapshot((snapshot) => {
        //           payload = snapshot.docs.map((doc) =>  doc.data());
        //           dispatch(getPosts(payload))
        //         })
    }
}



