import React, { useState, useEffect} from 'react';
import './PopupForm.css'; // Import CSS for styling

const PopupForm = ({ isOpen, onClose, updationArray, update}) => {
    
    
    const [formData, setFormData] = useState(updationArray);

    useEffect(() => {
        setFormData(updationArray);
    }, [updationArray]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        update(formData);
        onClose();
    };
    
    if (!isOpen) return (<></>);
    
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <form>
                    <div className="form-group">
                        <label htmlFor="textField">TITLE :</label>
                        <input type="text" id="textField" name="title" value={formData.title} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="selectField">PRIORITY :</label>
                        <select id="selectField" name="priority" value={formData.priority} onChange={handleChange}>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="textAreaField">BODY :</label>
                        <textarea id="textAreaField" name="body" value={formData.body} onChange={handleChange} />
                    </div>

                    <div className="form-actions">
                        <button onClick={handleSubmit} type="submit">Done</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PopupForm;
