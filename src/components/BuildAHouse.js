import Brick from "./Brick"
import { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuid } from "uuid";

function BuildAHouse({ answer }){
    const [board, setBoard] = useState([]);
    const [brick, setBrick] = useState([]);

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
        
    }
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
        })}</div>
        <div 
        className='w-80 h-2/6 absolute mt-16 ml-96 rotate-2 justify-center space-y-6' 
        ref={drop}
        >
        {board.map((brick)=> {
            return<Brick 
                    key={brick.id} 
                    url={'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Rectangle+40.png'} 
                    id={brick.id} 
                    options={brick.text}/>
        })}
        </div>
        </>
    )
};
export default BuildAHouse;