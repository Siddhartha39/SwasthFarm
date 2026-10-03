import React, { useState } from 'react';
import { Video, Play, ExternalLink, BookOpen, CheckCircle } from 'lucide-react';

interface VideoLesson {
  id: string;
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
  description: string;
  completed: boolean;
}

export const TrainingVideosView: React.FC = () => {
  const [lessons, setLessons] = useState<VideoLesson[]>([
    {
      id: 'v1',
      title: 'Biosecurity Protocols & Disinfection Arch Maintenance',
      category: 'Biosecurity',
      duration: '12 mins',
      thumbnail: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=600&q=80',
      description: 'Step-by-step instructions on mixing quaternary ammonium solutions for tire spray arches and shed footbaths.',
      completed: true
    },
    {
      id: 'v2',
      title: 'Early Detection of Rumen Acidosis & Feed Anomalies in Cattle',
      category: 'Nutrition & Health',
      duration: '15 mins',
      thumbnail: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=600&q=80',
      description: 'How to monitor chewing cud, rumen contractions, and spot early drops in feed consumption before yields crash.',
      completed: false
    },
    {
      id: 'v3',
      title: 'Managing Heat Stress in Dairy Cows & Small Ruminants (THI Guidelines)',
      category: 'Environment',
      duration: '10 mins',
      thumbnail: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=600&q=80',
      description: 'Understanding Temperature-Humidity Index (THI), sprinkler timing, and electrolyte hydration practices.',
      completed: false
    },
    {
      id: 'v4',
      title: 'Poultry Flock Health: Ventilation, Ammonia Control & Egg Integrity',
      category: 'Poultry',
      duration: '18 mins',
      thumbnail: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=600&q=80',
      description: 'Best ventilation practices for deep litter systems and layer hen lighting regimes.',
      completed: true
    }
  ]);

  const toggleComplete = (id: string) => {
    setLessons(prev => prev.map(l => l.id === id ? { ...l, completed: !l.completed } : l));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <Video className="w-6 h-6 text-green-700" />
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Swasth Farm Training Videos</h1>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">
          Curated farmer capacity building lessons on biosecurity, preventive healthcare, and nutrition
        </p>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lessons.map(video => (
          <div key={video.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between">
            <div>
              {/* Video Thumbnail */}
              <div className="relative h-48 bg-gray-900 overflow-hidden group cursor-pointer">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 text-green-800 ml-0.5 fill-current" />
                  </div>
                </div>
                <span className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {video.duration}
                </span>
                <span className="absolute top-3 left-3 bg-green-700 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  {video.category}
                </span>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-bold text-sm text-gray-900 leading-snug">{video.title}</h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">{video.description}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => toggleComplete(video.id)}
                className={`flex items-center space-x-1.5 text-xs font-semibold ${
                  video.completed ? 'text-emerald-700' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <CheckCircle className={`w-4 h-4 ${video.completed ? 'text-emerald-600' : 'text-gray-400'}`} />
                <span>{video.completed ? 'Completed Lesson' : 'Mark as Watched'}</span>
              </button>

              <button className="text-xs font-bold text-green-700 hover:underline flex items-center space-x-1">
                <span>Watch Stream</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
