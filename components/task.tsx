import React from 'react'
import { Button } from './ui/button'
import { useTaskStore } from '@/lib/store'

export default function Task({
  id,
    title, 
    desc,
    status
}: {
  id: string,
    title: string, 
    desc: string,
    status: string
}) {
  const dragTask = useTaskStore(state => state.dragTask)
  const removeTask = useTaskStore(state => state.removeTask)
  return (
    <div draggable onDrag={()=>{dragTask(id)}}>
       <div>
        <h3 className='text-sm'>{title}</h3>
        <p className='text-sm'>{desc}</p>
        </div>      
        <button onClick={()=> removeTask(id)} className='border-2 px-5 text-sm text-center'>
            delete task
        </button>
        <Button>Click me</Button>
    </div>
  )
}
