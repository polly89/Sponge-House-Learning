import Apples from "./Apples"
import { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';

function PickApples({ answer }){
    const [board, setBoard] = useState([]);
    const [options, setOptions] = useState([]);

    const [{isOver}, drop] = useDrop(()=> ({
        accept:'apple',
        drop: (item)=> addToPail(item.id),
        collect: (monitor)=> ({
            isOver: !!monitor.isOver(),
        }),
    }), [],);
    const option = answer.split('')
    console.log(option)
    
    useEffect(()=> {
        setOptions(options)
    }, [])


    const addToPail = (id)=> {
        const stackedApples= apples.filter((apple)=> id === apple.id);
        setBoard((board)=> [...board, stackedApples[0]]);

    }
    const apples = [
        {
            id: 1,
            text: option[9]
        },
        {
            id: 2,
            text: option[1]
        },
        {
            id: 3,
            text: option[7]
        },
        {
            id: 4,
            text: option[3]
        },
        {
            id: 5,
            text: option[5]
        },
        {
            id: 6,
            text: option[4]
        },
        {
            id: 7,
            text: option[6]
        },
        {
            id: 8,
            text: option[2]
        },
        {
            id: 9,
            text: option[8]
        },
        {
            id: 10,
            text: option[0]
        }
    ]
    return (
        <>
        <div 
        className='flex gap-x-4  ml-60 z-10 absolute rotate-2 '
        >
        {apples.map((apple)=>{
        return <Apples  
                id={apple.id} 
                key={new Date().getTime() + Math.floor(Math.random() * 1000)}
                options={apple.text}
                />
        })}</div>
        <div 
        className='flex w-3/12 h-1/5 absolute mt-48 ml-80 rotate-2 justify-center space-y-6' 
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