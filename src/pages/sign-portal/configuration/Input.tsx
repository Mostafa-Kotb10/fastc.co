import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import {Task} from "../configuration/ShiftTIme"

interface InputProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const timeOptions = ["08:00 AM", "12:00 PM", "03:00 PM", "06:00 PM", "12:00 AM"];

const Input = ({ tasks, setTasks }: InputProps) => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleAdd = () => {
    if (!start || !end) return;
    setTasks([...tasks, { startTime: start, endTime: end }]);
    setStart("");
    setEnd("");
  };

  return (
    <div className="flex gap-2">
      <Select value={start} onValueChange={setStart}>
        <SelectTrigger><SelectValue placeholder="Start Time" /></SelectTrigger>
        <SelectContent>
          {timeOptions.map((time) => <SelectItem key={time} value={time}>{time}</SelectItem>)}
        </SelectContent>
      </Select>

      <Select value={end} onValueChange={setEnd}>
        <SelectTrigger><SelectValue placeholder="End Time" /></SelectTrigger>
        <SelectContent>
          {timeOptions.map((time) => <SelectItem key={time} value={time}>{time}</SelectItem>)}
        </SelectContent>
      </Select>

      <Button onClick={handleAdd}>submit</Button>
    </div>
  );
};

export default Input;
