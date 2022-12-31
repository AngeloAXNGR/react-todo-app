import React from "react";

const Task = (props) =>{
  const [taskData, setTaskData] = React.useState({taskTitle: props.taskTitle, taskDueDate: props.dueDate})


  const handleChange = (event) =>{
    const {name, type, value, checked} = event.target;
    
    setTaskData(prevData => {
      return {...prevData,
        [name] : type === "checkbox" ? checked : value
      }
    })
    console.log(taskData);
  }

  return(
    <div className="task-item">
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
          onBlur={() => props.updateTask(taskData.taskTitle, taskData.dueDate)}
          />}
      {!props.currentlyEditing && <p onClick={props.setTaskEditMode} className="task-duedate">{props.dueDate === ''  || props.dueDate === undefined ? "No Due Date" : `${props.dueDate}`}</p>}
      {props.currentlyEditing && 
        <input 
          className="date-input"
          type="date" 
          name="dueDate"
          value={taskData.taskDueDate}
          onChange={handleChange} 
          onBlur={() => props.updateTask(taskData.taskTitle, taskData.dueDate)}
          />}
    </div>
  );
}

export default Task;