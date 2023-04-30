import Corn from "./Corn"
import { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';

function FeedThePig({ answer }){
    const [board, setBoard] = useState([]);
    const [options, setOptions] = useState([]);

    const [{isOver}, drop] = useDrop(()=> ({
        accept:'corn',
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
        const stackedCorn = corn.filter((corn)=> id === corn.id);
        setBoard((board)=> [...board, stackedCorn[0]]);

    }
    const corn = [
        {
            id: 1,
            text: option[5]
        },
        {
            id: 2,
            text: option[0]
        },
        {
            id: 3,
            text: option[4]
        },
        {
            id: 4,
            text: option[1]
        },
        {
            id: 5,
            text: option[3]
        },
        {
            id: 6,
            text: option[2]
        }
    ]
    return (
        <>
        <div 
        className='flex justify-center gap-x-40 -mt-52 -ml-16 z-10 absolute rotate-2 '
        >
        {corn.map((corn)=>{
        return <Corn  
                id={corn.id} 
                key={new Date().getTime() + Math.floor(Math.random() * 1000)}
                options={corn.text}
                />
        })}</div>
        <div 
        className='flex w-2/6 h-1/6 absolute mt-72 ml-96 rotate-2 justify-center space-y-6' 
        ref={drop}
        >
        {board.map((corn)=> {
            return<Corn 
                    key={corn.id} 
                    id={corn.id} 
                    options={corn.text}/>
        })}
        </div>
        </>
    )
};
export default FeedThePig;