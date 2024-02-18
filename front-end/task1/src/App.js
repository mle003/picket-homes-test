import { hot } from 'react-hot-loader/root';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [value, setValue] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(isError)
    const isValidNumber = /^\d+$/.test(value);

    if (isValidNumber) {
      setIsError(false);
      alert(`You entered a valid integer: ${value}`);
    } else {
      setIsError(true);
      vibrateInput();
    }
  };

  const vibrateInput = () => {
    const inputElement = document.getElementById('inputField');

    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        inputElement.classList.add('shake');
      }, i * 100);
      setTimeout(() => {
        inputElement.classList.remove('shake');
      }, i * 100 + 100);
    }
  };

  useEffect(() => {
    if (isError) {
      vibrateInput();
    }
  }, [isError]);

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <input
        type="text"
        id="inputField"
        value={value}
        onChange={handleChange}
        style={{ border: isError ? '2px solid red' : '2px solid blue' }}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default hot(App);
