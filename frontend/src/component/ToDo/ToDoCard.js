import React from 'react'
import "./ToDoCard.css"
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FiEdit } from "react-icons/fi"

import 'react-toastify/dist/ReactToastify.css';

export default function ToDoCard({title, body, openPopup, priority, id, delId, updateId, updateData}) {

  return (
    
    <div className='card'>
      <div className='card-centent'>
        <span>{priority}</span>
        <h2 className='card-title'>{title.split("", 20)}</h2>
        <hr />
        <p>{body.split("", 100)}...</p>
      </div>

      <div className='d-flex gap-4 align-items-center justify-content-center'>
        <div onClick={()=>{
            delId(id, title, priority, body);
          }} className='user-btn btn-complete'>
          <IoCheckmarkDoneSharp className="" size={30} />Complete
        </div>
        <div onClick={()=>{
          openPopup()
          updateData(updateId)
          }} className="user-btn btn-edit">
          <FiEdit size={25} />Edit
        </div>
      </div>
    
    </div>
  )
}

