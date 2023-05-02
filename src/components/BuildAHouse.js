import Brick from "./Brick"
import { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuid } from "uuid";
import Confetti from 'react-confetti'
import Modal from "./Modal";


function BuildAHouse({ answer }){
    const [board, setBoard] = useState([]);
    const [brick, setBrick] = useState([]);
    const [showModal, setShowModal]= useState(false);

    const [{isOver}, drop] = useDrop(()=> ({
        accept:'brick',
        drop: (item)=> addBrickToHouse(item.id),
        collect: (monitor)=> ({
            isOver: !!monitor.isOver(),
        }),
    }), 
        [brick]
    );
    
    useEffect(()=> {
        const options = answer.split('')
        const brick = options
            .map((o) => ({ id: uuid(), text: o }))
            .sort(() => 0.5 - Math.random());
        setBrick(brick)
    }, [answer]);

    const addBrickToHouse = (id)=> {
        console.log({ brick, id })
        const stackedBricks = brick.find((brick)=> id === brick.id);
        setBoard((board)=> [...board, stackedBricks]);
    };
        // remove brick upon drop
        for( let i = 0; i < brick.length; i++){
            for( let j = 0; j < board.length; j++ ) {
                if (brick[i] === board[j]) {
                    brick.splice(i, 1)
                }
            }
        }
        const handleClick = () => {
            setShowModal(true)
        }
        const handleClose = () => {
            setShowModal(false)
        }
        const actionBar = <div>
            <button 
            className="publish hover:bg-sky-500 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
            onClick={handleClose}>
            Close
            </button>
            </div>;

        const modal = <Modal onClose={handleClose} actionBar={actionBar}>
                        <Confetti/>
                        <h1 className="text-4xl text-center text-amber-400 mt-44">{answer.toUpperCase()}</h1>
                        <h1 className="text-4xl text-center align-middle -mt-20">Nice work!</h1>                        
                        </Modal>;

// Note: work on grading system ... 
// Temp system sends confetty once all the tiles have been placed,
// but it doesn't check for word order.  
        // const finalBoard = JSON.stringify(board[0].text + board[1].text + board[2].text)
        // console.log('finalBoard:', finalBoard)

        // if(answer === finalBoard){
        //     console.log(finalBoard, 'You did it!')
        // }
    
    return (
        <>
        <div 
        className='flex justify-center gap-4 -mt-48 z-10 absolute rotate-2'
        >
        {brick.map((brick) => { 
        return (
            <Brick 
                url={'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Rectangle+40.png'} 
                id={brick.id} 
                key={new Date().getTime() + Math.floor(Math.random() * 1000)}
                options={brick.text}
                />
            );
        })}
        {brick.length === 0? (<button onClick={handleClick} className="publish hover:bg-sky-500 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300">Submit</button>) : ('')}
        </div>
        <div 
        className='w-80 h-2/6 absolute mt-16 ml-96 rotate-2 justify-center space-y-6' 
        ref={drop}
        >
        {board.map((brick)=> {
            return<Brick 
                    key={brick.id} 
                    url={'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Rectangle+40.png'} 
                    id={brick.id} 
                    options={brick.text}
                    />
        })}
        </div>
        {showModal && modal }
        </>
    )
};
export default BuildAHouse;