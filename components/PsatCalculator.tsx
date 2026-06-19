'use client';

import React, { useState } from 'react';
import { calculatePsatSectionScore, getPsatPercentile, getPsatTier } from '@/lib/sat-utils';
import { motion, AnimatePresence } from 'motion/react';

export function PsatCalculator() {
  const [rw1, setRw1] = useState(20);
  const [rw2, setRw2] = useState(19);
  const [m1, setM1] = useState(16);
  const [m2, setM2] = useState(15);
  const [diff, setDiff] = useState('Standard');
  const [showResults, setShowResults] = useState(false);

  const curRw = calculatePsatSectionScore(rw1, rw2, diff, 'RW');
  const curM = calculatePsatSectionScore(m1, m2, diff, 'MATH');
  const curTotal = curRw + curM;

  const handleCalculate = () => {
    setShowResults(true);
    setTimeout(() => {
      document.getElementById('your-psat-score')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  // Calculate position for live preview bar
  const minScore = 320;
  const maxScore = 1520;
  const clampedScore = Math.max(minScore, Math.min(maxScore, curTotal));
  const markerPos = ((clampedScore - minScore) / (maxScore - minScore)) * 100;

  return (
    <>
      <section id="psat-calculator" className="bg-white pt-16 pb-16 px-4 border-t border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:items-center">
          
          {/* Left Column: Hero Text */}
          <div className="flex-1 w-full lg:w-[55%]">
            <h2 className="text-3xl md:text-[38px] font-bold text-[#0A2342] leading-[1.15] tracking-tight">
              PSAT Score Calculator
            </h2>
            <p className="mt-4 text-[#6B7280] text-lg leading-relaxed max-w-xl">
              Convert your raw PSAT answers to a scaled score (320-1520). Estimate your percentile ranking and National Merit Scholarship eligibility for 2025/2026.
            </p>
            
            <div className="flex flex-wrap gap-3 mt-6">
              {["Same format as Digital SAT", "PSAT/NMSQT Scale", "Free & Instant"].map(pill => (
                <div key={pill} className="flex items-center gap-1.5 bg-[#F3F4F6] text-[#4B5563] px-3 py-1.5 rounded-full text-sm font-medium border border-[#E5E7EB]">
                  <span>{pill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Calculator Tool */}
          <div className="flex-1 w-full lg:w-[45%]">
            <div className="w-full bg-[#F8FAFC] rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.04)] border border-[#E5E7EB] p-5 md:p-7 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0097A7]"></div>
              
              <div className="mb-6 pl-2">
                <h3 className="text-xl font-bold text-[#0A2342]">PSAT Module Scores</h3>
              </div>

              <div className="space-y-6">
                {/* R&W 1 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-[15px] text-[#0A2342]">Reading & Writing M1</span>
                  </div>
                  <input type="range" min="0" max="27" value={rw1} onChange={e => setRw1(Number(e.target.value))} 
                    className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#0097A7]" />
                  <div className="text-right mt-1.5 font-bold text-[#0A2342] text-[14px]">{rw1} / 27 correct</div>
                </div>

                {/* R&W 2 */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-[15px] text-[#0A2342]">Reading & Writing M2</span>
                  </div>
                  <input type="range" min="0" max="27" value={rw2} onChange={e => setRw2(Number(e.target.value))} 
                    className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#0097A7]" />
                  <div className="text-right mt-1.5 font-bold text-[#0A2342] text-[14px]">{rw2} / 27 correct</div>
                </div>

                {/* Math 1 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-[15px] text-[#0A2342]">Math M1</span>
                  </div>
                  <input type="range" min="0" max="22" value={m1} onChange={e => setM1(Number(e.target.value))} 
                    className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#0097A7]" />
                  <div className="text-right mt-1.5 font-bold text-[#0A2342] text-[14px]">{m1} / 22 correct</div>
                </div>

                {/* Math 2 */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-[15px] text-[#0A2342]">Math M2</span>
                  </div>
                  <input type="range" min="0" max="22" value={m2} onChange={e => setM2(Number(e.target.value))} 
                    className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#0097A7]" />
                  <div className="text-right mt-1.5 font-bold text-[#0A2342] text-[14px]">{m2} / 22 correct</div>
                </div>
              </div>

               {/* Difficulty Toggles */}
               <div className="mt-6 pt-5 border-t border-[#E5E7EB]">
                 <div className="text-[13px] font-semibold text-[#6B7280] mb-2 uppercase tracking-wider">Module 2 Difficulty:</div>
                 <div className="flex gap-2">
                   {['Easy', 'Standard', 'Hard'].map(d => (
                     <button key={d} onClick={() => setDiff(d)}
                       className={`flex-1 py-1.5 text-sm font-medium rounded-full transition-all border ${
                         diff === d ? 'bg-[#0A2342] text-white border-[#0A2342]' : 'bg-white text-[#4B5563] border-[#D1D5DB]'
                       }`}>
                       {d} {diff === d && '✓'}
                     </button>
                   ))}
                 </div>
               </div>

              {/* Submit Button */}
              <button 
                onClick={handleCalculate}
                className="w-full mt-6 h-[52px] rounded-xl text-white font-bold text-[16px] shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: '#0097A7' }}>
                Calculate PSAT Score
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: RESULTS PANEL */}
      <AnimatePresence>
        {showResults && (
          <motion.section 
            id="your-psat-score"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-[#F8FAFC] py-16 px-4 border-b border-[#E5E7EB] overflow-hidden"
          >
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-[28px] font-bold text-[#0A2342]">Your PSAT Score (Out of 1520)</h2>
              </div>

              <div className="flex flex-col md:flex-row gap-12 items-center">
                {/* SVG Gauge */}
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="relative w-[240px] h-[240px]">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                     <circle cx="100" cy="100" r="80" fill="none" stroke="#E5E7EB" strokeWidth="16" />
                     <motion.circle 
                       cx="100" cy="100" r="80" fill="none" 
                       stroke={getPsatTier(curTotal).color} 
                       strokeWidth="16"
                       strokeLinecap="round"
                       strokeDasharray="502.65"
                       initial={{ strokeDashoffset: 502.65 }}
                       animate={{ strokeDashoffset: 502.65 - (502.65 * (markerPos / 100)) }}
                       transition={{ duration: 1.5, ease: "easeOut" }}
                     />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                      <span className="text-5xl font-extrabold text-[#0A2342] tracking-tighter mt-1 mb-1">{curTotal}</span>
                      <span className="text-[#9CA3AF] text-sm">out of 1520</span>
                    </div>
                  </div>
                </div>

                <div className="flex-[1.2] w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
                    <div className="text-[#6B7280] text-sm font-semibold">Reading & Writing Score</div>
                    <div className="text-3xl font-bold text-[#0A2342] mt-3">{curRw}</div>
                  </div>
                  <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
                    <div className="text-[#6B7280] text-sm font-semibold">Math Score</div>
                    <div className="text-3xl font-bold text-[#0A2342] mt-3">{curM}</div>
                  </div>
                  <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
                    <div className="text-[#6B7280] text-sm font-semibold">Estimate Percentile</div>
                    <div className="text-2xl font-bold text-[#0A2342] mt-2">{getPsatPercentile(curTotal)}</div>
                  </div>
                  <div className="bg-[#FFF8E1] border border-[#FFE082] rounded-2xl p-5 shadow-sm">
                     <div className="text-[#F57F17] text-sm font-bold">NMSQT Predictor</div>
                     <div className="text-xl font-bold text-[#0A2342] mt-2">
                       Selection Index: {(curRw / 10 * 2) + (curM / 10)}
                     </div>
                     <div className="text-xs text-[#6B7280] mt-1">SI ranges up to 228. Typically 210+ needed for National Merit.</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
