import React from "react"

const Project = (props) =>{
  const [projectTitle, setProjectTitle] = React.useState({title: props.title})

  const handleChange = (event) =>{
    const {name, type, value, checked} = event.target;
    setProjectTitle(prevData => {
      return {...prevData,
        [name] : type === "checkbox" ? checked : value
      }
    })
    console.log(projectTitle);
  }

  const styles = {
    border: props.selected ? "2px solid black" : "none"
  }

  return(
    <div style={styles} onClick={props.toggleSelected} className="project-item">
      {!props.currentlyEditing && <h2>{props.title}</h2>}
      {props.currentlyEditing && 
        <input 
          type="text"
          name="title"
          value={projectTitle.title}
          onChange={handleChange}
        />}
      
      {!props.currentlyEditing && <button onClick={props.setEditMode}>Edit</button>}
      {props.currentlyEditing && <button onClick={() => props.updateProject(props.id, projectTitle.title)}>Update</button>}
      <button onClick={props.deleteProject}>Delete</button>
    </div>
  )
}

export default Project