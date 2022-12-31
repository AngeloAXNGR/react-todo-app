import React from "react";
const Task = (props) =>{
  const [taskData, setTaskData] = React.useState({taskTitle: props.taskTitle, taskDueDate: props.dueDate})

  const [isHover, setIsHover] = React.useState(false);

  const handleMouseEnter = () =>{
    setIsHover(true);
  }

  const handleMouseLeave = () =>{
    setIsHover(false);
  }

  const styles = {
    backgroundColor: props.selected || isHover ? "#CCCCCC" : "transparent",
  }


  const handleChange = (event) =>{
    const {name, type, value, checked} = event.target;
    
    setTaskData(prevData => {
      return {...prevData,
        [name] : type === "checkbox" ? checked : value
      }
    })
  }

  return(
    <div className="task-item" style={styles} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div  onClick={props.deleteTask} className="checkbox">
      </div>
      {!props.currentlyEditing && <p className="task-title" onClick={props.setTaskEditMode}>{props.taskTitle}</p>}
      {props.currentlyEditing && 
        <input 
          type="text" 
          name="taskTitle"
          value={taskData.taskTitle}
          className="title-input"
          onChange={handleChange} 
          onMouseLeave={() => props.updateTask(taskData.taskTitle, taskData.dueDate)}
          />}
      {!props.currentlyEditing && <p onClick={props.setTaskEditMode} className="task-duedate">{props.dueDate === null  || props.dueDate === undefined ? "No Due Date" : `${props.dueDate}`}</p>}
      {props.currentlyEditing && 
        <input 
          className="date-input"
          type="date" 
          name="dueDate"
          onChange={handleChange} 
          // onBlur={() => props.updateTask(taskData.taskTitle, taskData.dueDate)}
          onMouseLeave={() => props.updateTask(taskData.taskTitle, taskData.dueDate)}
          />}
    </div>
  );
}

export default Task;