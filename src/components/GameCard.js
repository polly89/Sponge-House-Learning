import {useState, useEffect} from 'react';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore'
import './GameCard.css'

function GameCard(){
    const [gameList, setGameList] = useState([]);
    const [cover, setCover] = useState('')
    const gamesCollectionRef = collection(db, 'games')

    // Show a random image as a background rather than having the user upload a cover from the list. 
    const renderCoverImage = () => {
            const coverOptions = [ 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+1.png', 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+2.png', 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+3.png', 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+4.png', 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+5.png', 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+6.png', 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+7.png', 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+8.png']
            let loopCover = ''
            for (let i = 0; i < coverOptions.length; i++) {
                loopCover += `<div ${coverOptions[i]}/>`
            }
            setCover(loopCover)
    }
            
    
    
    const getGameList= async () => {
        // READ THE DATA
        //SET THE GAME LIST
        try {
            const data = await getDocs(gamesCollectionRef);
            const filteredData = data.docs.map((doc)=>
            // ADD IF STATEMENT TO ONLY SHOW IF APPROVED = TRUE
            ({
                ...doc.data(),
                id: doc.id,
            }));
            setGameList(filteredData)
            console.log(filteredData)
        } catch (err) {
            console.error(err)
        }
      };
    useEffect(()=> {
      getGameList();
    }, [])
        
    // FIX STYLING
    return (
            <div className='cont'>
                {gameList.map((game)=> 
                // <div onLoad={renderCoverImage} key={game.id} style={{backgroundImage: `url(${cover})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className='game-card game-card-hover'>
                 <div key={game.id} style={{backgroundImage: `url(${game.Cover})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className='game-card game-card-hover'> 
                    <h1 className='game-title'>{game.Title}</h1> 
                </div>)}
            </div>
    )
};
export default GameCard;
