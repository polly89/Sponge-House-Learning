import Apples from "./Apples"
import { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuid } from 'uuid';

function PickApples({ answer }){
    const [board, setBoard] = useState([]);
    const [apple, setApples] = useState([]);

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
        })}</div>
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
        </>
    )
};
export default PickApples;