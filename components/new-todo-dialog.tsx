"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useTaskStore, Status } from "@/lib/store";

export default function NewTodoDialog() {
  const addTask = useTaskStore((state) => state.addTask);
  const Tasks = useTaskStore((state) => state.tasks);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const desc = formData.get("desc");

    if (
      typeof title !== "string" ||
      typeof desc !== "string" ||
      !["Todo", "In Progress", "Done"].includes(status)
    )
      return;

    addTask(title, desc, status as Status);
    console.log("object submit", Tasks);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          ＋ Add New Todo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Todo</DialogTitle>
          <DialogDescription>
            What do you want to get done today?
          </DialogDescription>
        </DialogHeader>
        <form
          id="todo-form"
          className="grid gap-4 py-4"
          onSubmit={handleSubmit}
        >
          <Select onValueChange={(value) => { 
             setTitle(value);
             setStatus(value ); }}>
            <SelectTrigger className="w-full">
              <SelectValue
                className="text-red-300 text-3xl"
                placeholder="Todo Title"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Todo</SelectLabel>
                <SelectItem value="Todo">Todo</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* </div> */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Textarea
              id="description"
              name="desc"
              placeholder="Description..."
              className="col-span-4"
            />
          </div>
        </form>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button type="submit" size="sm" form="todo-form">
              Add Todo
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
