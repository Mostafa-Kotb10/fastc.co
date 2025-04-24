import { useState } from "react";
import Input from "./Input";
import Board from "./Board";


export type Task = {
  startTime: string;
  endTime: string;
};

export const ShiftTime = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <div className="flex justify-center items-start w-full h-full p-4">
    <div className="w-full max-w-md rounded p-4 shadow">
      <h1 className="mb-4 text-center text-2xl font-bold">Shift</h1>
  
      <Input tasks={tasks} setTasks={setTasks} />
  
      <div className="mt-4 space-y-2">
        {tasks.map((task, index) => (
          <Board key={index} task={task} index={index} />
        ))}
      </div>
    </div>
  </div>
  );
};

export default ShiftTime;