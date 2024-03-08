import React, { useState, useEffect } from 'react'
import '../Todo/todolist.css'


let getData = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
console.log(getData)

const TodoList = () => {

      const [todos, setTodos] = useState('')
      const [newTodos, setNewTodos] = useState(getData)
      const [isEdit, setIsEdit] = useState('')
      const handleSubmit = (e) => {
            e.preventDefault()

            if (isEdit !== '') {
                  const updateTodo = [...newTodos]
                  updateTodo[isEdit] =todos 
                  setNewTodos(updateTodo)
                  setIsEdit('')
            }
            else if(todos == ''){
                  alert("Please Enter your Task!")
            } 
            else {
                  setNewTodos((preVal) => {
                        return [...preVal, todos]
                  })
            }
            setTodos('')
      }

      const handleEdit = (i) => {
            const editedTodd = newTodos[i]
            setTodos(editedTodd)
            console.log("edit--->", editedTodd)
            setIsEdit(i)
           
      }

      const handleDelete = (i) => {
            const deleteTodo = window.confirm('Are you sure you want to delete this task?')
            if (deleteTodo) {
                  const total = [...newTodos] 
                  const remove = total.splice(i, 1)
                  setNewTodos(total) 
            } else {
                  alert("Hey!.. Your Task is Safe!")
            }

      }

 
    
        useEffect(() => {
            localStorage.setItem('todos', JSON.stringify(newTodos));
        }, [newTodos]);

      return (
            <div>
                  <div className="todo_container">
                        <h1 className='text-center mt-3 text-light'>Todo List</h1>

                        <div className='fixed-form'>
                              <form onSubmit={handleSubmit}>
                                    <div className='todo_input'>
                                          <input className='form-control w-75 '
                                                type="text"
                                                value={todos}
                                                placeholder='Enter your tasks...'
                                                onInput={(e) => { setTodos(e.target.value) }}
                                          />
                                          <button className='btn btn-primary fw-bold' type='submit'>Add</button>
                                    </div>
                              </form>
                        </div>

                        <div className='sticky'>
                              <ol>
                                    {newTodos.map((item, i) => {
                                          return (
                                                <div key={i} className='todo_list'>
                                                      <li>{item}</li>
                                                      <div className='icons'>
                                                            <i className='bi bi-pencil-square' onClick={() => { handleEdit(i) }}></i>
                                                            <i className='bi bi-trash' onClick={() => { handleDelete(i) }}></i>
                                                      </div>
                                                </div>

                                          )

                                    })}
                              </ol>
                        </div>
                  </div>
            </div>
      )
}

export default TodoList