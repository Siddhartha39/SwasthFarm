import React, { useState } from 'react';
import { useFarm } from '@/context/FarmContext';
import { Animal } from '@/types';
import { X, TrendingUp } from 'lucide-react';

interface LogProductionModalProps {
  isOpen: boolean;
  onClose: () => void;
  animal: Animal;
}

export const LogProductionModal: React.FC<LogProductionModalProps> = ({ isOpen, onClose, animal }) => {
  const { addProductionRecord } = useFarm();

  const isDairy = animal.productionType === 'milk';
  const isPoultry = animal.productionType === 'eggs';

  const [morningMilk, setMorningMilk] = useState('9.0');
  const [eveningMilk, setEveningMilk] = useState('8.5');
  const [eggCount, setEggCount] = useState('460');
  const [fatPct, setFatPct] = useState('4.2');
  const [qualityGrade, setQualityGrade] = useState('Grade A');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const mMilk = parseFloat(morningMilk) || 0;
    const eMilk = parseFloat(eveningMilk) || 0;
    const totalMilk = isDairy ? mMilk + eMilk : undefined;
    const eggs = isPoultry ? parseInt(eggCount) || 0 : undefined;

    addProductionRecord({
      animalId: animal.id,
      animalTag: animal.tagId,
      species: animal.species,
      morningMilkLiters: isDairy ? mMilk : undefined,
      eveningMilkLiters: isDairy ? eMilk : undefined,
      totalMilkLiters: totalMilk,
      eggCount: eggs,
      fatPercentage: isDairy ? parseFloat(fatPct) : undefined,
      qualityGrade,
      notes
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-gray-100 p-6">
        
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-sky-600" />
            <h2 className="text-base font-bold text-gray-900">Log Daily Yield for {animal.tagId}</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 mt-4">
          {isDairy ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Morning Milk (L) *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={morningMilk}
                    onChange={e => setMorningMilk(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Evening Milk (L) *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={eveningMilk}
                    onChange={e => setEveningMilk(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="p-2.5 bg-sky-50 rounded-xl text-xs font-bold text-sky-900 flex justify-between">
                <span>Calculated Daily Total:</span>
                <span>{((parseFloat(morningMilk) || 0) + (parseFloat(eveningMilk) || 0)).toFixed(1)} Liters</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Butterfat %</label>
                  <input
                    type="number"
                    step="0.1"
                    value={fatPct}
                    onChange={e => setFatPct(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Quality Grade</label>
                  <select
                    value={qualityGrade}
                    onChange={e => setQualityGrade(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
                  >
                    <option value="Grade A">Grade A (Premium)</option>
                    <option value="Grade B">Grade B (Standard)</option>
                    <option value="Sub-standard">Sub-standard</option>
                  </select>
                </div>
              </div>
            </>
          ) : isPoultry ? (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Daily Eggs Collected *</label>
              <input
                type="number"
                required
                value={eggCount}
                onChange={e => setEggCount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-green-500"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Meat ADG (kg/day)</label>
              <input
                type="number"
                step="0.05"
                defaultValue="0.2"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Milking / Production Notes</label>
            <textarea
              rows={2}
              placeholder="e.g. Milk clean; normal let-down speed; no mastitis clotting."
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
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 shadow-sm"
            >
              Save Production Record
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
