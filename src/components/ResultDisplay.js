import React from 'react';

const ResultDisplay = ({ result, error }) => {
    return (
        <div>
            {result !== null && <h3 className="calculator-result">Result: {result}</h3>}
            {error && <h3 className="calculator-error">{error}</h3>}
        </div>
    );
};

export default ResultDisplay;
