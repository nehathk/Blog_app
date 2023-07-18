
import { useState,useEffect ,useContext} from 'react';
import {Box,styled,FormControl,InputBase,Button,TextareaAutosize} from '@mui/material';
import {AddCircle as Add} from '@mui/icons-material';
import {useLocation,useNavigate} from 'react-router-dom';
import {DataContext} from '../../context/DataProvider'
import {API} from '../../service/api'

const Image= styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
    borderRadius: '8px',

    

})
const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    [theme.breakpoints.down('md')]: {
      margin: 0,
      padding: '20px 10px',
    },
  }));
const StyledFormControl= styled(FormControl)`
margin-top: 10px;
display: flex;
flex-direction: row;
align-items: center;


`
const InputTextField= styled(InputBase)`
flex: 1;
margin: 0 30px;
font-size: 25px;
height:5em;

`
const StyledButton= styled(Button)`
  background:#000000;
  color:#FFFFFF;

`;
const initialPost={
    title:'',
    description:'',
    picture:'',
    username:'',
    categories:'',
    createdDate: new Date()




}
const Textarea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 50px;
  font-size: 18px;
  border: none;
  resize: none;
  padding: 10px;
  border-radius: 4px;
  background-color: #f5f5f5;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  outline: none;
  &:focus-visible {
    border-color: #3366ff;
  }


`

const CreatePost=()=>{

    const[post,setPost]= useState(initialPost);
    const [file,setFile]=useState('');
    const {account}= useContext(DataContext);
    const location= useLocation();
    const navigate= useNavigate();
    const url= post.picture ? post.picture:`https://www.akums.in/wp-content/uploads/2023/06/Blog-Banner.webp`

    useEffect(()=>{
        const getImage=async()=>{
           if(file){
            const data= new FormData();
            data.append("name",file.name);
            data.append("file",file)
            //api call
           const response= await API.uploadFile(data);

            post.picture= response.data;
           }
        }
        getImage();
        post.categories= location.search?.split('=')[1] || 'All';
        post.username= account.username;
        



    },[file])
    const handleChange=(e)=>{
        setPost({...post,[e.target.name]:e.target.value})
    }
    const savePost=async()=>{
      let response= await API.createPost(post);
      if(response.isSuccess){
        navigate('/');
      }
    }
    return (
        <Container>
            <Image src={url} alt="banner"/>
            <StyledFormControl>
                <label htmlFor='fileInput'>
                   <Add fontSize="large" color="action"/>
                </label>
                <input type="file" id="fileInput" style={{display:'none'}}
                onChange={(e)=>setFile(e.target.files[0])}
                />
                <InputTextField placeholder='Title' onChange={(e)=> handleChange(e)} name="title"/>
                <StyledButton variant="contained" onClick={()=> savePost()}>Publish</StyledButton>
            </StyledFormControl>

              <Textarea

              minRows={5}
              placeholder='We Would Love to hear what you say!'
              onChange={(e)=> handleChange(e)}
              name='description'

              
              />
        </Container>
    )

}
export default CreatePost;
