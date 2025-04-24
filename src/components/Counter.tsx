import { create } from "zustand";
import { Button } from "./ui/button";


const useStore = create<{
  count: number;
  inc: () => void;
  dec: () => void;
}>((set) => ({
  count: 0,
  inc: () =>
    set((state) => ({
      count: state.count + 1,
    })),
  dec: () =>
    set((state) => ({
      count: state.count - 1,
    })),
}));

const Counter = () => {
    const store = useStore();

  return (
    <div className="mt-10 space-x-3 w-full">
      <Button onClick={store.inc}>+</Button>
      <span>{store.count}</span>
      <Button onClick={store.dec}>-</Button>
    </div>
  )
}

export default Counter