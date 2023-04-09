import { Link } from 'react-router-dom';
import './Home.css'

function Home(){
    return (
        <div>
            <div className='header-home'>
                <div className='sub-head'>
                    <img className='logo' src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/FunLogo.png' alt='Sponge House Learning Logo'/>
                    <Link to='/auth'>
                        <button className='newActBtn'> + Activity </button>
                    </Link>  
                </div>
                <div className='slogan-home'>
                    <h1 className='p1'>Let's Make</h1>
                    <h1 className='p2'>Learning Fun!</h1>
                    <img className='starsHome' src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/StarsHome.png' alt='stars'/>
                </div>
            </div>
            <hr className='lineHome'></hr>
        </div>
    )
};
export default Home;