"use client";
import React, { useEffect, useMemo } from "react";
import Task from "./task";
import { Status, useTaskStore } from "@/lib/store";

export default function Column({
  title,
  status,
}: {
  title: string;
  status: Status;
}) {
  // console.log("this is a value for check", title, status);
  const tasks = useTaskStore((state) => state.tasks);

  const filterdTask = useMemo(
    () => tasks.filter((task) => task.status === status),
    [tasks, status]
  );

  // const filterdTask = tasks.filter((task) => task.status === status)

  console.log("this is a value for check", tasks);

  useEffect(() => {
    useTaskStore.persist.rehydrate();
  }, []);

  const updateTask = useTaskStore((state) => state.updateTask);
  const draggedTask = useTaskStore((state) => state.draggedTask);
  const dragTask = useTaskStore((state) => state.dragTask);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!draggedTask) return;
    updateTask(draggedTask, status);
    dragTask(null);
  };

  return (
    <div className="border-2">
      <h2 className="ml-1 font-serif text-2xl font-semibold">{title}</h2>
      <div
        className="mt-3 border-2 w-56 h-full flex-1 flex flex-col justify-center rounded-xl bg-red-500"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="">
          {filterdTask.map((task) => (
            <Task key={task?.id} {...task} />
          ))}
        </div>
      </div>
    </div>
  );
}
