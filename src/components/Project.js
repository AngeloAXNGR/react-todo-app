import React from "react"
import projectIcon from '../images/list-box-outline.svg';
import editIcon from '../images/edit-icon.svg';
import deleteIcon from '../images/delete-icon.svg';
import saveIcon from '../images/save-edit.svg';

const Project = (props) =>{
  const [projectTitle, setProjectTitle] = React.useState({title: props.title})
  const [isHover, setIsHover] = React.useState(false);

  const handleChange = (event) =>{
    const {name, type, value, checked} = event.target;
    setProjectTitle(prevData => {
      return {...prevData,
        [name] : type === "checkbox" ? checked : value
      }
    })
    console.log(projectTitle);
  }

  const handleMouseEnter = () =>{
    setIsHover(true);
  }

  const handleMouseLeave = () =>{
    setIsHover(false);
  }

  const styles = {
    backgroundColor: props.selected || isHover ? "#CCCCCC" : "transparent",
  }


  return(
    <div style={styles} onClick={props.toggleSelected} className="project-item" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {!props.currentlyEditing && <img className="project-icon" src={projectIcon} alt="" />}

      {!props.currentlyEditing && <p className="project-title">{props.title}</p>}
      {props.currentlyEditing && 
        <input 
          type="text"
          id="edit-title-input"
          name="title"
          value={projectTitle.title}
          onChange={handleChange}
        />}
      
      {!props.currentlyEditing && <img onClick={props.setEditMode} src={editIcon} alt="" />}
      {props.currentlyEditing && <img onClick={() => props.updateProject(props.id, projectTitle.title)} src={saveIcon} alt="" />}
      <img onClick={props.deleteProject} src={deleteIcon} alt="" />
    </div>
  )
}

export default Project