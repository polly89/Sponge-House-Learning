import {useState, useEffect} from 'react';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore'
import './GameCard.css'

function GameCard(){
    const [gameList, setGameList] = useState([]);
    const gamesCollectionRef = collection(db, 'games')
    
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
                <div key={game.id} style={{backgroundImage: `url(${game.cover.value})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className='game-card game-card-hover'>
                    <h1 className='game-title'>{game.Title}</h1> 
                </div>)}
            </div>
    )
};
export default GameCard;
