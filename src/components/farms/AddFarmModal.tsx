import React, { useState } from 'react';
import { useFarm } from '@/context/FarmContext';
import { useLanguage } from '@/context/LanguageContext';
import { X, Building2 } from 'lucide-react';

interface AddFarmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddFarmModal: React.FC<AddFarmModalProps> = ({ isOpen, onClose }) => {
  const { addFarm } = useFarm();
  const { t } = useLanguage();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [state, setState] = useState('Uttar Pradesh');
  const [sizeCategory, setSizeCategory] = useState<'Small' | 'Medium' | 'Large' | 'Commercial'>('Medium');
  const [primaryType, setPrimaryType] = useState<'Dairy' | 'Poultry' | 'Mixed' | 'Piggery' | 'Small Ruminant'>('Dairy');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addFarm({
      name: name.trim(),
      location: location.trim() || 'Kanpur',
      state,
      sizeCategory,
      primaryType,
      notes
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-gray-100 p-6">
        
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-green-700" />
            <h2 className="text-base font-bold text-gray-900">{t.createFarmModalTitle}</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 mt-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">{t.farmName} *</label>
            <input
              type="text"
              required
              placeholder="e.g. Sunrise Organic Dairy"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">{t.farmLocation} *</label>
              <input
                type="text"
                required
                placeholder="e.g. Karnal, Haryana"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">State / Province</label>
              <input
                type="text"
                value={state}
                onChange={e => setState(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">{t.farmType}</label>
              <select
                value={primaryType}
                onChange={e => setPrimaryType(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
              >
                <option value="Dairy">Dairy (Cattle & Buffalo)</option>
                <option value="Poultry">Poultry (Layers/Broilers)</option>
                <option value="Small Ruminant">Goat & Sheep</option>
                <option value="Piggery">Piggery / Swine</option>
                <option value="Mixed">Mixed Multi-Animal</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Scale</label>
              <select
                value={sizeCategory}
                onChange={e => setSizeCategory(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
              >
                <option value="Small">Small (&lt; 20 Animals)</option>
                <option value="Medium">Medium (20 - 100)</option>
                <option value="Large">Large (100 - 500)</option>
                <option value="Commercial">Commercial (500+)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Farm Bio-Notes</label>
            <textarea
              rows={2}
              placeholder="e.g. Automated milking parlor, silage storage pits..."
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
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-green-700 hover:bg-green-800 shadow-sm"
            >
              Create Farm
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
