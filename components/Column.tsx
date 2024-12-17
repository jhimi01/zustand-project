"use client";
import React, { useEffect, useMemo } from "react";
import Task from "./task";
import { Status, useTaskStore } from "@/lib/store";

export default function Column({
  id,
  title,
  status,
}: {
  id: string;
  title: string;
  status: Status;
}) {
  const tasks = useTaskStore((state) => state.tasks);

  const filterdTask = useMemo(
    () => tasks.filter((task) => task.status === status),
    [tasks, status]
  );

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
    <section>
      <h2 className="ml-1 font-serif text-2xl font-semibold">{title}</h2>

      <div
        className="mt-3 h-full w-full flex-1 rounded-xl bg-gray-700/50"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-4">
          {filterdTask.map((task) => (
            <Task key={task?.id} {...task} />
          ))}
        </div>
      </div>
    </section>
  );
}
