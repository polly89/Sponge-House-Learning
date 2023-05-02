import Corn from "./Corn";
import { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { v4 as uuid } from "uuid";

function FeedThePig({ answer }) {
  const [board, setBoard] = useState([]);
  const [corn, setCorn] = useState([]);

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
    </>
  );
}
export default FeedThePig;