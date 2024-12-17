import React from "react";
import { Button } from "./ui/button";
import { useTaskStore } from "@/lib/store";

export default function Task({
  id,
  title,
  desc,
  status,
}: {
  id: string;
  title: string;
  desc: string;
  status: string;
}) {
  const dragTask = useTaskStore((state) => state.dragTask);
  const removeTask = useTaskStore((state) => state.removeTask);
  return (
    <div
      className="border-2 flex items-center justify-center flex-col h-full w-full"
      draggable
      onDrag={() => {
        dragTask(id);
      }}
    >
      <div>
        <h3 className="text-sm font-semibold">{status}</h3>
        <p className="text-sm text-gray-700">{desc}</p>
      </div>
      <Button onClick={() => removeTask(id)}>delete task</Button>
    </div>
  );
}
