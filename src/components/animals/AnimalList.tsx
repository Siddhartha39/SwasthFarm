import React, { useState } from 'react';
import { useFarm } from '@/context/FarmContext';
import { useLanguage } from '@/context/LanguageContext';
import { Species } from '@/types';
import { Plus, Search, Filter, ArrowUpRight } from 'lucide-react';

interface AnimalListProps {
  onOpenAddAnimal: () => void;
}

export const AnimalList: React.FC<AnimalListProps> = ({ onOpenAddAnimal }) => {
  const { animals, selectAnimal } = useFarm();
  const { t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const speciesOptions: { id: string; label: string; icon: string }[] = [
    { id: 'all', label: t.allSpecies, icon: '🐾' },
    { id: 'cow', label: t.cow, icon: '🐄' },
    { id: 'buffalo', label: t.buffalo, icon: '🐃' },
    { id: 'goat', label: t.goat, icon: '🐐' },
    { id: 'sheep', label: t.sheep, icon: '🐑' },
    { id: 'poultry', label: t.poultry, icon: '🐓' },
    { id: 'pig', label: t.pig, icon: '🐷' },
  ];

  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = 
      animal.tagId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.breed.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecies = selectedSpecies === 'all' || animal.species === selectedSpecies;
    const matchesStatus = statusFilter === 'all' || animal.healthStatus === statusFilter;

    return matchesSearch && matchesSpecies && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t.animals}</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Managing {animals.length} livestock registered on this farm
          </p>
        </div>

        <button
          onClick={onOpenAddAnimal}
          className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addAnimal}</span>
        </button>
      </div>

      {/* Species Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-gray-200">
        {speciesOptions.map(spec => (
          <button
            key={spec.id}
            onClick={() => setSelectedSpecies(spec.id)}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedSpecies === spec.id
                ? 'bg-green-700 text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <span>{spec.icon}</span>
            <span>{spec.label}</span>
          </button>
        ))}
      </div>

      {/* Search and Secondary Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
          <input
            type="text"
            placeholder={t.searchAnimals}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-gray-200 text-gray-700 text-xs font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
          >
            <option value="all">All Health Statuses</option>
            <option value="healthy">Healthy / Normal</option>
            <option value="attention">Needs Attention</option>
          </select>
        </div>
      </div>

      {/* Animal Cards Grid */}
      {filteredAnimals.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-sm">No animals match your search filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredAnimals.map(animal => (
            <div
              key={animal.id}
              onClick={() => selectAnimal(animal.id)}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Photo & Status Badge */}
                <div className="h-44 w-full bg-gray-100 relative overflow-hidden">
                  {animal.photoUrl ? (
                    <img
                      src={animal.photoUrl}
                      alt={animal.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      🐾
                    </div>
                  )}

                  <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                    animal.healthStatus === 'healthy' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                  }`}>
                    {animal.healthStatus}
                  </span>

                  <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white px-2.5 py-0.5 rounded-lg text-[11px] font-bold">
                    {animal.species.toUpperCase()}
                  </span>
                </div>

                {/* Info Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="font-bold text-base text-gray-900 group-hover:text-green-700 transition-colors">
                        {animal.tagId}
                      </h2>
                      <p className="text-xs text-gray-500 font-medium">{animal.name} • {animal.breed}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                  </div>

                  {/* Vitals summary */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-gray-100 text-center">
                    <div className="bg-gray-50 rounded-lg p-1.5">
                      <div className="text-[10px] text-gray-400 uppercase">Weight</div>
                      <div className="text-xs font-bold text-gray-800">{animal.weightKg} kg</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-1.5">
                      <div className="text-[10px] text-gray-400 uppercase">Daily Yield</div>
                      <div className="text-xs font-bold text-gray-800">{animal.currentDailyProduction} {animal.productionUnit.split('/')[0]}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-1.5">
                      <div className="text-[10px] text-gray-400 uppercase">Temp</div>
                      <div className="text-xs font-bold text-gray-800">{animal.currentTemperature}°C</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="px-4 py-2.5 bg-gray-50/70 border-t border-gray-100 text-[11px] text-gray-500 flex justify-between items-center">
                <span>📍 {animal.penLocation || 'Main Barn'}</span>
                <span className="font-semibold text-green-700">Open 360° →</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
