import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';  

const InputWithLabel = ({ id, value, onInputChange, type = "text", children }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
        ref={inputRef}
      />
    </>
  );
};


InputWithLabel.propTypes = {
  id: PropTypes.string.isRequired,            
  value: PropTypes.string.isRequired,         
  onInputChange: PropTypes.func.isRequired,   
  type: PropTypes.string,                     
  children: PropTypes.node.isRequired,        
};

export default InputWithLabel;
