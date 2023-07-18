import {Box,Typography,styled} from '@mui/material'
const Image= styled(Box)`
background: url("https://images.pexels.com/photos/17136614/pexels-photo-17136614/free-photo-of-computer-on-a-desk-in-a-bedroom.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load") center/45% repeat-x #000;
width: 100%;
height: 50vh;
display: flex;
align-items:center;
justify-content:center;
flex-direction: column;

`
const Heading= styled(Typography)`
  font-size:70px;
  line-height:1;
  color: #F5F5F5;

`
const Subheading= styled(Typography)`
 font-size:20px;
 color: #F5F5F5;
`
const Banner=()=>{
    return(
        <Image>
            <Heading>BLOGLY</Heading>
            <Subheading>Now Blogging Made Easy!</Subheading>
        </Image>
    )

}
export default Banner;