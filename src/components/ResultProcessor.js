import React, { useState } from 'react';
import InputField from './InputField';
import ResultDisplay from './ResultDisplay';
import { processInput } from '../utils/InputProcessor'; 

const ResultProcessor = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleCalculate = () => {
        try {
            const sum = processInput(input.split('\\n')); 
            setResult(sum);
            setError(null);
        } catch (e) {
            setError(e.message);
            setResult(null);
        }
    };

    return (
        <div className="calculator-card">
            <h2 className="calculator-title">String Calculator</h2>
            <InputField value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleCalculate} className="calculator-button">Calculate</button>
            <ResultDisplay result={result} error={error} />
        </div>
    );
};

export default ResultProcessor;
