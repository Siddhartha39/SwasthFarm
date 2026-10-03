import React from 'react';
import { useFarm } from '@/context/FarmContext';
import { useLanguage } from '@/context/LanguageContext';
import { CloudSun, Droplets, Wind, AlertCircle, Thermometer } from 'lucide-react';

export const WeatherBar: React.FC = () => {
  const { weather } = useFarm();
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-sky-800 rounded-2xl p-5 text-white shadow-lg mb-6 relative overflow-hidden">
      {/* Background overlay graphic */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 pointer-events-none" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
        
        {/* Current Weather Details */}
        <div>
          <div className="flex items-center space-x-2">
            <CloudSun className="w-5 h-5 text-amber-300" />
            <h2 className="text-sm uppercase tracking-wider font-bold text-emerald-100">
              {t.weatherIn} {weather.city}
            </h2>
          </div>
          <div className="flex items-baseline space-x-3 mt-1">
            <span className="text-4xl font-extrabold tracking-tight">{weather.temp}°C</span>
            <span className="text-sm font-medium text-emerald-100">{weather.condition}</span>
          </div>

          <div className="flex items-center space-x-4 mt-2 text-xs text-emerald-100">
            <div className="flex items-center space-x-1">
              <Droplets className="w-3.5 h-3.5 text-sky-200" />
              <span>Humidity: {weather.humidity}%</span>
            </div>
            <div className="flex items-center space-x-1">
              <Wind className="w-3.5 h-3.5 text-teal-200" />
              <span>Wind: {weather.windKph} km/h</span>
            </div>
          </div>
        </div>

        {/* THI Heat Stress Risk Indicator */}
        <div className="flex flex-col items-start md:items-end">
          <div className="flex items-center space-x-2">
            <Thermometer className="w-4 h-4 text-amber-300" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-200">
              {t.heatStressWarning}
            </span>
          </div>

          <div className="mt-1 flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15">
            <span className="text-lg font-bold text-white">THI {weather.thiIndex}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${
              weather.stressLevel === 'severe' ? 'bg-red-500 text-white' :
              weather.stressLevel === 'moderate' ? 'bg-amber-400 text-gray-900 font-extrabold' :
              weather.stressLevel === 'mild' ? 'bg-yellow-300 text-gray-900 font-bold' :
              'bg-emerald-400 text-gray-900'
            }`}>
              {weather.stressLevel} Stress
            </span>
          </div>

          <p className="text-[11px] text-emerald-100/90 mt-1 text-left md:text-right max-w-xs">
            {weather.stressLevel === 'moderate' || weather.stressLevel === 'severe'
              ? 'High heat-stress potential. Ensure shed ventilation & fresh cool water.'
              : 'Ambient conditions within optimal physiological comfort zone.'}
          </p>
        </div>

      </div>

      {/* 5-Day Forecast mini-strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4 pt-3 border-t border-white/15">
        {weather.forecast.map((day, idx) => (
          <div key={idx} className="bg-black/10 rounded-lg p-2 text-center text-xs">
            <div className="font-bold text-white/90">{day.day}</div>
            <div className="text-amber-200 font-semibold mt-0.5">{day.tempMax}° / {day.tempMin}°</div>
            <div className="text-[10px] text-emerald-200 truncate">{day.condition}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
