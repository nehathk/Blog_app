import React from "react";
import {useState,useContext} from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import {API} from '../../service/api';
import { DataContext } from "../../context/DataProvider";
import {useNavigate} from 'react-router-dom';
import background from './img/bg1.jpeg';

const Component = styled(Box)`
width: 400px;
display:block;
margin: auto;
box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.6);
background-color:white;
z-index:1;
`;
const Image = styled("img")({
  width: 100,
  margin: "auto",
  display: "flex",
  padding: "50px,0,0",
});
const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button ,& > p{
    margin-top: 20px;
  }
`;
const Loginbutton= styled(Button)`
  text-transform:none;
  background:#000000;
  height:40px;
  color:#FFFFFF;

`;
const Signupbutton= styled(Button)`
text-transform:none;
background:#FFFFFF;
height:40px;
color:#fff
box-shadow:0px 2px 4px 0px rgb(0 0 0/20%);


`
const Typocomponent=styled(Typography)`
 font-size:12px;
`
const Error= styled(Typography)`
font-size:10px;
color:#ff6161;
line-height:0;
margin-top: 10px;
font-weight:600;


`
const StyledBox= styled(Box)`
margin-top:10px;

`
const loginInitialValues={
  name:'',
  password:'',
}
const signupinitialvalues={
  name:'',
  username:'',
  password:''

}



function Login({isUserAuthenticated}) {
  const imgURL =
    "data:image/png;base64,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";
    const[account,toggleAccount]=useState('login');
    const[signupvalue,setsignupvalue]=useState(signupinitialvalues);
    const[error,setError]=useState('');
    const[login,setLogin]= useState(loginInitialValues);
    const {setAccount}= useContext(DataContext)
    const navigate= useNavigate();
    const toggleSignup=()=>{
     account==='login' ? toggleAccount('signup'):toggleAccount('login');

    }
    const oninputChange=(e)=>{
      setsignupvalue({...signupvalue ,[e.target.name]:e.target.value})
    
    
    }
    const signupUser= async()=>{
      let response=  await  API.userSignup(signupvalue);
      if(response.isSuccess){
       setError('');
        setsignupvalue(signupinitialvalues);
        toggleAccount('login');
    
      }
      else{
        setError('Something went wrong!')
    
    
      }   
    }
  const onValueChange=(e)=>{
    setLogin({...login ,[e.target.name]:e.target.value})

  }
  const loginUser = async () => {
    let response=  await  API.userLogin(login);
  if(response.isSuccess){
   setError('');
   sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`)
   sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`)
   setAccount({username:response.data.username,name:response.data.name})
   isUserAuthenticated(true);
   navigate('/');
   

  }
  else{
    setError('Something went wrong!')


  }  
}
 
  return (
    <Box style={{
      backgroundImage: `url(${background})`, width: '100%', height: '790px',marginTop:'-65px', backgroundSize:'cover'
  }}>

    <Component>
      <Box>
        <Image  src={imgURL} alt="Login"></Image>
        {account === 'login' ?
        <Wrapper>
        <TextField id="standard-basic" value={login.username} onChange={(e)=>onValueChange(e)} name="username" label="Enter Username" variant="standard"  />
        <TextField id="standard-basic" value={login.password} onChange={(e)=>onValueChange(e)}  name="password" label="Enter Password" variant="standard" />
        {error && <Error>{error}</Error>}
        <Loginbutton variant="contained" onClick={()=> loginUser()}>Login</Loginbutton>
        <Typocomponent style={{textAlign:'center'}}> OR</Typocomponent>
        {error && <Error>{error}</Error>}
        <Signupbutton onClick={()=>toggleSignup()} variant="outlined">Create an account</Signupbutton>
      </Wrapper>
         :
         <Wrapper>
        <TextField id="standard-basic" label="Enter Name" variant="standard" onChange={(e)=>oninputChange(e)} name='name' />
        <TextField id="standard-basic" label="Enter Username" variant="standard" onChange={(e)=>oninputChange(e)} name='username' />
        <TextField id="standard-basic" label="Enter Password" variant="standard" onChange={(e)=>oninputChange(e)} name='password'/>
        <Signupbutton variant="outlined" onClick={()=>signupUser()} >Signup</Signupbutton>
        <Typocomponent style={{textAlign:'center'}}> OR</Typocomponent>
        <Loginbutton onClick={()=>toggleSignup()} variant="contained">Already have an account?</Loginbutton>
      </Wrapper>

         
        }
        
      </Box>
    </Component>
    </Box>
  );
}

export default Login;
