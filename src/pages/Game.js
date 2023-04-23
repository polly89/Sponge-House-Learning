import './Game.css'
import { Link, useParams } from 'react-router-dom';
import {useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore'

function Game(){
    const { id } = useParams()
    const gameId = id.replace(':', '')
    const [game, setGame] = useState([]); 

    const gameRef = doc(db, 'games', `${gameId}`)
    console.log({id})
    console.log(gameId)
    
    useEffect(()=> {
        const getGame = async () => {
        try {
            const docSnap = await getDoc(gameRef);
            setGame(docSnap.data())
            console.log('Game data:', docSnap.data())
        } catch(err){
            console.log(err)
        }
        
    };
   getGame();
    }, [])

    return (
        <div className='page-styling'>
            <img className='game-circles'src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Group+17.png' alt='stylized shaples, blue and yellow'/>
            <div className='sub-head'>
            <Link to='/'>
                    <img className='logo' src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/FunLogo.png' alt='Sponge House Learning Logo'style={{maxHeight: '55px', marginTop: '.5vh'}}/>
                </Link>
                <Link to='/'>
                    <button className='newActBtn hover:bg-sky-500 active:bg-violet-700 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 '> Home </button>
                </Link>
            </div>
            <div className='game-border'>
                <img className='game-star-1'src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Star+4.png' alt='star'/>
                <div className='game-cont' key={gameId} style={{backgroundImage: `url(${game.Backdrop})`,backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                    <div  ></div>
                <img className='game-star-2'src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Star+4.png' alt='star'/>
                </div> 
            </div>
            
         </div>
    )
};
export default Game;