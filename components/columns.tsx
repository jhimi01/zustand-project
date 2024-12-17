import React from "react";
import Column from "./Column";
import NewTodoDialog from "./new-todo-dialog";
import { Select } from "./ui/select";

export default function Columns() {
  return (
    <div>

      
      <NewTodoDialog />
      <section className="mt-10 flex gap-6 lg:gap-12">
        {/* column */}
        <Column title="Todo" status="Todo" />
        <Column title="In Progress" status="In Progress" />
        <Column title="DONE" status="DONE" />
      </section>
    </div>
  );
}
