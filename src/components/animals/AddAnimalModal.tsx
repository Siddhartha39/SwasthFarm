import React, { useState } from 'react';
import { useFarm } from '@/context/FarmContext';
import { Species, ProductionType } from '@/types';
import { X, PawPrint, Upload, Image as ImageIcon, Check } from 'lucide-react';

interface AddAnimalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SPECIES_PRESET_IMAGES: Record<Species, string> = {
  cow: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80',
  buffalo: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=800&q=80',
  goat: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=800&q=80',
  sheep: 'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?auto=format&fit=crop&w=800&q=80',
  poultry: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
  pig: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
  custom: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=800&q=80'
};

const BREED_SUGGESTIONS: Record<Species, string[]> = {
  cow: ['Holstein Friesian', 'Jersey', 'Gir', 'Sahiwal', 'Red Sindhi', 'Tharparkar', 'Crossbreed'],
  buffalo: ['Murrah Buffalo', 'Nili-Ravi', 'Jaffarabadi', 'Bhadawari', 'Surti'],
  goat: ['Beetal', 'Barbari', 'Sirohi', 'Jamnapari', 'Boer Meat Goat', 'Black Bengal'],
  sheep: ['Dorper', 'Marwari', 'Deccani', 'Nellore', 'Garole'],
  poultry: ['Cobb 500 Broiler', 'Ross 308', 'BV 300 Layer', 'Kadaknath', 'Aseel'],
  pig: ['Large White Yorkshire', 'Landrace', 'Duroc', 'Hampshire'],
  custom: ['Mixed Herd Breed']
};

