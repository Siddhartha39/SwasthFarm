import React, { useState } from 'react';
import { useFarm } from '@/context/FarmContext';
import { Animal } from '@/types';
import { X, HeartPulse, AlertCircle, Thermometer } from 'lucide-react';

interface LogHealthModalProps {
  isOpen: boolean;
  onClose: () => void;
  animal: Animal;
}

const COMMON_SYMPTOMS = [
  'Mild Lethargy',
  'Decreased appetite',
  'Reduced rumination',
  'Dry coughing',
  'Nasal discharge',
  'Udder swelling / hardness',
  'Lameness / limping',
  'Loose stools / diarrhea',
  'Wallowing reluctance'
];

export const LogHealthModal: React.FC<LogHealthModalProps> = ({ isOpen, onClose, animal }) => {
  const { addHealthRecord, animals } = useFarm();

  const [selectedAnimalId, setSelectedAnimalId] = useState(animal.id);
  const currentAnimal = animals.find(a => a.id === selectedAnimalId) || animal;

  const todayStr = new Date().toISOString().split('T')[0];
  const [logDate, setLogDate] = useState(todayStr);

  const [temperature, setTemperature] = useState(currentAnimal.currentTemperature.toString());
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [activityLevel, setActivityLevel] = useState<'normal' | 'low' | 'lethargic' | 'hyperactive'>('normal');
  const [appetite, setAppetite] = useState<'normal' | 'reduced' | 'none'>('normal');
  const [waterIntake, setWaterIntake] = useState(currentAnimal.dailyWaterLiters.toString());
  const [generalCondition, setGeneralCondition] = useState('Responsive and alert');
  const [observation, setObservation] = useState('');
  const [vetObservation, setVetObservation] = useState('');
  const [recordedBy, setRecordedBy] = useState('Farm Manager');

  if (!isOpen) return null;

  const toggleSymptom = (sym: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(sym) ? prev.filter(s => s !== sym) : [...prev, sym]
    );
  };

  const tempVal = parseFloat(temperature) || 38.6;
  const isHighTemp = tempVal > 39.3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addHealthRecord({
      date: logDate,
      animalId: currentAnimal.id,
      animalTag: currentAnimal.tagId,
      temperature: tempVal,
      symptoms: selectedSymptoms,
      activityLevel,
      appetite,
      waterIntakeLiters: parseFloat(waterIntake) || 0,
      generalCondition,
      observation: observation.trim() || (isHighTemp ? 'Elevated core temperature noted.' : 'Routine physiological checkup.'),
      veterinaryObservation: vetObservation.trim() || undefined,
      recordedBy: recordedBy.trim() || 'Owner'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto border border-gray-100 p-6 sm:p-7">
        
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <HeartPulse className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-gray-900">Log Health Vitals</h2>
              <p className="text-[11px] text-gray-500">Record empirical clinical observations and body temperature</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          
          {/* Target Animal Selector */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Target Animal *</label>
            <select
              value={selectedAnimalId}
              onChange={e => setSelectedAnimalId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:ring-2 focus:ring-emerald-500"
            >
              {animals.map(a => (
                <option key={a.id} value={a.id}>
                  {a.tagId} ({a.name}) • {a.species.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Checkup Date *</label>
              <input
                type="date"
                required
                value={logDate}
                onChange={e => setLogDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Core Temp (°C) *</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  required
                  value={temperature}
                  onChange={e => setTemperature(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-xl text-xs font-bold focus:ring-2 ${
                    isHighTemp ? 'border-amber-400 bg-amber-50/50 text-amber-900 focus:ring-amber-500' : 'border-gray-200 text-gray-900 focus:ring-emerald-500'
                  }`}
                />
              </div>
            </div>
          </div>

          {isHighTemp && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>Elevated body temperature ({tempVal}°C). System will generate a veterinary monitoring alert.</span>
            </div>
          )}

          {/* Quick Symptoms Multi-Select Chips */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Observed Symptoms / Signs</label>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_SYMPTOMS.map(sym => {
                const active = selectedSymptoms.includes(sym);
                return (
                  <button
                    type="button"
                    key={sym}
                    onClick={() => toggleSymptom(sym)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      active
                        ? 'bg-amber-500 text-white shadow-sm'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {sym} {active && '✓'}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Appetite Level</label>
              <select
                value={appetite}
                onChange={e => setAppetite(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
              >
                <option value="normal">Normal Feeding</option>
                <option value="reduced">Reduced Appetite</option>
                <option value="none">Off Feed / Fasting</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Activity / Mobility</label>
              <select
                value={activityLevel}
                onChange={e => setActivityLevel(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
              >
                <option value="normal">Active & Normal</option>
                <option value="low">Slightly Sluggish</option>
                <option value="lethargic">Lethargic / Lying Down</option>
                <option value="hyperactive">Restless</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Water Intake (L)</label>
              <input
                type="number"
                value={waterIntake}
                onChange={e => setWaterIntake(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Recorded By</label>
              <input
                type="text"
                value={recordedBy}
                onChange={e => setRecordedBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Clinical Observations</label>
            <input
              type="text"
              placeholder="e.g. Muzzle moist, rumen contraction rate 2 per 2 mins"
              value={observation}
              onChange={e => setObservation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Veterinary Advice / Follow-up Note</label>
            <input
              type="text"
              placeholder="e.g. Dr. Sarah Verma advised electrolyte oral drenching"
              value={vetObservation}
              onChange={e => setVetObservation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
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
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition-all"
            >
              Save Health Record
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
