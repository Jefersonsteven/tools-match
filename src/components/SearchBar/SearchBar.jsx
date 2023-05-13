import React from 'react';

export default function SearchBar(props) {
  const { title, onTitleChange } = props;

  const handleTitleChange = (event) => {
    onTitleChange(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar herramienta..."
        value={title}
        onChange={handleTitleChange}
      />
    </div>
  );
}