import { useDrag } from 'react-dnd';

function Brick({id, url, answer}){
    const answerScramble = answer.split('').sort(function(){return 0.5- Math.random()})
    console.log(answerScramble)
    let i = 0
    // ISSUES: 
    // App is rerendering and generating a random letter on every drag/drop need useEffect
    // Letters are showing duplicates
    // DND library doesn't cary the h1 element into the dropZone... can I add it as an acceptable type? Or should I replace my images with a rectangular div?

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
            <h1 className='-mt-14 text-center gap-4'>{answerScramble[i++]}</h1> 
        </div>
    );
}
export default Brick
