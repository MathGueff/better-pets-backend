import React from 'react';
import type { Animal } from '../types';

interface AnimalCardProps {
  animal: Animal;
  onEdit: (animal: Animal) => void;
  onDelete: (id: string) => void;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal, onEdit, onDelete }) => {
  return (
    <div className="animal-card">
      <div>
        <div className="card-header">
          <h3 className="animal-name">{animal.name}</h3>
          <span className="age-badge">
            {animal.age} anos
          </span>
        </div>
        <p className="animal-breed">
          {animal.breed || 'Espécie não informada'}
        </p>
      </div>
      
      <div className="card-actions">
        <button 
          onClick={() => onEdit(animal)}
          className="btn-outline"
        >
          Editar
        </button>
        <button 
          onClick={() => onDelete(animal._id)}
          className="btn-danger"
        >
          Remover
        </button>
      </div>
    </div>
  );
};

export default AnimalCard;
