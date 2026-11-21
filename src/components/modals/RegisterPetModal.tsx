import React, { useState } from 'react';
import { Pet } from '../../types';

interface RegisterPetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPet: (pet: Pet) => void;
}

export const RegisterPetModal: React.FC<RegisterPetModalProps> = ({
  isOpen,
  onClose,
  onAddPet,
}) => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('Perro');
  const [type, setType] = useState<'Perrita' | 'Perro' | 'Gatita' | 'Gato'>('Perrita');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'female' | 'male'>('female');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Default pet image matching species
    const defaultPhoto = species === 'Gato'
      ? 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80'
      : 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80';

    const newPet: Pet = {
      id: `pet-${Date.now()}`,
      name: name.trim(),
      species,
      type,
      breed: breed.trim() || 'Mestizo',
      age: age.trim() || '1 año',
      gender,
      statusText: 'Salud Óptima',
      statusType: 'optimal',
      photo: defaultPhoto,
      weight: '12 kg',
      nextEvent: 'Chequeo inicial recomendado'
    };

    onAddPet(newPet);
    setName('');
    setBreed('');
    setAge('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-surface-container-lowest rounded-t-[28px] sm:rounded-[24px] p-space-lg shadow-2xl flex flex-col gap-space-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-1 border-b border-surface-container">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[24px]">pets</span>
            <h2 className="font-headline-md text-headline-md text-on-surface">Registrar nueva mascota</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-outline hover:bg-surface-container active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
              Nombre de la mascota *
            </label>
            <input
              type="text"
              required
              placeholder="Ej. Coco, Luna, Milo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 px-4 rounded-xl bg-surface-container-low border border-outline-variant/60 focus:border-primary focus:bg-white text-on-surface font-body-md outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-space-sm">
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                Tipo
              </label>
              <select
                value={type}
                onChange={(e) => {
                  const val = e.target.value as any;
                  setType(val);
                  setSpecies(val.includes('Gat') ? 'Gato' : 'Perro');
                  setGender(val.includes('ita') ? 'female' : 'male');
                }}
                className="h-12 px-3 rounded-xl bg-surface-container-low border border-outline-variant/60 focus:border-primary text-on-surface font-body-md outline-none"
              >
                <option value="Perrita">Perrita (Hembra)</option>
                <option value="Perro">Perro (Macho)</option>
                <option value="Gatita">Gatita (Hembra)</option>
                <option value="Gato">Gato (Macho)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                Edad
              </label>
              <input
                type="text"
                placeholder="Ej. 2 años, 6 meses"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="h-12 px-3 rounded-xl bg-surface-container-low border border-outline-variant/60 focus:border-primary text-on-surface font-body-md outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
              Raza
            </label>
            <input
              type="text"
              placeholder="Ej. Golden Retriever, Criollo, Siamés"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              className="h-12 px-4 rounded-xl bg-surface-container-low border border-outline-variant/60 focus:border-primary text-on-surface font-body-md outline-none"
            />
          </div>

          <div className="p-space-sm bg-secondary-container/30 rounded-xl flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-primary text-[20px]">verified_user</span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Podrás vincular su cartilla de vacunación y agendar citas inmediatamente.
            </p>
          </div>

          <div className="flex items-center gap-space-sm pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-12 rounded-xl bg-surface-container text-on-surface font-label-md hover:bg-surface-container-high transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 h-12 rounded-xl bg-primary-container text-on-primary font-label-lg shadow-md active:scale-95 transition-all flex items-center justify-center gap-1"
            >
              <span>Guardar mascota</span>
              <span className="material-symbols-outlined text-[18px]">check</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
