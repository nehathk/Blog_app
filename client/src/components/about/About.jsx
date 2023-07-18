import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const Banner = styled(Box)`
    background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;

const About = () => {

    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Typography variant="h4">Blogly- Now Blogging Made Easy!</Typography>
                <Text variant="h5">• A user friendly Platform where you can pour out all sorts of emotions in a user- friendly website designed and implemented
                using MERN stack.
<br />
• Ensures Your Privacy through user Login and Signup
<br />
• Several additional features including  view, create, delete and comment on others blog ans  JWT
authentication  has been used for login.
<br/>
Github : 
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/nehathk" color="inherit" target="_blank"><GitHub /></Link>
                    </Box>
                </Text>
                <Text variant="h5">
                    Reach out to me on 
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.linkedin.com/in/neha-thakur-900bb924b/" color="inherit" target="_blank">
                            <LinkedInIcon />
                        </Link>
                    </Box>  
                          or send me an Email on nehathk03@gmail.com
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;