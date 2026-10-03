import React, { useState } from 'react';
import { useFarm } from '@/context/FarmContext';
import { Animal } from '@/types';
import { X, TrendingUp, Calendar, AlertTriangle } from 'lucide-react';

interface LogProductionModalProps {
  isOpen: boolean;
  onClose: () => void;
  animal: Animal;
}

export const LogProductionModal: React.FC<LogProductionModalProps> = ({ isOpen, onClose, animal }) => {
  const { addProductionRecord, animals } = useFarm();

  const [selectedAnimalId, setSelectedAnimalId] = useState(animal.id);
  const currentAnimal = animals.find(a => a.id === selectedAnimalId) || animal;

  const isDairy = currentAnimal.productionType === 'milk';
  const isPoultry = currentAnimal.productionType === 'eggs';

  const todayStr = new Date().toISOString().split('T')[0];
  const [logDate, setLogDate] = useState(todayStr);

  const [morningMilk, setMorningMilk] = useState(
    isDairy ? (currentAnimal.currentDailyProduction * 0.52).toFixed(1) : '9.0'
  );
  const [eveningMilk, setEveningMilk] = useState(
    isDairy ? (currentAnimal.currentDailyProduction * 0.48).toFixed(1) : '8.5'
  );
  const [eggCount, setEggCount] = useState(
    isPoultry ? Math.round(currentAnimal.currentDailyProduction).toString() : '460'
  );
  const [fatPct, setFatPct] = useState(currentAnimal.species === 'buffalo' ? '7.5' : '4.2');
  const [qualityGrade, setQualityGrade] = useState('Grade A');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const mMilk = parseFloat(morningMilk) || 0;
  const eMilk = parseFloat(eveningMilk) || 0;
  const totalMilk = +(mMilk + eMilk).toFixed(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const eggs = isPoultry ? parseInt(eggCount) || 0 : undefined;

    addProductionRecord({
      date: logDate,
      animalId: currentAnimal.id,
      animalTag: currentAnimal.tagId,
      species: currentAnimal.species,
      morningMilkLiters: isDairy ? mMilk : undefined,
      eveningMilkLiters: isDairy ? eMilk : undefined,
      totalMilkLiters: isDairy ? totalMilk : undefined,
      eggCount: eggs,
      fatPercentage: isDairy ? parseFloat(fatPct) : undefined,
      qualityGrade,
      notes: notes.trim() || undefined
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full border border-gray-100 p-6 sm:p-7">
        
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-gray-900">Log Yield Record</h2>
              <p className="text-[11px] text-gray-500">Record daily milk output or flock egg counts</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 mt-4">
          
          {/* Target Animal Selector */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Target Livestock Animal</label>
            <select
              value={selectedAnimalId}
              onChange={e => setSelectedAnimalId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:ring-2 focus:ring-sky-500"
            >
              {animals.map(a => (
                <option key={a.id} value={a.id}>
                  {a.tagId} ({a.name}) • {a.species.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Production Date *</label>
            <div className="relative">
              <input
                type="date"
                required
                value={logDate}
                onChange={e => setLogDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          {isDairy ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Morning Milking (L) *</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    required
                    value={morningMilk}
                    onChange={e => setMorningMilk(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Evening Milking (L) *</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    required
                    value={eveningMilk}
                    onChange={e => setEveningMilk(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="p-3 bg-sky-50 rounded-xl text-xs font-bold text-sky-900 flex justify-between items-center border border-sky-100">
                <span>Total Daily Milk:</span>
                <span className="text-base text-sky-800">{totalMilk} Liters</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Butterfat %</label>
                  <input
                    type="number"
                    step="0.1"
                    value={fatPct}
                    onChange={e => setFatPct(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Quality Grade</label>
                  <select
                    value={qualityGrade}
                    onChange={e => setQualityGrade(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Grade A Premium">Grade A Premium</option>
                    <option value="Grade A">Grade A Standard</option>
                    <option value="Grade B">Grade B</option>
                    <option value="Sub-standard">Sub-standard (Under Check)</option>
                  </select>
                </div>
              </div>
            </>
          ) : isPoultry ? (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Total Eggs Collected *</label>
              <input
                type="number"
                required
                value={eggCount}
                onChange={e => setEggCount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-sky-500"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Estimated Daily Weight Gain (kg/day)</label>
              <input
                type="number"
                step="0.05"
                defaultValue="0.2"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-sky-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Milking / Quality Notes</label>
            <input
              type="text"
              placeholder="e.g. Normal milk consistency, lactometer reading 30"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-sky-500"
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
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 shadow-md shadow-sky-600/20 transition-all"
            >
              Save Daily Yield
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
