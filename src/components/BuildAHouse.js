import Brick from "./Brick"
import { useState } from 'react';
import { useDrop } from 'react-dnd';

function BuildAHouse({ answer }){
    const [board, setBoard] = useState([]);
    const [{isOver}, drop] = useDrop(()=> ({
        accept:'brick',
        drop: (item)=> addBrickToHouse(item.id),
        collect: (monitor)=> ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addBrickToHouse =(id)=> {
        const stackedBricks = bricks.filter((brick)=> id === brick.id);
        setBoard((board)=> [...board, stackedBricks[0]]);
    }
    const bricks = [
        {
            id: 1,
            url: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Rectangle+40.png'
        },
        {
            id: 2,
            url: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Rectangle+40.png'
        },
        {
            id: 3,
            url: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Rectangle+40.png'
        }
    ]
    return (
        <>
        <div className='flex justify-center gap-4 -mt-48 z-10 absolute rotate-2'>{bricks.map((brick)=>{
            return <Brick url={brick.url} id={brick.id} answer={answer}/>
        })}</div>
        <div className='w-80 h-2/6 absolute mt-16 ml-96 rotate-2 justify-center space-y-6' ref={drop}>
            {board.map((brick)=> {
                return<Brick url={brick.url} id={brick.id}/>
            })}
        </div>
        </>
    )
};
export default BuildAHouse;