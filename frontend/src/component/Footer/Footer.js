import React from 'react'

function footer() {
    const myStyles = {
        "margin-top" : "100px",
        "margin-bottom" : "20px",
        "width" : "80%"
   };
  return (
    <div>
      <div style={myStyles} className='container-fluid d-flex justify-content-center '>
        <h4 style={{color:"red"}}>ToDo</h4><p className='m-0'>&copy;THECODEBYPAVAN</p>
      </div>
    </div>
  )
}

export default footer
