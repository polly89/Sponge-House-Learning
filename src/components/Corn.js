import { useDrag } from 'react-dnd';

function Corn({id, options}){  

    const [{isDragging}, drag] = useDrag(()=> ({
        type:'corn', 
        item:{id: id},
        collect: (monitor)=> ({
            isDragging: !!monitor.isDragging(),
        })
    }))
    return (
        <div
        ref={drag} 
        style={{border: isDragging ? '5px solid pink' : "0px"}}>
            <h1 className='text-5xl text-slate-100 mt-4 text-center rounded-full bg-amber-400 w-16 h-20'>{options}</h1> 
        </div>
    );
}
export default Corn