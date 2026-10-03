import React, { useState } from 'react';
import { useFarm } from '@/context/FarmContext';
import { Animal } from '@/types';
import { X, Syringe, ShieldCheck } from 'lucide-react';

interface LogVaccineModalProps {
  isOpen: boolean;
  onClose: () => void;
  animal: Animal;
}

const COMMON_VACCINES = [
  { name: 'Foot & Mouth Disease (FMD) Booster', disease: 'FMD Virus', dose: '2 ml Subcutaneous' },
  { name: 'Hemorrhagic Septicemia (HS)', disease: 'Pasteurella multocida', dose: '3 ml Intramuscular' },
  { name: 'Black Quarter (BQ)', disease: 'Clostridium chauvoei', dose: '2 ml Subcutaneous' },
  { name: 'Brucellosis (Strain 19 / Cotton 19)', disease: 'Brucella abortus', dose: '2 ml Subcutaneous' },
  { name: 'PPR (Peste des Petits Ruminants)', disease: 'PPR Morbillivirus', dose: '1 ml Subcutaneous' },
  { name: 'Enterotoxemia (ET) Vaccine', disease: 'Clostridium perfringens type D', dose: '2 ml Subcutaneous' },
  { name: 'Ranikhet / Newcastle (NDV-LaSota)', disease: 'Newcastle Disease Virus', dose: 'Eye drop / Drinking water' },
  { name: 'Broad-Spectrum Deworming (Albendazole / Ivermectin)', disease: 'Internal Nematodes & Flukes', dose: 'Oral Drench / 1 ml per 50 kg' }
];

export const LogVaccineModal: React.FC<LogVaccineModalProps> = ({ isOpen, onClose, animal }) => {
  const { addVaccination, animals } = useFarm();

  const [selectedAnimalId, setSelectedAnimalId] = useState(animal.id);
  const currentAnimal = animals.find(a => a.id === selectedAnimalId) || animal;

  const todayStr = new Date().toISOString().split('T')[0];

  const [status, setStatus] = useState<'completed' | 'upcoming'>('completed');
  const [vaccineName, setVaccineName] = useState(COMMON_VACCINES[0].name);
  const [targetDisease, setTargetDisease] = useState(COMMON_VACCINES[0].disease);
  const [dose, setDose] = useState(COMMON_VACCINES[0].dose);
  const [administeredDate, setAdministeredDate] = useState(todayStr);
  const [nextDueDate, setNextDueDate] = useState(
    new Date(Date.now() + 180 * 24 * 3600 * 1000).toISOString().split('T')[0]
  );
  const [veterinarian, setVeterinarian] = useState('Dr. Sarah Verma, DVM');
  const [batchNo, setBatchNo] = useState('VAC-2026-X8');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSelectPreset = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = COMMON_VACCINES.find(v => v.name === e.target.value);
    if (selected) {
      setVaccineName(selected.name);
      setTargetDisease(selected.disease);
      setDose(selected.dose);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addVaccination({
      animalId: currentAnimal.id,
      animalTag: currentAnimal.tagId,
      vaccineName,
      targetDisease,
      dose,
      administeredDate: status === 'completed' ? administeredDate : undefined,
      nextDueDate,
      status,
      veterinarian: veterinarian.trim() || undefined,
      notes: notes.trim() ? `${notes.trim()} (Batch: ${batchNo})` : `Batch: ${batchNo}`
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full border border-gray-100 p-6 sm:p-7">
        
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <Syringe className="w-5 h-5 text-purple-700" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-gray-900">Record Vaccine / Deworming</h2>
              <p className="text-[11px] text-gray-500">Maintain herd immunization protocols and due dates</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 mt-4">
          
          {/* Target Animal Selector */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Target Animal *</label>
            <select
              value={selectedAnimalId}
              onChange={e => setSelectedAnimalId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:ring-2 focus:ring-purple-500"
            >
              {animals.map(a => (
                <option key={a.id} value={a.id}>
                  {a.tagId} ({a.name}) • {a.species.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Preset Selector */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Standard National Vaccine Preset</label>
            <select
              onChange={handleSelectPreset}
              className="w-full px-3 py-2 border border-purple-200 bg-purple-50/50 rounded-xl text-xs font-bold text-purple-900 focus:ring-2 focus:ring-purple-500"
            >
              {COMMON_VACCINES.map(v => (
                <option key={v.name} value={v.name}>
                  {v.name} ({v.disease})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Vaccine Name *</label>
              <input
                type="text"
                required
                value={vaccineName}
                onChange={e => setVaccineName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Target Pathogen</label>
              <input
                type="text"
                required
                value={targetDisease}
                onChange={e => setTargetDisease(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Status Selection */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Administration Status</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setStatus('completed')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                  status === 'completed'
                    ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                    : 'bg-gray-50 text-gray-700 border-gray-200'
                }`}
              >
                ✓ Already Administered
              </button>
              <button
                type="button"
                onClick={() => setStatus('upcoming')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                  status === 'upcoming'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-gray-50 text-gray-700 border-gray-200'
                }`}
              >
                📅 Upcoming / Scheduled
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {status === 'completed' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Date Given *</label>
                <input
                  type="date"
                  required
                  value={administeredDate}
                  onChange={e => setAdministeredDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}
            <div className={status === 'upcoming' ? 'col-span-2' : ''}>
              <label className="block text-xs font-bold text-gray-700 mb-1">Next Due / Booster Date *</label>
              <input
                type="date"
                required
                value={nextDueDate}
                onChange={e => setNextDueDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold text-purple-900 focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Dose & Route</label>
              <input
                type="text"
                value={dose}
                onChange={e => setDose(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Batch / Lot Number</label>
              <input
                type="text"
                value={batchNo}
                onChange={e => setBatchNo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Attending Veterinarian / Para-vet</label>
            <input
              type="text"
              value={veterinarian}
              onChange={e => setVeterinarian(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-600/20 transition-all"
            >
              Save Vaccination Record
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
