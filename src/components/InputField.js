import React from 'react';

const InputField = ({ value, onChange }) => {
    return (
        <textarea
            value={value}
            onChange={onChange}
            placeholder="Enter numbers"
            className="calculator-input"
        />
    );
};

export default InputField;
