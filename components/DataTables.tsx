'use client';
import React from 'react';
import { mathScoreMap, rwScoreMap, getPercentile } from '@/lib/sat-utils';

// --- SECTION 7: RAW SCORE CONVERSION TABLE ---
export function ConversionTables() {
  return (
    <section id="score-conversion-table" className="bg-white py-[60px] px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-[28px] font-bold text-[#0A2342]">SAT Raw Score to Scaled Score Conversion Table</h2>
          <p className="text-[#6B7280] mt-2">Based on official College Board Digital SAT scoring curves for 2025–2026</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* R&W Table */}
          <div className="flex-1 w-full overflow-x-auto border border-[#E5E7EB] rounded-t-xl rounded-b-xl shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#0A2342] text-white">
                <tr>
                  <th className="px-6 py-4 font-bold border-r border-[#1e446d]">R&W Raw Score<br/><span className="text-xs font-normal text-blue-200">(Out of 54)</span></th>
                  <th className="px-6 py-4 font-bold">Scaled Score<br/><span className="text-xs font-normal text-blue-200">(200-800)</span></th>
                </tr>
              </thead>
              <tbody>
                {[...rwScoreMap].reverse().map(([raw, scaled], idx) => (
                  <tr key={raw} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}>
                    <td className="px-6 py-3 font-semibold text-[#0A2342] border-r border-[#E5E7EB]">{raw}</td>
                    <td className="px-6 py-3 text-[#6B7280]">{scaled}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Math Table */}
          <div className="flex-1 w-full overflow-x-auto border border-[#E5E7EB] rounded-t-xl rounded-b-xl shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#0A2342] text-white">
                <tr>
                  <th className="px-6 py-4 font-bold border-r border-[#1e446d]">Math Raw Score<br/><span className="text-xs font-normal text-blue-200">(Out of 44)</span></th>
                  <th className="px-6 py-4 font-bold">Scaled Score<br/><span className="text-xs font-normal text-blue-200">(200-800)</span></th>
                </tr>
              </thead>
              <tbody>
                {[...mathScoreMap].reverse().map(([raw, scaled], idx) => (
                  <tr key={raw} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}>
                    <td className="px-6 py-3 font-semibold text-[#0A2342] border-r border-[#E5E7EB]">{raw}</td>
                    <td className="px-6 py-3 text-[#6B7280]">{scaled}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-8 bg-[#E0F7FA] border border-[#0097A7] rounded-xl p-5 text-[#006064] text-[15px] font-medium flex gap-3 shadow-sm">
          <span>💡</span>
          <div>
            The Digital SAT uses adaptive scoring — students who get Module 2 Hard may reach higher scaled scores with the same raw score count compared to students who get Module 2 Easy. These tables represent typical standard conversions.
          </div>
        </div>
      </div>
    </section>
  );
}

// --- SECTION 8: PERCENTILE TABLE ---
export function PercentileTable() {
  const percentiles = [
    { score: 1600, pct: "99th+", tier: "Perfect", match: "Any college", color: "bg-[#2E7D32]" },
    { score: 1500, pct: "99th", tier: "Exceptional", match: "Ivy League, MIT, Stanford", color: "bg-[#2E7D32]" },
    { score: 1400, pct: "94th", tier: "Exceptional", match: "Top 20 universities", color: "bg-[#2E7D32]" },
    { score: 1300, pct: "89th", tier: "Great", match: "Top 50 universities", color: "bg-[#0097A7]" },
    { score: 1200, pct: "74th", tier: "Good", match: "Most 4-year colleges", color: "bg-[#1565C0]" },
    { score: 1100, pct: "58th", tier: "Average", match: "Many state schools", color: "bg-[#F9A825]" },
    { score: 1050, pct: "50th", tier: "Avg (National)", match: "Community + regional colleges", color: "bg-[#F9A825]" },
    { score: 950,  pct: "36th", tier: "Below Average", match: "Open enrollment colleges", color: "bg-[#C62828]" },
    { score: 870,  pct: "25th", tier: "Below Average", match: "—", color: "bg-[#C62828]" },
    { score: 780,  pct: "10th", tier: "Low", match: "—", color: "bg-[#C62828]" },
  ];

  return (
    <section id="sat-percentile" className="bg-[#F0F4F8] py-[60px] px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-[28px] font-bold text-[#0A2342]">SAT Score Percentile Rankings</h2>
          <p className="text-[#6B7280] mt-2">How your score compares to all test takers nationally (2024–2025 data)</p>
        </div>

        <div className="w-full overflow-x-auto shadow-sm rounded-xl border border-[#E5E7EB]">
          <table className="w-full text-sm text-left bg-white min-w-[600px]">
             <thead className="bg-[#0A2342] text-white uppercase text-xs tracking-wider">
                <tr>
                   <th className="px-6 py-4 font-bold border-r border-[#1e446d]">Total Score</th>
                   <th className="px-6 py-4 font-bold border-r border-[#1e446d]">Percentile</th>
                   <th className="px-6 py-4 font-bold border-r border-[#1e446d]">Score Tier</th>
                   <th className="px-6 py-4 font-bold">College Match</th>
                </tr>
             </thead>
             <tbody>
                {percentiles.map((row, idx) => (
                  <tr key={row.score} className={`border-b border-[#E5E7EB] ${idx % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'} ${row.score === 1200 ? 'bg-[#EBF8FA]' : ''}`}>
                    <td className="px-6 py-4 font-bold text-[#0A2342]">{row.score}</td>
                    <td className="px-6 py-4 font-semibold text-[#6B7280]">{row.pct}</td>
                    <td className="px-6 py-4">
                       <span className={`${row.color} text-white px-2.5 py-1 text-xs font-bold rounded-md uppercase`}>
                         {row.tier}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-[#4B5563]">{row.match}</td>
                  </tr>
                ))}
             </tbody>
          </table>
        </div>
        <p className="text-xs text-[#6B7280] mt-4 max-w-3xl mx-auto text-center line-height-relaxed">
          Percentile data sourced from College Board&apos;s most recent national score report. Rankings are approximate and may vary slightly by test year. A 74th percentile means you scored higher than 74% of the millions of students who took the exam.
        </p>
      </div>
    </section>
  );
}
