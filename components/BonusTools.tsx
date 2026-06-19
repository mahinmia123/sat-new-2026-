'use client';
import React, { useState } from 'react';
import { actMap } from '@/lib/sat-utils';

// --- SECTION 10: SUPERSCORE CALCULATOR ---
export function SuperscoreCalculator() {
  const [dates, setDates] = useState([
    { id: 1, name: 'Date 1', rw: 0, math: 0 },
    { id: 2, name: 'Date 2', rw: 0, math: 0 }
  ]);

  const addDate = () => setDates([...dates, { id: Date.now(), name: `Date ${dates.length + 1}`, rw: 0, math: 0 }]);
  
  const updateDate = (id: number, field: 'rw' | 'math', val: string) => {
    let num = parseInt(val) || 0;
    if (num > 800) num = 800; // Cap
    setDates(dates.map(d => d.id === id ? { ...d, [field]: num } : d));
  };

  const maxRw = Math.max(...dates.map(d => d.rw), 0);
  const maxMath = Math.max(...dates.map(d => d.math), 0);
  const superscore = (maxRw + maxMath) > 0 ? (maxRw + maxMath) : 0;

  return (
    <section id="superscore" className="bg-[#F0F4F8] py-[60px] px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block px-3 py-1 bg-[#E0F2F1] text-[#00838F] text-[13px] font-bold rounded-full mb-3 tracking-wide">
            BONUS TOOL
          </div>
          <h2 className="text-[28px] font-bold text-[#0A2342] mb-2">SAT Superscore Calculator</h2>
          <p className="text-[#6B7280]">Many colleges superscore the SAT — combine your best section scores from multiple test dates</p>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#E5E7EB]">
          <h3 className="text-base font-bold text-[#0A2342] mb-5 border-b border-[#E5E7EB] pb-3">Enter Your Scores from Multiple Test Dates</h3>
          
          <div className="space-y-4">
            {dates.map((d, i) => (
              <div key={d.id} className="flex flex-col sm:flex-row gap-4 items-end sm:items-center">
                <div className="flex-1 w-full">
                  <label className="block text-xs font-semibold text-[#6B7280] mb-1 uppercase tracking-wide">Test Date</label>
                  <input type="text" placeholder={`E.g. March 2025`} className="w-full bg-[#F3F4F6] border border-[#D1D5DB] rounded-lg px-4 py-2.5 text-sm text-[#0A2342] focus:outline-none focus:ring-2 focus:ring-[#0097A7]"/>
                </div>
                <div className="w-full sm:w-28 flex-shrink-0">
                  <label className="block text-xs font-semibold text-[#6B7280] mb-1 uppercase tracking-wide">R&W Score</label>
                  <input type="number" min="200" max="800" step="10" 
                    onChange={(e) => updateDate(d.id, 'rw', e.target.value)}
                    className="w-full bg-white border border-[#D1D5DB] rounded-lg px-4 py-2.5 text-sm font-bold text-[#0A2342] focus:outline-none focus:ring-2 focus:ring-[#0A2342]"/>
                </div>
                <div className="w-full sm:w-28 flex-shrink-0">
                  <label className="block text-xs font-semibold text-[#6B7280] mb-1 uppercase tracking-wide">Math Score</label>
                  <input type="number" min="200" max="800" step="10" 
                    onChange={(e) => updateDate(d.id, 'math', e.target.value)}
                    className="w-full bg-white border border-[#D1D5DB] rounded-lg px-4 py-2.5 text-sm font-bold text-[#0A2342] focus:outline-none focus:ring-2 focus:ring-[#0A2342]"/>
                </div>
              </div>
            ))}
          </div>
          
          <button onClick={addDate} className="mt-4 text-[#0097A7] font-bold text-sm tracking-tight hover:underline flex items-center gap-1">
            <span>+</span> Add another test date
          </button>

          {superscore > 0 && (
            <div className="mt-8 border-2 border-[#0097A7] bg-[#E0F7FA] rounded-xl p-6 text-center animate-in fade-in slide-in-from-bottom-2 duration-500 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
              <div className="text-[13px] font-bold text-[#00838F] tracking-widest uppercase">Your SAT Superscore</div>
              <div className="text-[48px] font-black text-[#0A2342] my-1 leading-none tracking-tighter">{superscore}</div>
              <div className="text-sm font-bold text-[#00838F] mb-1">Best R&W: {maxRw || 0} &nbsp;&nbsp;+&nbsp;&nbsp; Best Math: {maxMath || 0}</div>
              <p className="text-[13px] text-[#006064] mt-3 opacity-90 leading-snug">Colleges that superscore will use these best section scores, treating them as if you took them on a single day.</p>
            </div>
          )}

          <div className="mt-6 bg-[#FFF8E1] border border-[#FFE082] rounded-lg p-4 text-[13px] text-[#F57F17] flex gap-3 leading-snug">
            <span className="font-bold">ⓘ</span>
            <span>Over 90% of U.S. colleges and universities accept SAT superscoring. Always check each college&apos;s official admissions policy to confirm.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- SECTION 11: HOW MANY CAN I MISS ---
export function TargetScoreCalculator() {
  const [target, setTarget] = useState(1300);

  // Very rough estimation based on linear averages
  const half = Math.floor(target / 2);
  // Max questions: RW=54, Math=44
  const rwMisses = Math.floor(54 - ((half - 200) / 600) * 54);
  const mathMisses = Math.floor(44 - ((half - 200) / 600) * 44);

  return (
    <section id="how-many-can-i-miss" className="bg-white py-[60px] px-4 border-t border-[#E5E7EB]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-[28px] font-bold text-[#0A2342] mb-2">How Many Questions Can You Miss?</h2>
          <p className="text-[#6B7280]">Enter your target score and see exactly how many questions you can miss in each section</p>
        </div>

        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 md:p-10 shadow-sm max-w-xl mx-auto">
          <div className="text-center mb-8">
            <label className="block text-sm font-bold text-[#6B7280] uppercase tracking-wider mb-3">My target SAT score</label>
            <div className="flex items-center justify-center gap-4">
              <button onClick={() => setTarget(Math.max(400, target - 10))} className="w-12 h-12 rounded-full border-2 border-[#E5E7EB] bg-white text-[#0A2342] font-bold text-xl hover:bg-[#F3F4F6] transition-colors">-</button>
              <input type="number" min="400" max="1600" step="10" value={target} onChange={e => setTarget(Number(e.target.value))}
                className="w-32 text-center text-[42px] font-black text-[#0A2342] bg-transparent focus:outline-none border-b-2 border-[#0A2342] px-0 pb-1" />
              <button onClick={() => setTarget(Math.min(1600, target + 10))} className="w-12 h-12 rounded-full border-2 border-[#E5E7EB] bg-white text-[#0A2342] font-bold text-xl hover:bg-[#F3F4F6] transition-colors">+</button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0097A7]"></div>
               <div className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-2">R&W Modules</div>
               <div className="text-2xl font-black text-[#0A2342] leading-none mb-1">Max {Math.max(0, rwMisses)}</div>
               <div className="text-xs text-[#6B7280]">questions wrong</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-[#7B1FA2]"></div>
               <div className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-2">Math Modules</div>
               <div className="text-2xl font-black text-[#0A2342] leading-none mb-1">Max {Math.max(0, mathMisses)}</div>
               <div className="text-xs text-[#6B7280]">questions wrong</div>
            </div>
          </div>
          
          <p className="text-xs text-[#9CA3AF] mt-5 text-center leading-relaxed">
            ⓘ These are estimates relying on an even 50/50 split. Students on Module 2 Hard can miss more questions and still achieve the same score.
          </p>
        </div>
      </div>
    </section>
  );
}

// --- SECTION 12: SAT TO ACT CONVERSION ---
export function ActConverter() {
  const [satIn, setSatIn] = useState('1240');
  const actOut = actMap.find(m => parseInt(satIn) >= m[0])?.[1] || 25;

  return (
    <section id="sat-to-act" className="bg-[#F0F4F8] py-[60px] px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-[28px] font-bold text-[#0A2342] mb-2">SAT to ACT Score Conversion</h2>
          <p className="text-[#6B7280]">Convert between SAT and ACT scores using College Board&apos;s official concordance</p>
        </div>

        <div className="bg-white max-w-xl mx-auto rounded-3xl p-6 md:p-8 shadow-sm border border-[#E5E7EB]">
           <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-full text-center p-5 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
                <div className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">SAT Score</div>
                <input type="number" value={satIn} onChange={e => setSatIn(e.target.value)} 
                  className="w-full text-center text-4xl font-black text-[#0A2342] bg-transparent border-b-2 border-transparent focus:border-[#0097A7] focus:outline-none"/>
              </div>
              
              <div className="w-12 h-12 shrink-0 bg-[#0A2342] text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md rotate-90 md:rotate-0">
                ⇄
              </div>

              <div className="w-full text-center p-5 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
                <div className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">ACT Equiv.</div>
                <div className="w-full text-center text-4xl font-black text-[#0097A7] py-1">{actOut}</div>
              </div>
           </div>
           
           <div className="text-center mt-6">
             <span className="inline-block px-3 py-1 bg-[#E0F2F1] text-[#00838F] text-[12px] font-bold rounded-full border border-teal-100">
               Based on official 2018 concordance study
             </span>
           </div>
        </div>
      </div>
    </section>
  );
}
