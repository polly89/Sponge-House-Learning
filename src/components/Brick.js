import { useDrag } from 'react-dnd';

function Brick({id, url, answer}){  

    const [{isDragging}, drag] = useDrag(()=> ({
        type:'brick', 
        item:{id: id},
        collect: (monitor)=> ({
            isDragging: !!monitor.isDragging(),
        })
    }))
    return (
        <div
        ref={drag} 
        style={{border: isDragging ? '5px solid pink' : "0px"}}>
            <img src={url} alt='brick' className=''/>
            <h1 className='-mt-14 text-center gap-4'>{answer}</h1> 
        </div>
    );
}
export default Brick
