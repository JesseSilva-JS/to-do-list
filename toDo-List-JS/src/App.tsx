import { useState } from 'react'
import { Header }  from './components/header/Header'
import { TaskList } from './components/TaskList/TaskList'
import './App.module.scss'
import './Global.module.scss'

export default function App() {
  const [count, setCount] = useState(0)

  return (
   <>
      <Header/>
      <TaskList/>
   </>
  )
}
