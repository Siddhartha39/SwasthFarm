import React, { useState } from 'react';
import { useFarm } from '@/context/FarmContext';
import { Animal } from '@/types';
import { X, Syringe } from 'lucide-react';

interface LogVaccineModalProps {
  isOpen: boolean;
  onClose: () => void;
  animal: Animal;
}

export const LogVaccineModal: React.FC<LogVaccineModalProps> = ({ isOpen, onClose, animal }) => {
  const { addVaccination } = useFarm();

  const [vaccineName, setVaccineName] = useState('Foot & Mouth Disease (FMD) Booster');
  const [targetDisease, setTargetDisease] = useState('FMD Virus');
  const [dose, setDose] = useState('2 ml Subcutaneous');
  const [nextDueDate, setNextDueDate] = useState('2027-04-15');
  const [status, setStatus] = useState<'completed' | 'upcoming'>('completed');
  const [veterinarian, setVeterinarian] = useState('Dr. R. Verma');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];

    addVaccination({
      animalId: animal.id,
      animalTag: animal.tagId,
      vaccineName,
      targetDisease,
      dose,
      administeredDate: status === 'completed' ? today : undefined,
      nextDueDate,
      status,
      veterinarian: veterinarian || undefined,
      notes
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-gray-100 p-6">
        
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <Syringe className="w-5 h-5 text-purple-700" />
            <h2 className="text-base font-bold text-gray-900">Record Vaccine for {animal.tagId}</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 mt-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Vaccine Name *</label>
            <input
              type="text"
              required
              value={vaccineName}
              onChange={e => setVaccineName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Target Disease</label>
            <input
              type="text"
              required
              value={targetDisease}
              onChange={e => setTargetDisease(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Dose & Route</label>
              <input
                type="text"
                value={dose}
                onChange={e => setDose(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Next Due Date *</label>
              <input
                type="date"
                required
                value={nextDueDate}
                onChange={e => setNextDueDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
              >
                <option value="completed">Administered Today</option>
                <option value="upcoming">Scheduled / Upcoming</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Attending Vet</label>
              <input
                type="text"
                value={veterinarian}
                onChange={e => setVeterinarian(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Batch / Serial Number & Notes</label>
            <textarea
              rows={2}
              placeholder="e.g. Batch #FMD-B2026-991. Cold chain verified at 4°C."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex items-center justify-end space-x-2 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 shadow-sm"
            >
              Save Vaccine Record
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
