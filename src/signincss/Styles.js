import styled from "styled-components";
export const ArtCard = styled.div`
text-align:center;
overflow:hidden;
margin-bottom:22px;
transition: box-shadow 83ms;
display: flex;
flex-wrap: wrap;
`;


export const MiddleMan = styled.div`
position:relative;
flex: 1 1 100px; 
height: 30vh;
width: 500px;
overflow-y: scroll;
overflow-x: hidden;
padding-bottom: 10vh !important;
::-webkit-scrollbar {
display: none;
}

`;




export const LastMan = styled.div`
position:relative;
flex: 1 1 100px; 
height: 40vh;
width: 500px;
overflow: auto;
white-space: nowrap;
margin-top:5px;

::-webkit-scrollbar {
display: none;
}

@media(max-width:768px){
margin-top:25px;
}


`;


export const HorizontalView = styled.div`
width: 100%;
height: auto;
border-radius:10px;
margin:auto;
margin-top:10px;   
font-size: 10pt;
position: relative;


#post_top_section{
width: 100%;
position: absolute;
top:0px;
left: 0px;
z-index:99;
border-radius:10px;
font-family: "Poppins", sans-serif;
font-weight:900;
}

#post_bottom_section{
width: 100%;
bottom:0px;
position: absolute;
left: 0px;
z-index:99;
}

img{
width: 100%;
height: 250px;
object-fit: cover;
border-radius:10px;
}



#play{
position: absolute;
margin-top:20%;
left: 45%;
z-index: 9999;
}



@media(max-width: 768px){
scroll-behavior: smooth;
#post_bottom_section{
bottom: 0;
margin-bottom: 0px;

}

#play{
position: absolute;
margin-top:25%;
left: 45%;
z-index: 9999;
}
} 

`;


export const VerticalView = styled.div`
width: 40%;
height: 39vh;
border-radius:10px;
margin-right:30px;
display: inline-block;
font-size: 10pt;
position: relative;







#post_top_section{
width: 100%;
position: absolute;
top:0px;
left: 0px;
z-index:99;
border-radius: 5px 5px 0px 0px;
}

#post_bottom_section{
width: 100%;
bottom:0px;
position: absolute;
left: 0px;
z-index:99;
}

#play{
position: absolute;
margin-top:50%;
left: 45%;
z-index: 9999;
}


#post_img{
width: 100%;
height:250px;
position: relative;
border-radius:10px;
object-fit: cover;
}


@media(max-width: 768px){
width:60%;

#post_bottom_section{
bottom: 0;
margin-bottom: 0px;

}

#play{
position: absolute;
margin-top:40%;
}

} 
`;


export const Favorite = styled.div`
margin:15px;
height: 26px;
width:26px;
background-color: #fff;
border-radius: 50%;
color:#FF5D16;
float: right;



#heart{
margin-top:7px;
}

`;


export const Postusersection = styled.div`
height: 26px;
width:26px;
background-color: #fff;
border-radius: 50%;
margin-left: 10px;
margin-top:3px;
font-size:12pt;
font-family: "Poppins", sans-serif;
font-weight:900;


#DN{
position:absolute;
top:0px;
margin-left:32px;
color:#FF5D16;
}

#PR{
margin-left:5px;
color:#FF5D16;
}


img{
height: 20px;
width: 20px;
margin-top:3px;
border-radius: 50%;
}

div{
margin-top:5px;
}

`;
