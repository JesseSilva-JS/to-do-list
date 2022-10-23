import { ChangeEvent, FormEvent, InvalidEvent, useEffect, useState } from "react"
import styles from './TaskList.module.scss'

import Trash from '../../assets/svg/Trash.svg'
import Plus from '../../assets/svg/Plus.svg'
import Imput from '../../assets/svg/input.svg'
import ImputChecked from '../../assets/svg/input-checked.svg'
interface Task {
    id: number;
    title: string;
    isComplete: boolean
}

export function TaskList() {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const [tasksCompletion, setTasksCompletion] = useState(0);

    function handleCreateNewTask(e: FormEvent) {
        e.preventDefault();

        const max = 100;

        let task: Task = { id: 1, title: "", isComplete: true }

        task = {
            id: Math.random() * max,
            title: newTaskTitle,
            isComplete: true
        };

        setTasks(prevTasks => [...prevTasks, task]);

        setNewTaskTitle('');
    }

    useEffect(() =>{
        handleCalculateTaskCompletion()
    }, [tasks])

    function handleNewTaskInvalid(e: InvalidEvent<HTMLInputElement>) {
        e.target.setCustomValidity("Nome da tarefa é obrigatório");
    }

    function handleNewTaskChange(e: ChangeEvent<HTMLInputElement>) {
        setNewTaskTitle(e.target.value);
        e.target.setCustomValidity('')
    }

    function handleToggleTaskCompletion(id: Number) {
        const taskIndex = tasks.findIndex((task) => {
            return task.id == id;
        })

        const tempTasks = [...tasks];

        tempTasks[taskIndex].isComplete = !tempTasks[taskIndex].isComplete;

        setTasks(tempTasks)
    }

    function handleRemoveTask(id: number) {
        const taskIndex = tasks.findIndex((task) => {
            return task.id == id;
        })

        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks)
    }

    function handleCalculateTaskCompletion() {

        const tasksCompletion = tasks.filter((task) => task.isComplete == false);

        let tasksDone = tasksCompletion.length;

        setTasksCompletion(tasksDone)
    }

    return (
        <>
            <section className={styles.taskListContainer}>

                <form onSubmit={handleCreateNewTask}>
                    <div className={styles.inputGroup}>
                        <input className={styles.inputInsertTask}
                            placeholder="Adicione uma nova tarefa"
                            type="text"
                            value={newTaskTitle}
                            onInvalid={handleNewTaskInvalid}
                            onChange={handleNewTaskChange}
                            required
                        />
                        <button className={styles.buttonCreatTask} type="submit"> Criar <img src={Plus} /></button>
                    </div>
                </form>



                <main>

                    <>
                        <div className={styles.listTitle}>
                            <p className={styles.tasksCreated}>Tarefas criadas <span>{tasks.length}</span></p>
                            <p className={styles.tasksCompletion}>Concluídas<span> {tasksCompletion} de {tasks.length}</span></p>
                        </div>


                    </>
                    <ul className={styles.listTask}>

                        {tasks.map(task => {
                            return (
                                <>
                                    <li key={task.id}>
                                        <img
                                            onClick={() => handleToggleTaskCompletion(task.id)}
                                            src={task.isComplete ? Imput : ImputChecked}
                                        />
                                        <p className={task.isComplete ? '' : styles.taskCompletion}>{task.title}</p>
                                        <button data-testid="remove-task-buttom" onClick={() => handleRemoveTask(task.id)}><img src={Trash} alt="Exluir Tarefa" /></button>
                                    </li>
                                </>
                            )
                        })}
                    </ul>
                </main>
            </section>
        </>

    )
}