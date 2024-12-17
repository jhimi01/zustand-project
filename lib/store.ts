import { create } from "zustand";
import { v4 as uuid } from 'uuid';


export type Status = "Todo" | "In Progress" | "Done";

export type Task = {
    id: string;
    title: string;
    desc: string;
    status: Status;
}

export type State = {
    tasks: Task[]
    draggedTask: string | null
}

export type Actions = {
    addTask: (title: string, desc: string) => void;
    dragTask: (id: string | null) => void;
    removeTask: (id: string) => void;
    updateTask: (id: string, status: Status) => void;
}


export const useTaskStore = create<State & Actions>((set) => ({
    tasks: [],
    draggedTask: null,
    addTask: (title, desc)=> set((state)=>({
        tasks: [...state.tasks, {id: uuid(), title, desc, status: 'Done'} ]
    })),
    dragTask: (id)=> set({ draggedTask: id }),
    removeTask: (id)=>set((state)=>({
        tasks: state.tasks.filter((task) => task.id !== id)
    })),
    updateTask: ( id, status)=>set((state)=>({
       tasks: state.tasks.map(task => task.id === id ? {...task,  status} : task)
    })),
}))