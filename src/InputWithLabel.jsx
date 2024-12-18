import React, { useEffect, useRef } from 'react';

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

export default InputWithLabel;
