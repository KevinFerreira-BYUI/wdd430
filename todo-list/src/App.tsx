import React, { useState } from 'react'
import "./App.css"

function App() {
    const [newItem, setNewItem] = useState("")

    interface todoProps{
        id: string,
        title: string,
        completed: boolean    
    }

    const [toDo, setTodo] = useState<todoProps[]>([])
    
    function toDos(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        setTodo(insertTodo => {
            return[
                ...insertTodo,
                {
                    id: crypto.randomUUID(),
                    title: newItem,
                    completed: false
                }
            ]
        })
    }

    function toggleTodo(id:string, completed:boolean){
        setTodo(insertTodo => {
            return insertTodo.map(todo => {
                if(todo.id === id){
                    return {...todo, completed}
                }

                return todo
            })
        })
    }

    function deleteItem(id:string){
        setTodo(insertTodo => {
            return insertTodo.filter(todo => todo.id !== id)
        })
    }

    return (
        <>
            <section className="d-flex flex-column align-items-center">
                <div>
                    <form className="todoForm d-flex flex-column mb-3" onSubmit={toDos}>
                        <h1>New Item</h1>
                        <input id="insertTodo" type="text" value={newItem} onChange={e => setNewItem(e.target.value)}/>  
                        <input id="submitTodo" className="mt-3 btn btn-primary btn-lg" type="submit" value="Add"/>
                    </form>
                </div>

                <div>
                    <h1 className='p-4'>To do List</h1>
                    <div className='list-container mt-4'>
                        <ul className="list">
                            {toDo.map(todo => {
                                return <li key={todo.id}>
                                    <label className="me-3">
                                        <input
                                        className="checkBox me-2" 
                                        type="checkbox" 
                                        checked={todo.completed}
                                        onChange={e => toggleTodo(todo.id, e.target.checked)}
                                        />
                                        {todo.title}
                                    </label>
                                    <button className='btn btn-danger' onClick={() => deleteItem(todo.id)}>Delete</button>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}

export default App
  