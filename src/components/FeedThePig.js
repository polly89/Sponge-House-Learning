import Corn from "./Corn";
import { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { v4 as uuid } from "uuid";
import Confetti from 'react-confetti'
import Modal from "./Modal";

function FeedThePig({ answer }) {
  const [board, setBoard] = useState([]);
  const [corn, setCorn] = useState([]);
  const [showModal, setShowModal]= useState(false);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "corn",
      drop: (item) => addToPail(item.id),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [corn]
  );

  useEffect(() => {
    const options = answer.split('');
    const corn = options
      .map((o) => ({ id: uuid(), text: o }))
      .sort(() => 0.5 - Math.random());
    setCorn(corn);
  }, [answer]);

  const addToPail = (id) => {
    console.log({ corn, id });
    const stackedCorn = corn.find((corn) => id === corn.id);
    setBoard((board) => [...board, stackedCorn]);
  };
  // remove corn  upon drop
  for( let i = 0; i < corn.length; i++){
    for( let j = 0; j < board.length; j++ ) {
        if (corn[i] === board[j]) {
            corn.splice(i, 1)
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
      <div className="flex justify-center gap-x-40 -mt-52 -ml-16 z-10 absolute rotate-2 ">
        {corn.map((corn) => {
          return (
            <Corn
              id={corn.id}
              key={new Date().getTime() + Math.floor(Math.random() * 1000)}
              options={corn.text}
            />
          );
        })}
        {corn.length === 0? (<button onClick={handleClick} className="publish hover:bg-sky-500 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300">Submit</button>) : ('')}
      </div>
      <div
        className="flex w-2/6 h-1/6 absolute mt-72 ml-96 rotate-2 justify-center space-y-6"
        ref={drop}
      >
        {board.map((corn) => {
          return <Corn 
            key={corn.id} 
            id={corn.id} 
            options={corn.text} />;
        })}
      </div>
      {showModal && modal }
    </>
  );
}
export default FeedThePig;