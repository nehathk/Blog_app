import {Box, Typography,styled} from '@mui/material'
import {addElipsis} from '../../../utils/common-utils'
const Container= styled(Box)`

border: 1px solid #A8A196;
border-radius: 10px;
margin:10px;
height: 350px;
display:flex;
flex-direction:column;
align-items:center;
 & > p{
    padding:0 5px 5px 5px;
}
`
const Image= styled('img')({
    width:'100%',
    borderRadius:'10px 10px 0 0',
    objectFit:'cover',
    height: 150
})
const Text= styled(Typography)`
   font-size:12px;
`
const Heading= styled(Typography)`
font-size:18px;
font-weight:600;


`
const Details= styled(Typography)`
font-size:14px;
word-break:break-word;

`
const Post=({post})=>{
    const url= post.picture ? post.picture:`https://images.unsplash.com/photo-1646330024721-d726c353e519?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80`

    return (
        <Container>
            <Image src={url} alt="blog"/>
            <Text>{post.categories}</Text>
            <Heading>{addElipsis(post.title,20)}</Heading>
            <Typography>Posted By:{post.username}</Typography>
            <Details>{addElipsis(post.description,100)}</Details>

        </Container>
    )
}
export default Post;