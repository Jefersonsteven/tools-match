import React from 'react';

export default function SearchBar(props) {
  const { name, onNameChange } = props;

  const handleNameChange = (event) => {
    onNameChange(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar herramienta..."
        value={name}
        onChange={handleNameChange}
      />
    </div>
  );
}