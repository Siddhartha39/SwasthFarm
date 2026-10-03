import React, { useState } from 'react';
import { useFarm } from '@/context/FarmContext';
import { ShieldCheck, CheckCircle2, XCircle, AlertCircle, RefreshCw, Award } from 'lucide-react';

export const RiskAssessmentView: React.FC = () => {
  const { biosecurity, toggleBiosecurityCheck } = useFarm();

  const completedCount = biosecurity.checklist.filter(c => c.completed).length;
  const totalCount = biosecurity.checklist.length;
  const score = biosecurity.score;

  let riskTier = 'Low Biosecurity Risk';
  let tierColor = 'text-emerald-700 bg-emerald-100 border-emerald-300';
  if (score < 60) {
    riskTier = 'High Biosecurity Risk - Action Needed';
    tierColor = 'text-red-700 bg-red-100 border-red-300';
  } else if (score < 80) {
    riskTier = 'Moderate Biosecurity Risk';
    tierColor = 'text-amber-700 bg-amber-100 border-amber-300';
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-6 h-6 text-green-700" />
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Biosecurity & Risk Assessment</h1>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">
          Government & Veterinary Compliant Livestock Biosecurity Protocol (Preserved from Swasth Farm)
        </p>
      </div>

      {/* Score Overview Card */}
      <div className="bg-gradient-to-r from-emerald-700 via-green-800 to-teal-900 text-white rounded-2xl p-6 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center space-x-2 text-green-200 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-300" />
            <span>Farm Biosecurity Certification Index</span>
          </div>
          <div className="text-5xl font-extrabold mt-2 tracking-tight">{score} <span className="text-2xl text-green-300 font-medium">/ 100</span></div>
          <p className="text-xs text-green-200 mt-2 max-w-md">
            {completedCount} of {totalCount} standard preventive protocols actively maintained on this farm.
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end">
          <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold uppercase border ${tierColor}`}>
            {riskTier}
          </span>
          <span className="text-[11px] text-green-200 mt-2">
            Last Audited: {biosecurity.date}
          </span>
        </div>
      </div>

      {/* Interactive Daily Biosecurity Checklist */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-base font-bold text-gray-900 mb-1">Interactive Biosecurity Audit Checklist</h2>
        <p className="text-xs text-gray-500 mb-4">Click any item to toggle compliance status and recalculate score</p>

        <div className="space-y-3">
          {biosecurity.checklist.map(item => (
            <div
              key={item.id}
              onClick={() => toggleBiosecurityCheck(item.id)}
              className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-150 ${
                item.completed
                  ? 'bg-emerald-50/50 border-emerald-200 hover:bg-emerald-50'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-start space-x-3">
                {item.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <div className={`text-xs font-bold ${item.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                    {item.question}
                  </div>
                  <span className="text-[10px] text-gray-400 uppercase font-semibold">
                    Category: {item.category}
                  </span>
                </div>
              </div>

              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${
                item.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
              }`}>
                {item.completed ? 'Compliant' : 'Non-Compliant'}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
