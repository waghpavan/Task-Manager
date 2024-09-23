import React from 'react'
import "./Card.css";

function Card({ title, body, priority, complete }) {
    return (
        <div>
            <div className='card'>
                <div className='card-centent'>
                    <div className='d-flex justify-content-between'>
                        <span>{priority}</span>
                        <span>{complete}</span>
                    </div>
                    <h2 className='card-title'>{title}</h2>
                    <hr />
                    <p>{body}...</p>
                </div>
            </div>
        </div>
    )
}

export default Card
