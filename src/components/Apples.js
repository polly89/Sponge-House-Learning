import { useDrag } from 'react-dnd';

function Apples({id, options}){  

    const [{isDragging}, drag] = useDrag(()=> ({
        type:'apple', 
        item:{id: id},
        collect: (monitor)=> ({
            isDragging: !!monitor.isDragging(),
        })
    }))
    return (
        <div
        ref={drag} 
        style={{border: isDragging ? '5px solid pink' : "0px"}}>
            <h1 className='text-5xl text-slate-100 text-center bottom-0 rounded-full border-2 border-dashed bg-red-500 w-16 h-16'>{options}</h1> 
        </div>
    );
}
export default Apples