import React from 'react';
import { nanoid } from 'nanoid';
import Project from './components/Project';
import Task from './components/Task';
import headerIcon from './images/header-icon.svg';
import addIcon from './images/add-icon.svg';


import './App.css';

function App() {
  const [projectForm, setProjectForm] = React.useState({title: ''});
  const [taskForm, setTaskForm] = React.useState({taskTitle:''});
  
  const [todo, setTodo] = React.useState( () => { return JSON.parse(localStorage.getItem("todo")) || []})
  const [taskList, setTaskList] = React.useState([]);

  const [showProjectForm, setShowProjectForm] = React.useState(false);
  const [showTaskForm, setShowTaskForm] = React.useState(false);

  const [isHover, setIsHover] = React.useState(false);

  const handleMouseEnter = () =>{
    setIsHover(true);
  }

  const handleMouseLeave = () =>{
    setIsHover(false);
  }

  const hoverStyles = {
    backgroundColor: isHover ? "#CCCCCC" : "white",
  }
  // Save Todo in LocalStorage
  React.useEffect(() => {
    return localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo])


  const openProjectForm = () =>{
    setShowProjectForm(prevShow => {return !prevShow});
  }

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
      setShowProjectForm(prevShow => {return !prevShow});
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

  const openTaskForm = () =>{
    setShowTaskForm(prevShow => {return !prevShow})
  }

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
      setShowTaskForm(prevShow => {return !prevShow})
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

  return (
    <div className="app">
      <header>
        <img src={headerIcon} alt="" />
        <h1 className="app-title">To-do List Application</h1>
      </header>

      <main>
        <div className="side-bar">
          <h1>Projects</h1>
          <div className="projects">
            {projectItems}
            {! showProjectForm && <div style={hoverStyles} className="add-project-button" onClick={openProjectForm} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <img src={addIcon} alt="" />
              <p>Add Project</p>
            </div>}

            {showProjectForm && <div className="add-project">
              <input
              type="text"
              name="title"
              id="add-project-input"
              value={projectForm.title}
              onChange={handleOnChange}
              />
              <div className="project-form-buttons">
                <button onClick={handleSubmit} className="add-button">Add</button>
                <button onClick={openProjectForm} className="cancel-button">Cancel</button>
              </div>
            </div>}
          </div>
        </div>
        <div className="tasks">
          {taskItems}
          {!showTaskForm && <button onClick={openTaskForm}>Add Task</button>}
          {showTaskForm && <div className="add-task">
            <input
              type="text"
              name="taskTitle"
              value={taskForm.taskTitle}
              onChange={handleTaskForm}
            />
            <button onClick={handleTaskSubmit}>Add</button>
          </div>}
        </div>
      </main>
    </div>
  );
}

export default App;
