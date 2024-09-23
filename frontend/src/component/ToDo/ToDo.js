import React, { useState, useEffect } from 'react'
import { RiArrowUpWideFill } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import "./ToDo.css";
import ToDoCard from './ToDoCard';
import PopupForm from '../PopupForm/PopupForm';

let updationArray = [];
function ToDo() {
  let userId = sessionStorage.getItem("Id");

  const [Inputs, setInputs] = useState({
    title: "", body:
      "", priority: ""
  });
  const [Array, setArray] = useState([]);


  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value })
  }

  const showFull = () => {
    document.getElementById("textarea-body").style = "display : block";
    document.getElementById("priority").style = "display : block";
  }

  const closeFull = () => {
    document.getElementById("textarea-body").style = "display : none";
    document.getElementById("priority").style = "display : none";
  }

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);


  const handleAddTask = async () => {
    if (Inputs.title === "" || Inputs.body === "") {
      toast.error("Title or Body should not Empty...")
      return;
    }
    if (Inputs.priority === "priority" || Inputs.priority === "") {
      toast.error("Select Priority...")
      return;
    }
    else {
      if (userId) {
        try {
          await axios.post(`${window.location.origin}/api/v2/addTask`, { title: Inputs.title, body: Inputs.body, priority: Inputs.priority, id: userId }).then((res) => {
            if (!Array) {
              window.location.reload();
            }
            setArray([...Array, res.data.list]);
            toast.success("Your Task is Added Succussfully...")
            setInputs({ title: "", body: "", priority: Inputs.priority })
          })
        }
        catch (error) { }
      }
      else {
        toast.success("Your Task is Added Succussfully...")
        toast.error("Your Task is not Saved | Please SignUp")
      }
    }
  }

  const createHistory = async (title, priority, body) => {
    const data = {
      title: title,
      body: body,
      priority: priority,
      id: userId
    };

    try {
      const response = await axios.post(`${window.location.origin}/api/v3/addHistory`, data);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Request failed:', error);
    }
  }

  const del = async (id, title, priority, body) => {

    await axios.delete(`${window.location.origin}/api/v2/deleteTask/${id}`, { data: { id: userId } }).then((response) => {
      toast.success(response.data.message)
    })

    await createHistory(title, priority, body);
  }

  const updateData = (value) => {
    updationArray = Array[value];
  }

  const update = async (data) => {
    try {
      await axios.put(`${window.location.origin}/api/v2/updateTask/`, data).then((response) => {
        toast.success("Updated Task...")
      })
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if (userId) {
      const fetch = async () => {
        await axios.get(`${window.location.origin}/api/v2/getTask/${userId}`).then((response) => {
          setArray(response.data.list)
        })
      }
      fetch();
    }
  }, [handleAddTask, del, update, userId])

  return (
    <div className='todo'>
      <ToastContainer />
      <div className='todo-main container d-flex justify-content-center align-items-center my-4 flex-column'>
        <div className='d-flex flex-column todo-inputs-div p-1'>

          <input type='text' placeholder='TITLE' value={Inputs.title} onFocus={showFull} name='title' onChange={handleInputs} />

          <select name='priority' id="priority" onChange={handleInputs}>
            <option value="priority">PRIORITY</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <textarea rows={4} placeholder='BODY' value={Inputs.body} id="textarea-body" name='body' onChange={handleInputs} />
          <div className='d-flex justify-content-between px-4 align-items-center'>
            <button className="button-addTask" onClick={handleAddTask}>Add Task</button>
            <button onClick={closeFull} className='btn btn-primary'><RiArrowUpWideFill size={20} />Close</button>
          </div>
        </div>
      </div>
      <div className='todo-body'>
        <div className='container-fluid '>
          {Array && <div className='card-container high row p-2'>
            {
              Array && Array.map((item, index) => (
                <div className='card-cover col-lg-3 mx-5 my-2'>
                  <ToDoCard title={item.title} body={item.body} id={item._id} priority={item.priority} openPopup={openPopup} delId={() => del(item._id, item.title, item.priority, item.body)} updateId={index} updateData={updateData} />
                </div>
              ))
            }
          </div>
          }
        </div>
        <div>
          <PopupForm isOpen={isPopupOpen} onClose={closePopup} updationArray={updationArray} update={update} />
        </div>
      </div>
    </div>
  )
}

export default ToDo


/*


  const arrHigh = Array.filter((item) => {
    if (item.priority == "High") {
      return item;
    }
  })

  const arrMedium = Array.filter((item) => {
    if (item.priority == "Medium") {
      return item;
    }
  })

  const arrLow = Array.filter((item) => {
    if (item.priority == "Low") {
      return item;
    }
  })


<div className='container-fluid '>
          {
          arrHigh.length > 0 && <div className='card-container high row p-2'>
            {
              arrHigh && arrHigh.map((item, index) => (
                <div className='card-cover col-lg-3 mx-5 my-2'>
                  <ToDoCard title={item.title} body={item.body} priority={item.priority} />
                </div>
              ))
            }
          </div>
          }
          {
          arrMedium.length > 0 && 
          <div className='card-container medium row p-2'>
            {
              arrMedium && arrMedium.map((item, index) => (
                <div className='card-cover col-lg-3 mx-5 my-2'>
                  <ToDoCard title={item.title} body={item.body} priority={item.priority} />
                </div>
              ))
            }
          </div>
          }
          {
          arrLow.length > 0 && 
          <div className='card-container low row p-2'>
            {
              arrLow && arrLow.map((item, index) => (
                <div className='card-cover col-lg-3 mx-5 my-2'>
                  <ToDoCard title={item.title} body={item.body} priority={item.priority} />
                </div>
              ))
            }
          </div>
          }
        </div>

*/
