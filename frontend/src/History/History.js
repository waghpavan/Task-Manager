import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from './Card';

function History() {
    let userId = sessionStorage.getItem("Id");
    
    const [Array, setArray] = useState([]);

    useEffect(() => {
        if(userId) {
            const fetch = async() => {
                await axios.get(`${window.location.origin}/api/v3/history/${userId}`).then((res) => {
                    setArray(res.data.history)
                    console.log(res.data);
                })
            }
            fetch()
        }
    },[])
  return (
      <div className='todo-body'>
        <div className='container-fluid '>
          {Array && <div className='card-container high row p-2'>
            {
              Array && Array.map((item) => (

                <div className='card-cover col-lg-3 mx-5 my-2'>
                    <Card title={item.title} priority={item.priority} body={item.body} complete={item.createdAt.substring(0, 10)}/>
                </div>
              ))
            }
          </div>
          }
        </div>
    </div>
  )
}

export default History
