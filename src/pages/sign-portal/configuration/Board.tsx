import React from "react";
 import {Task} from "../configuration/ShiftTIme"

interface BoardProps {
  task: Task;
  index: number;
}

const Board: React.FC<BoardProps> = ({ task, index }) => {
  return (
    <div className="flex flex-col gap-1 p-3 bg-gray-100 rounded shadow">
      <p className="font-semibold">shift: {index + 1}</p>
      <p> Start: {task.startTime}</p>
      <p> End: {task.endTime}</p>
    </div>
  );
};

export default Board;
