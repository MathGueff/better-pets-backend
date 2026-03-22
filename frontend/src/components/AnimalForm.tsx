import React from 'react';
import type { Animal, AnimalFormData } from '../types';

interface AnimalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  editingAnimal: Animal | null;
  formData: AnimalFormData;
  setFormData: (data: AnimalFormData) => void;
  submitting: boolean;
}

const AnimalForm: React.FC<AnimalFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingAnimal,
  formData,
  setFormData,
  submitting
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">
          {editingAnimal ? 'Atualizar Pet' : 'Novo Amiguinho'}
        </h2>
        
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label className="form-label">Nome</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="form-input"
              placeholder="Como ele se chama?"
            />
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Idade</label>
              <input
                type="number"
                required
                min="0"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Espécie</label>
              <input
                type="text"
                value={formData.breed}
                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                className="form-input"
                placeholder="Ex: Tigre"
              />
            </div>
          </div>
          
          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn-cancel"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-submit"
            >
              {submitting ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnimalForm;