export const AddAnimalModal: React.FC<AddAnimalModalProps> = ({ isOpen, onClose }) => {
  const { addAnimal, selectedFarm } = useFarm();

  const [tagId, setTagId] = useState('');
  const [name, setName] = useState('');
  const [species, setSpecies] = useState<Species>('cow');
  const [breed, setBreed] = useState('Holstein Friesian');
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [ageYears, setAgeYears] = useState('3.0');
  const [weightKg, setWeightKg] = useState('420');
  const [color, setColor] = useState('Black & White');
  const [productionType, setProductionType] = useState<ProductionType>('milk');
  const [currentProduction, setCurrentProduction] = useState('18.0');
  const [penLocation, setPenLocation] = useState('Barn A - Stall 06');
  const [photoUrl, setPhotoUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSpeciesChange = (newSpecies: Species) => {
    setSpecies(newSpecies);
    const breeds = BREED_SUGGESTIONS[newSpecies];
    setBreed(breeds[0] || 'Standard');
    
    // Auto configure defaults based on biological species
    if (newSpecies === 'cow') {
      setProductionType('milk');
      setCurrentProduction('18.0');
      setWeightKg('420');
      setColor('Black & White');
    } else if (newSpecies === 'buffalo') {
      setProductionType('milk');
      setCurrentProduction('14.0');
      setWeightKg('520');
      setColor('Jet Black');
    } else if (newSpecies === 'goat') {
      setProductionType('meat');
      setCurrentProduction('0.15');
      setWeightKg('38');
      setColor('Brown & White');
    } else if (newSpecies === 'sheep') {
      setProductionType('meat');
      setCurrentProduction('0.18');
      setWeightKg('55');
      setColor('White with Black Face');
    } else if (newSpecies === 'poultry') {
      setProductionType('eggs');
      setCurrentProduction('450');
      setWeightKg('1.8');
      setColor('White Feathered');
    } else if (newSpecies === 'pig') {
      setProductionType('meat');
      setCurrentProduction('0.65');
      setWeightKg('95');
      setColor('Pink / White');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setPhotoUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagId.trim()) return;

    const finalPhoto = photoUrl.trim() || imagePreview || SPECIES_PRESET_IMAGES[species];

    addAnimal({
      tagId: tagId.trim().toUpperCase(),
      name: name.trim() || `${species.toUpperCase()} ${tagId.trim().toUpperCase()}`,
      species,
      breed: breed.trim() || 'Standard Breed',
      gender,
      dob: new Date(Date.now() - (parseFloat(ageYears) || 2) * 365 * 24 * 3600 * 1000).toISOString().split('T')[0],
      ageYears: parseFloat(ageYears) || 2,
      weightKg: parseFloat(weightKg) || 100,
      color,
      healthStatus: 'healthy',
      photoUrl: finalPhoto,
      penLocation,
      productionType,
      currentDailyProduction: parseFloat(currentProduction) || 0,
      productionUnit: productionType === 'milk' ? 'L/day' : productionType === 'eggs' ? 'eggs/day' : 'kg/day ADG',
      dailyFeedKg: species === 'cow' ? 22 : species === 'buffalo' ? 26 : species === 'poultry' ? 0.14 : 3.0,
      dailyWaterLiters: species === 'cow' ? 65 : species === 'buffalo' ? 78 : species === 'poultry' ? 0.28 : 6.0,
      lastCheckupDate: new Date().toISOString().split('T')[0],
      currentTemperature: species === 'poultry' ? 41.3 : 38.6,
      notes: notes.trim() || 'Registered healthy into farm herd.'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto border border-gray-100 p-6 sm:p-7">
        
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl font-bold">
              🐾
            </div>
            <div>
              <h2 className="text-base font-extrabold text-gray-900">Add Livestock to Farm</h2>
              <p className="text-[11px] text-gray-500">Destination Farm: <strong>{selectedFarm?.name}</strong></p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          
          {/* Species Selector */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Livestock Species *</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {(['cow', 'buffalo', 'goat', 'sheep', 'poultry', 'pig'] as const).map(sp => (
                <button
                  type="button"
                  key={sp}
                  onClick={() => handleSpeciesChange(sp)}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    species === sp
                      ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-sm'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200 text-xs'
                  }`}
                >
                  <div className="text-xl">
                    {sp === 'cow' ? '🐄' : sp === 'buffalo' ? '🐃' : sp === 'goat' ? '🐐' : sp === 'sheep' ? '🐑' : sp === 'poultry' ? '🐔' : '🐖'}
                  </div>
                  <div className="text-[11px] capitalize mt-0.5">{sp}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Tag & Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Animal Tag Number *</label>
              <input
                type="text"
                required
                placeholder="e.g. COW-042"
                value={tagId}
                onChange={e => setTagId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Animal Name (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Ganga / Nandini"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Breed & Gender */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Breed</label>
              <input
                type="text"
                list="breed-options"
                value={breed}
                onChange={e => setBreed(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
              />
              <datalist id="breed-options">
                {(BREED_SUGGESTIONS[species] || []).map(b => (
                  <option key={b} value={b} />
                ))}
              </datalist>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Gender</label>
              <select
                value={gender}
                onChange={e => setGender(e.target.value as 'male' | 'female')}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
              >
                <option value="female">Female (Dam / Doe / Heifer / Hen)</option>
                <option value="male">Male (Sire / Bull / Buck / Ram)</option>
              </select>
            </div>
          </div>

          {/* Age, Weight, Color */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Age (Years)</label>
              <input
                type="number"
                step="0.5"
                min="0.1"
                value={ageYears}
                onChange={e => setAgeYears(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Weight (kg)</label>
              <input
                type="number"
                value={weightKg}
                onChange={e => setWeightKg(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Coat Color</label>
              <input
                type="text"
                value={color}
                onChange={e => setColor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Production Type & Daily Yield */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Production Purpose</label>
              <select
                value={productionType}
                onChange={e => setProductionType(e.target.value as ProductionType)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
              >
                <option value="milk">Dairy Milk (L/day)</option>
                <option value="eggs">Egg Production (eggs/day)</option>
                <option value="meat">Meat / Growth (ADG)</option>
                <option value="none">Breeding / Offspring Only</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Initial Daily Output</label>
              <input
                type="number"
                step="0.1"
                value={currentProduction}
                onChange={e => setCurrentProduction(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Photo: Upload or Preset */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Identification Photo (ID Only)</label>
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
                {photoUrl || imagePreview ? (
                  <img src={photoUrl || imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="block w-full text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
                <button
                  type="button"
                  onClick={() => {
                    const preset = SPECIES_PRESET_IMAGES[species];
                    setPhotoUrl(preset);
                    setImagePreview(preset);
                  }}
                  className="text-[11px] text-emerald-700 font-bold hover:underline"
                >
                  Use High-Quality Realistic Preset Photo for {species.toUpperCase()}
                </button>
              </div>
            </div>
          </div>

          {/* Pen Location */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Barn / Pen Location</label>
            <input
              type="text"
              placeholder="e.g. Shed 1 - North Stalls"
              value={penLocation}
              onChange={e => setPenLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Clinical / Origin Notes</label>
            <textarea
              rows={2}
              placeholder="Source, ear notch, physical markers, vaccination status..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
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
              Save Animal Record
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
