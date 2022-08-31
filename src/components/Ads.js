import React, { Component }  from 'react';
import styled from "styled-components";


const Ads = (props) => {
    return   <Section>
    <h5>
        <a>
            Ad Space Make a Bold  Statement
        </a>
    </h5>
</Section>
}

const Section = styled.section`
position: fixed;
margin-top: 50px;
min-height: 50px;
align-items: center;
height: 90px;
width:100%;
text-align:center;
z-index: 100;
left: 0;
h5{
font-weight: 700;
padding: 10px;

}

@media(max-width: 768px){
flex-direction: column;
padding: 0 5px;
top:40px;
}
`;

export default Ads;