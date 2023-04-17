import './Game.css'
import { Link } from 'react-router-dom';

function Game(){
    return (
        <div className='page-styling'>
            <img className='game-circles'src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Group+17.png' alt='stylized shaples, blue and yellow'/>
            <div className='sub-head'>
                <img className='logo' src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/FunLogo.png' alt='Sponge House Learning Logo'/>
                <Link to='/'>
                    <button className='newActBtn'> Home </button>
                </Link>
            </div>
            <div className='game-border'>
                <img className='game-star-1'src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Star+4.png' alt='star'/>
                <div className='game-cont'>
                    {/* <div> {Audio.map((url)=>{
                        return <audio controls src={url} alt='audio prompt'/>
                    })}
                    </div>    */}
                <img className='game-star-2'src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Star+4.png' alt='star'/>
                </div> 
            </div>
            
         </div>
    )
};
export default Game;