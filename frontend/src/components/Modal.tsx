import React, { useState } from 'react';
import './modal.css';

const ConfirmationModal = ({ show, onClose }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = () => {
        onSubmit(inputValue);
        setInputValue('');
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Confirm Order</h2>
                <p>Are you sure you want to submit this order?</p>
                <div className="modal-buttons">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;