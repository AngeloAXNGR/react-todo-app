import React from 'react';
import { nanoid } from 'nanoid';
import Project from './components/Project';

import './App.css';

function App() {
  const [projectForm, setProjectForm] = React.useState({title: ''});

  const [todo, setTodo] = React.useState( () => { return JSON.parse(localStorage.getItem("todo")) || []})

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

    console.log(projectForm);
  }

  const handleSubmit = () =>{
    setTodo(prevTodo => {
      return [...prevTodo, {
        id: nanoid(),
        title: projectForm.title,
        tasks: [],
        currentlyEditing: false
      }]
    })
    
    setProjectForm({title:''})
  }

  const deleteProject = (projectId) =>{
    setTodo(prevTodo => {
      return prevTodo.filter(todo => todo.id !== projectId)
    })
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
      />)
  });

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

      <div className="projects">
        {projectItems}
      </div>
    </div>
  );
}

export default App;
