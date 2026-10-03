import React, { useState } from 'react';
import { useFarm } from '@/context/FarmContext';
import { Animal } from '@/types';
import { X, Wheat, Calculator } from 'lucide-react';

interface LogFeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  animal: Animal;
}

export const LogFeedModal: React.FC<LogFeedModalProps> = ({ isOpen, onClose, animal }) => {
  const { addFeedRecord, animals } = useFarm();

  const [selectedAnimalId, setSelectedAnimalId] = useState(animal.id);
  const currentAnimal = animals.find(a => a.id === selectedAnimalId) || animal;

  const todayStr = new Date().toISOString().split('T')[0];
  const [logDate, setLogDate] = useState(todayStr);

  const [feedType, setFeedType] = useState('Green Maize Silage + Dairy Concentrate (20% CP)');
  const [quantityKg, setQuantityKg] = useState(currentAnimal.dailyFeedKg.toString());
  const [frequency, setFrequency] = useState('Twice Daily (Morning / Evening)');
  const [waterLiters, setWaterLiters] = useState(currentAnimal.dailyWaterLiters.toString());
  const [feedCost, setFeedCost] = useState((Math.round(currentAnimal.dailyFeedKg * 9.5)).toString());
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addFeedRecord({
      date: logDate,
      animalId: currentAnimal.id,
      animalTag: currentAnimal.tagId,
      feedType,
      quantityKg: parseFloat(quantityKg) || 1,
      frequency,
      waterConsumptionLiters: parseFloat(waterLiters) || 10,
      feedCostInr: parseFloat(feedCost) || 0,
      notes: notes.trim() || undefined
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full border border-gray-100 p-6 sm:p-7">
        
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Wheat className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-gray-900">Log Feed & Hydration</h2>
              <p className="text-[11px] text-gray-500">Record daily dry matter, green fodder, and water volume</p>
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
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:ring-2 focus:ring-amber-500"
            >
              {animals.map(a => (
                <option key={a.id} value={a.id}>
                  {a.tagId} ({a.name}) • {a.species.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Feeding Date *</label>
            <input
              type="date"
              required
              value={logDate}
              onChange={e => setLogDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Feed Ration / Formulation *</label>
            <input
              type="text"
              required
              value={feedType}
              onChange={e => setFeedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Feed Quantity (kg) *</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                required
                value={quantityKg}
                onChange={e => {
                  setQuantityKg(e.target.value);
                  setFeedCost((Math.round((parseFloat(e.target.value) || 0) * 9.5)).toString());
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Water Consumed (Liters) *</label>
              <input
                type="number"
                step="0.5"
                min="0.1"
                required
                value={waterLiters}
                onChange={e => setWaterLiters(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Feeding Routine</label>
              <input
                type="text"
                value={frequency}
                onChange={e => setFrequency(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Estimated Cost (₹ INR)</label>
              <input
                type="number"
                value={feedCost}
                onChange={e => setFeedCost(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Feed Ingestion / Trough Notes</label>
            <input
              type="text"
              placeholder="e.g. Added 50g mineral mixture and yeast buffer"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500"
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
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 shadow-md shadow-amber-600/20 transition-all"
            >
              Save Feed Record
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
