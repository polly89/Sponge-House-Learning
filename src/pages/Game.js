import './Game.css'
import { Link, useParams } from 'react-router-dom';
import {useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FeedThePig from '../components/FeedThePig';
import BuildAHouse from '../components/BuildAHouse';
import PickApples from '../components/PickApples'
import Skeleton from '../components/Skeleton';


function Game(){
    const { id } = useParams()
    const gameId = id.replace(':', '')
    const [game, setGame] = useState([]); 
    const [backdrop, setBackdrop] = useState('')
    const [audio, setAudio] = useState('')
    const [answer, setAnswer] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const gameRef = doc(db, 'games', `${gameId}`)
    console.log(gameId)
    
    useEffect(()=> {
        const getGame = async () => {
            setIsLoading(true);
        try {
            const docSnap = await getDoc(gameRef);
            setGame(docSnap.data());
            console.log('Game data:', docSnap.data());
            setBackdrop(docSnap.data().Backdrop);
            setAudio(docSnap.data().Audio);
            setAnswer(docSnap.data().Answers);
            setIsLoading(false);
        } catch(err){
            console.log(err)
        }
        
    };
   getGame();
    }, [])
    
    return (
        <DndProvider backend={HTML5Backend}>
        {isLoading ? (
            <Skeleton times={4} className='h-64 w-full'/>
        ) : (
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
                <div  key={gameId} >                        
                        <img className='game-cont' src={backdrop} alt='backdrop'/>
                        <img className='game-star-2'src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Star+4.png' alt='star'/> 
                        <div className='mt-40 ml-52'>
                            {backdrop === 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/pick-apples.png' ? (< PickApples answer={answer}/>) 
                            : backdrop === 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/build-a-house-3+(1).png' ? (<BuildAHouse answer={answer}/>)
                            : (<FeedThePig answer={answer}/>)}
                        </div>
                        <div onLoad={(e) => (audio.play())} className='audio-element'>
                            <audio controls src={audio} className='absolute z-10 mt-96 ml-28 rotate-2 rounded-full hover:bg-sky-200 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300'/>
                        </div>
                         
                </div> 
            </div>
         </div> )}
         </DndProvider>
    )
};
export default Game;