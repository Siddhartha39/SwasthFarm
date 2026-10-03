import React, { useState } from 'react';
import { useFarm } from '@/context/FarmContext';
import { Animal } from '@/types';
import { X, Wheat } from 'lucide-react';

interface LogFeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  animal: Animal;
}

export const LogFeedModal: React.FC<LogFeedModalProps> = ({ isOpen, onClose, animal }) => {
  const { addFeedRecord } = useFarm();

  const [feedType, setFeedType] = useState('Silage + Balanced Concentrate');
  const [quantityKg, setQuantityKg] = useState(animal.dailyFeedKg.toString());
  const [frequency, setFrequency] = useState('Twice Daily (Morning/Evening)');
  const [waterLiters, setWaterLiters] = useState(animal.dailyWaterLiters.toString());
  const [feedCost, setFeedCost] = useState('180');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addFeedRecord({
      animalId: animal.id,
      animalTag: animal.tagId,
      feedType,
      quantityKg: parseFloat(quantityKg) || 1,
      frequency,
      waterConsumptionLiters: parseFloat(waterLiters) || 10,
      feedCostInr: parseFloat(feedCost) || 0,
      notes
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-gray-100 p-6">
        
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <Wheat className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-bold text-gray-900">Log Feed & Water for {animal.tagId}</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 mt-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Feed Type / Ration</label>
            <input
              type="text"
              required
              value={feedType}
              onChange={e => setFeedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Feed Quantity (kg) *</label>
              <input
                type="number"
                step="0.1"
                required
                value={quantityKg}
                onChange={e => setQuantityKg(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Water Consumption (L) *</label>
              <input
                type="number"
                step="0.5"
                required
                value={waterLiters}
                onChange={e => setWaterLiters(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Feeding Frequency</label>
              <input
                type="text"
                value={frequency}
                onChange={e => setFrequency(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Daily Feed Cost (₹)</label>
              <input
                type="number"
                value={feedCost}
                onChange={e => setFeedCost(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Observations / Leftover</label>
            <textarea
              rows={2}
              placeholder="e.g. Cleared all feed; no refusal noted."
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
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 shadow-sm"
            >
              Save Feed Record
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
