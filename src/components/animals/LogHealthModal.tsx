import React, { useState } from 'react';
import { useFarm } from '@/context/FarmContext';
import { Animal } from '@/types';
import { X, HeartPulse } from 'lucide-react';

interface LogHealthModalProps {
  isOpen: boolean;
  onClose: () => void;
  animal: Animal;
}

export const LogHealthModal: React.FC<LogHealthModalProps> = ({ isOpen, onClose, animal }) => {
  const { addHealthRecord } = useFarm();

  const [temperature, setTemperature] = useState('38.6');
  const [symptomsInput, setSymptomsInput] = useState('');
  const [activityLevel, setActivityLevel] = useState<'normal' | 'low' | 'lethargic' | 'hyperactive'>('normal');
  const [appetite, setAppetite] = useState<'normal' | 'reduced' | 'none'>('normal');
  const [waterIntake, setWaterIntake] = useState('60');
  const [generalCondition, setGeneralCondition] = useState('Active and responsive');
  const [observation, setObservation] = useState('');
  const [vetObservation, setVetObservation] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const symptoms = symptomsInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    addHealthRecord({
      animalId: animal.id,
      animalTag: animal.tagId,
      temperature: parseFloat(temperature) || 38.5,
      symptoms,
      activityLevel,
      appetite,
      waterIntakeLiters: parseFloat(waterIntake) || 0,
      generalCondition,
      observation: observation || 'Routine clinical checkup logged.',
      veterinaryObservation: vetObservation || undefined,
      recordedBy: 'Farm Manager'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-gray-100 p-6">
        
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <HeartPulse className="w-5 h-5 text-green-700" />
            <h2 className="text-base font-bold text-gray-900">Log Health Vitals for {animal.tagId}</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 mt-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Body Temperature (°C) *</label>
              <input
                type="number"
                step="0.1"
                required
                value={temperature}
                onChange={e => setTemperature(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Water Intake (Liters)</label>
              <input
                type="number"
                value={waterIntake}
                onChange={e => setWaterIntake(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Appetite Level</label>
              <select
                value={appetite}
                onChange={e => setAppetite(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
              >
                <option value="normal">Normal Intake</option>
                <option value="reduced">Reduced Appetite</option>
                <option value="none">No Intake / Fasting</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Activity Level</label>
              <select
                value={activityLevel}
                onChange={e => setActivityLevel(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
              >
                <option value="normal">Normal & Alert</option>
                <option value="low">Slightly Sluggish</option>
                <option value="lethargic">Lethargic / Lying Down</option>
                <option value="hyperactive">Restless / Agitated</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Symptoms (Comma Separated)</label>
            <input
              type="text"
              placeholder="e.g. Mild coughing, watery eyes"
              value={symptomsInput}
              onChange={e => setSymptomsInput(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">General Health Observations</label>
            <textarea
              rows={2}
              required
              placeholder="Record rumination frequency, posture, muzzle moisture..."
              value={observation}
              onChange={e => setObservation(e.target.value)}
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
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-green-600 hover:bg-green-700 shadow-sm"
            >
              Save Health Record
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
