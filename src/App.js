import React from 'react';
import { nanoid } from 'nanoid';
import Project from './components/Project';
import Task from './components/Task';

import './App.css';

function App() {
  const [projectForm, setProjectForm] = React.useState({title: ''});
  const [taskForm, setTaskForm] = React.useState({taskTitle:''});
  
  const [todo, setTodo] = React.useState( () => { return JSON.parse(localStorage.getItem("todo")) || []})
  const [taskList, setTaskList] = React.useState([]);


  // Save Todo in LocalStorage
  React.useEffect(() => {
    return localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo])

  const handleOnChange = (event) =>{
    const {name, value, type, checked} = event.target;

    setProjectForm(prevData => {
      return{...prevData,
        [name] : type === "checkbox" ? checked : value
      }
    })

  }

  const handleSubmit = () =>{
    if(projectForm.title === ''){
      alert('A Project must have a name')
    }else{
      setTodo(prevTodo => {
        return [...prevTodo, {
          id: nanoid(),
          title: projectForm.title,
          tasks:[],
          currentlyEditing: false,
          selected: false
        }]
      })
      setProjectForm({title:''})
    }

  }

  const deleteProject = (projectId) =>{
    setTodo(prevTodo => {
      return prevTodo.filter(todo => todo.id !== projectId)
    })

    setTaskList([]);

  }

  const setEditMode = (projectId) =>{
    console.log(projectId);
    setTodo(prevTodo =>{
      return prevTodo.map(project =>{
        return project.id === projectId ? 
        {...project, currentlyEditing: !project.currentlyEditing} : project
      })
    })
  }

  // Update project title and disable edit mode
  const updateProject = (projectId, projectTitle) =>{
    setTodo(prevTodo => {
      return prevTodo.map(project =>{
        return project.id === projectId ?
        {...project, title: projectTitle, currentlyEditing: !project.currentlyEditing} :
        project
      })
    })
  }

  const toggleSelected = (projectId) =>{
    setTodo(prevTodo =>{
      return prevTodo.map(project =>{
        return project.id === projectId ?
        {...project, selected: true} : {...project, selected: false};
      })
    })
  }

  //  Map Project Data to Project Components to display it
  const projectItems = todo.map(project =>{
    return(
    <Project 
      key={project.id} 
      id={project.id} 
      title={project.title} 
      deleteProject={() => deleteProject(project.id)}
      currentlyEditing={project.currentlyEditing}
      setEditMode={() => setEditMode(project.id)}
      updateProject={updateProject}
      selected={project.selected}
      toggleSelected={() => toggleSelected(project.id)}
      />)
  });


  
  // Task Functions
  const handleTaskForm = (event) => {
    const {name, value, type, checked} = event.target;

    setTaskForm(prevData => {
      return{...prevData,
        [name] : type === "checkbox" ? checked : value
      }
    });

    console.log(taskForm);
  }

  const handleTaskSubmit = () =>{
    if(taskForm.title === ''){
      alert('A Project must have a name')
    }else{
      setTodo(prevTodo => {
        return prevTodo.map(project =>{
          return project.selected ?
          {...project, tasks: addTask(project.tasks)} :
          project
        })
      })
      setTaskForm({taskTitle:''})
    }

  }

  const addTask = (tasks) =>{
    return [...tasks, {id: nanoid(), taskTitle:taskForm.taskTitle}]
  }

  const deleteTask = (taskId) =>{
    setTodo(prevTodo => {
      return prevTodo.map(project =>{
        return project.selected ?
        {...project, tasks: project.tasks.filter(task => task.id !== taskId)} : project
      })
    })
  }


  React.useEffect(()=>{
    for(let i = 0; i < todo.length; i++){
      if(todo[i].selected){
        setTaskList(todo[i].tasks)
      }
    }
  },[todo])

  const taskItems = taskList.map(task => 
    { return(
      <Task 
        key={task.id} 
        id={task.id} 
        taskTitle={task.taskTitle}
        deleteTask={() => deleteTask(task.id)}
        />)
    })

  // console.log(taskItems);
  // console.log(todo);
  return (
    <div className="app">
      <header>
        <input 
        type="text" 
        name="title"
        value={projectForm.title}
        onChange={handleOnChange}
        />
        <button onClick={handleSubmit}>Add Project</button>
      </header>

      <div className="task-form">
        <input 
          type="text" 
          name="taskTitle"
          value={taskForm.taskTitle}
          onChange={handleTaskForm}
        />

        <button onClick={handleTaskSubmit}>Add Task</button>
      </div>

      <div className="projects">
        {projectItems}
      </div>

      <div className="tasks">
        {taskItems}
      </div>
    </div>
  );
}

export default App;
