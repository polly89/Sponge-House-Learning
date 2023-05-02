import Apples from "./Apples"
import { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuid } from 'uuid';
import Confetti from 'react-confetti'
import Modal from "./Modal";

function PickApples({ answer }){
    const [board, setBoard] = useState([]);
    const [apple, setApples] = useState([]);
    const [showModal, setShowModal]= useState(false);

    const [{isOver}, drop] = useDrop(()=> ({
        accept:'apple',
        drop: (item)=> addToPail(item.id),
        collect: (monitor)=> ({
            isOver: !!monitor.isOver(),
        }),
    }), 
    [apple]
    );
    
    useEffect(()=> {
        const options = answer.split('')
        const apple = options
            .map((o)=> ({ id: uuid(), text: o }))
            .sort(() => 0.5 - Math.random());
        setApples(apple);
    }, [answer]);

    const addToPail = (id)=> {
        console.log({ apple, id });
        const stackedApples= apple.find((apple)=> id === apple.id);
        setBoard((board)=> [...board, stackedApples]);

    };
    // remove apple upon drop
    for( let i = 0; i < apple.length; i++){
        for( let j = 0; j < board.length; j++ ) {
            if (apple[i] === board[j]) {
                apple.splice(i, 1)
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
    return (
        <>
        <div 
        className='flex gap-x-4 mt-96 ml-60 z-10 absolute rotate-2 '
        >
        {apple.map((apple)=>{
        return <Apples  
                id={apple.id} 
                key={new Date().getTime() + Math.floor(Math.random() * 1000)}
                options={apple.text}
                />
        })}
        {apple.length === 0? (<button onClick={handleClick} className="publish hover:bg-sky-500 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300">Submit</button>) : ('')}
        </div>
        <div 
        className='flex flex-wrap w-3/12 h-1/5 absolute mt-48 ml-80 rotate-2 justify-center space-y-6' 
        ref={drop}
        >
        {board.map((apple)=> {
            return<Apples 
                    key={apple.id} 
                    id={apple.id} 
                    options={apple.text}/>
        })}
        </div>
        {showModal && modal }
        </>
    )
};
export default PickApples;