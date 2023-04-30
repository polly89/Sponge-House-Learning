import {useState, useEffect} from 'react';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore'
import { useNavigate} from 'react-router-dom';


function GameCard(){
    const navigate = useNavigate()
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
        
    return (
            <div className='flex grid gap-10 grid-cols-6' >
                {gameList.map((game)=> 
                 <div onClick={()=>navigate(`/game/:${game.id}`)} key={game.id} style={{backgroundImage: `url(${game.Cover})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className='game-card hover:bg-sky-200 rounded-md active:bg-violet-400 focus:outline-none focus:ring focus:ring-violet-300'> 
                    <h1 className='py-16 text-center text-2xl align-middle text-slate-50 underline decoration-wavy decoration-4 decoration-indigo-500/80 underline-offset-4'>{game.Title}</h1> 
                </div>)}
            </div>
    )
};
export default GameCard;
