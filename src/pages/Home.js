import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import GameCard from '../components/GameCard';
import './Home.css'

function Home(){
    const navigate = useNavigate()
    const handleClick = (e) => {
        e.preventDefault()
        onAuthStateChanged(auth, (currentUser)=> {
            if(currentUser) navigate('/createGame')
            if(!currentUser) navigate('/auth')
        })
    }
      
    return (
        <div>
            <div className='header-home'>
                <div className='sub-head'>
                    <img className='logo' src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/FunLogo.png' alt='Sponge House Learning Logo'/>
                    <button onClick={handleClick} className='newActBtn hover:bg-sky-500 active:bg-violet-700 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 '> + Activity </button>
                </div>
                <div className='slogan-home '>
                    <h1 className='p1'>Let's Make</h1>
                    <h1 className='p2'>Learning Fun!</h1>
                    <img className='starsHome invisible md:visible ' src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/StarsHome.png' alt='stars'/>
                </div>
            </div>
            <hr className='lineHome'></hr>
            <div className='games-displayed'>
                <GameCard className=''/>
            </div>
        </div>
    )
};
export default Home;