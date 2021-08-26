import React from 'react';

function Button(props) {
    return <button 
    onClick={props.function}
    className={`mb-5 bg-green-700 p-5 text-white font-semibold rounded shadow min-w-full`}>
      {props.text}
  </button>
}

export default Button;