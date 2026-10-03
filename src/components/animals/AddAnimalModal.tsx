import React, { useState } from 'react';
import { useFarm } from '@/context/FarmContext';
import { Species, ProductionType, HealthStatus } from '@/types';
import { X, PawPrint } from 'lucide-react';

interface AddAnimalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddAnimalModal: React.FC<AddAnimalModalProps> = ({ isOpen, onClose }) => {
  const { addAnimal } = useFarm();

  const [tagId, setTagId] = useState('');
  const [name, setName] = useState('');
  const [species, setSpecies] = useState<Species>('cow');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [ageYears, setAgeYears] = useState('3');
  const [weightKg, setWeightKg] = useState('400');
  const [color, setColor] = useState('');
  const [productionType, setProductionType] = useState<ProductionType>('milk');
  const [currentProduction, setCurrentProduction] = useState('16.0');
  const [penLocation, setPenLocation] = useState('Barn A');
  const [photoUrl, setPhotoUrl] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagId.trim()) return;

    addAnimal({
      tagId: tagId.trim().toUpperCase(),
      name: name.trim() || `Animal ${tagId}`,
      species,
      breed: breed.trim() || 'Crossbreed',
      gender,
      dob: new Date(Date.now() - parseFloat(ageYears) * 365 * 24 * 3600 * 1000).toISOString().split('T')[0],
      ageYears: parseFloat(ageYears) || 1,
      weightKg: parseFloat(weightKg) || 100,
      color,
      healthStatus: 'healthy',
      photoUrl: photoUrl.trim() || undefined,
      penLocation,
      productionType,
      currentDailyProduction: parseFloat(currentProduction) || 0,
      productionUnit: productionType === 'milk' ? 'L/day' : productionType === 'eggs' ? 'eggs/day' : 'kg/day ADG',
      dailyFeedKg: species === 'cow' ? 20 : species === 'buffalo' ? 25 : species === 'poultry' ? 0.12 : 2.5,
      dailyWaterLiters: species === 'cow' ? 60 : species === 'buffalo' ? 70 : species === 'poultry' ? 0.25 : 5,
      lastCheckupDate: new Date().toISOString().split('T')[0],
      currentTemperature: species === 'poultry' ? 41.2 : 38.5,
      notes
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-gray-100 p-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <PawPrint className="w-5 h-5 text-green-700" />
            <h2 className="text-lg font-bold text-gray-900">Add New Livestock Record</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Tag / ID *</label>
              <input
                type="text"
                required
                placeholder="e.g. COW-045"
                value={tagId}
                onChange={e => setTagId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Name (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Nandini"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Species</label>
              <select
                value={species}
                onChange={e => setSpecies(e.target.value as Species)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
              >
                <option value="cow">Cow / Cattle</option>
                <option value="buffalo">Buffalo</option>
                <option value="goat">Goat</option>
                <option value="sheep">Sheep</option>
                <option value="poultry">Poultry</option>
                <option value="pig">Pig / Swine</option>
                <option value="custom">Other / Custom</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Breed</label>
              <input
                type="text"
                placeholder="e.g. Sahiwal, Murrah"
                value={breed}
                onChange={e => setBreed(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Gender</label>
              <select
                value={gender}
                onChange={e => setGender(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Age (Years)</label>
              <input
                type="number"
                step="0.1"
                value={ageYears}
                onChange={e => setAgeYears(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Weight (kg)</label>
              <input
                type="number"
                value={weightKg}
                onChange={e => setWeightKg(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Production Type</label>
              <select
                value={productionType}
                onChange={e => setProductionType(e.target.value as ProductionType)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
              >
                <option value="milk">Dairy Milk</option>
                <option value="eggs">Poultry Eggs</option>
                <option value="meat">Meat / Weight Gain</option>
                <option value="none">None / Breeding</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Current Daily Yield</label>
              <input
                type="number"
                step="0.1"
                value={currentProduction}
                onChange={e => setCurrentProduction(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Photo URL (For Profile Identification Only)</label>
            <input
              type="url"
              placeholder="https://..."
              value={photoUrl}
              onChange={e => setPhotoUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
            />
            <p className="text-[10px] text-gray-400 mt-1">Note: Photos are strictly used for animal identification and never disease prediction.</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Pen Location / Stall</label>
            <input
              type="text"
              placeholder="e.g. Barn A - Stall 12"
              value={penLocation}
              onChange={e => setPenLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Initial Health Notes</label>
            <textarea
              rows={2}
              placeholder="Any notable physical marks or vaccination history..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
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
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-green-600 hover:bg-green-700 shadow-sm"
            >
              Save Animal Record
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
