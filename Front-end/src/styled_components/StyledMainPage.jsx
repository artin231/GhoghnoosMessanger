import { styled } from "styled-components";




export let RightUpDiv = styled.div`
width:100;
hieght:20%;
display:flex;
justify-content:space-between;
padding-bottom: 3%;
padding-left:5%;
padding-right:5%;
padding-top:3%;
align-items:center;
border-bottom:2px solid #6b059b;
`
export let RightLogoDiv = styled.div
`
display:flex;
flex-direction:column;
gap:2%;
height:100%;
align-items:center;
`
export let RightLogoImg = styled.img
`
width:150px;
border-radius:100%;
`

export let RightMainPart = styled.div`
width:30%;
height:100%;
border-radius:10px;
background-color: #0d0d1f5b ;
backdrop-filter:blur(100px);
border:2px solid #6b059b;
transition:all 600ms ease;
`

export let ChatList = styled.div`
height:85%;
width:100%;
display:flex;
align-items:center;
overflow:auto;
flex-direction:column;
padding-top:5%;
gap:20px;
`

export let ItemChatList = styled.div`
height:100px;
width:95%;
background-color: #1717435b;
border:2px solid #831C91;
border-radius:20px;
flex-shrink:0;
display:flex;
align-items:center;
justify-content:flex-end;
padding: 0 4%;
gap:40px;
`

export let ItemChatPic = styled.img`
width:70px;
border-radius:100%;
`

export let ItemChatTextDiv = styled.div`
width:70%;
display:flex;
flex-direction:column;
gap:2%;
align-items:flex-end;
text-align:right;

`

export let ItemChatTextTitle = styled.h1`
font-size:30px;
color:white;
`
export let ItemChatTextP = styled.p`
font-size:20px;
color:lightgray;
direction:rtl;
text-overflow:ellipsis;
overflow:hidden;
white-space:nowrap;
width:100%;
`

export let CenterMainPart = styled.div`
width:70%;
height:100%;
border-radius:10px;
background-size: cover;
background-position: center;
background-image: url(../../public/bg1.png);
border:2px solid #6b059b;
transition:all 600ms ease;
position:relative;
`

export let CenterInputDiv = styled.div`
width:95%;
position:absolute;
bottom:1.2%;
right:2.5%;
`

export let CenterInputItem = styled.textarea`
width:100%;
height:65px;
outline:none;
border-radius:10px;
background-color: #050505;
border:2.5px solid #202020;
font-size:20px;
direction:rtl;
padding-right:6%;
resize: none;
padding-top: 1.15%;
`

export let CenterChatMessageList = styled.div`
height: 89%;
width:100%;
padding:2%;
display:flex;
gap:120px;
overflow:auto;
position:relative;
flex-direction:column;
`
export let CenterChatMessageItem = styled.div`
width:100%;
`

export let CenterChatMessageItemSelf = styled.div`
min-width:280px;
max-width: 60%;
min-height:75px;
border-radius:20px;
border-bottom-right-radius:0;
background-color: #7507a8;
position:absolute;
right:5%;
margin-top:10px;
display:flex;
flex-direction:column;
padding:0.8%;

`;

export let CenterChatMessageItemUser = styled.div`
min-width:280px;
max-width:60%;
min-height:75px;
border-radius:20px;
border-bottom-left-radius:0;
background-color: #373737;
position:absolute;
left:5%;
margin-top:10px;
margin-bottom: 5px;
display:flex;
flex-direction:column;
display:flex;
flex-direction:column;
gap:20px;
padding:0.8%;
white-space: normal;   
overflow-wrap: break-word;
padding-left:3%;
direction:rtl;
margin-bottom : 40px;
word-break: break-all;
display:flex;
flex-direction:column;
`;

export let CenterChatMessageItemSelfTextMain = styled.p`
align-self:flex-end;
font-size:20px;
`

export let CenterChatMessageItemSelfTextBelow = styled.p`
font-size:15px;
color:lightgray;
position:absolute;
bottom:15%;
left:5%;
`

export let CenterChatMessageItemUserTextMain = styled.p`
align-self:flex-end;
font-size:20px;
margin-bottom:30px;
`
export let CenterChatMessageItemUserTextBelow = styled.p`
font-size:15px;
color:lightgray;
position:absolute;
bottom:15%;
left:5%;
`

