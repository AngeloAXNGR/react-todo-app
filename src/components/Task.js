import React from "react";

const Task = (props) =>{
  return(
    <div className="task-item">
      <h1>{props.taskTitle}</h1>
    </div>
  );
}

export default Task;