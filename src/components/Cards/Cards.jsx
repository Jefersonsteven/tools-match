import Card from './Card.jsx';

const tools = [
  { title: 'Martillo', description: 'Herramienta de carpintería', imageUrl: 'https://example.com/martillo.jpg' },
  { title: 'Sierra circular', description: 'Herramienta de carpintería', imageUrl: 'https://example.com/sierra-circular.jpg' },
  { title: 'Taladro', description: 'Herramienta de electricidad', imageUrl: 'https://example.com/taladro.jpg' },
  { title: 'Amoladora', description: 'Herramienta de electricidad', imageUrl: 'https://example.com/amoladora.jpg' },
];

const Cards = () => {
  return (
    <div>
      <h1>Herramientas</h1>
      <div style={{ display: 'flex', gap: '16px' }}>
        {tools.map(tool => (
          <Card
            key={tool.title}
            title={tool.title}
            description={tool.description}
            imageUrl={tool.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Cards;
