'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, CheckCircle2, ChevronDown, Menu } from 'lucide-react';
import { calculateSectionScore, getPercentile, getTier } from '@/lib/sat-utils';
import { motion, AnimatePresence } from 'motion/react';

// --- SECTION 1: HEADER ---
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#E5E7EB] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-[#0A2342] text-white p-1.5 rounded-lg">
            <Calculator size={20} />
          </div>
          <span className="font-bold text-[#0A2342] text-lg tracking-tight">Free SAT Calculator</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-[15px] font-medium text-[#0A2342]">
          <a href="#your-score" className="hover:text-[#0097A7] transition-colors">Score Chart</a>
          <a href="#score-conversion-table" className="hover:text-[#0097A7] transition-colors">Score Table</a>
          <a href="#college-match" className="hover:text-[#0097A7] transition-colors">College Match</a>
          <a href="#faq" className="hover:text-[#0097A7] transition-colors">FAQ</a>
        </nav>
        
        <button className="md:hidden text-[#0A2342] p-1">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}

// --- SECTION 2 & 3: CALCULATOR FLOW ---
export function CalculatorCore({ onCalculate }: { onCalculate: (score: any) => void }) {
  const [rw1, setRw1] = useState(20);
  const [rw2, setRw2] = useState(19);
  const [m1, setM1] = useState(16);
  const [m2, setM2] = useState(15);
  const [diff, setDiff] = useState('Standard');
  const [hasCalculated, setHasCalculated] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const curRw = calculateSectionScore(rw1, rw2, diff, 'RW');
  const curM = calculateSectionScore(m1, m2, diff, 'MATH');
  const curTotal = curRw + curM;

  const handleCalculate = () => {
    setHasCalculated(true);
    setShowResults(true);
    const resultStats = { total: curTotal, rw: curRw, math: curM, percentile: getPercentile(curTotal), tier: getTier(curTotal) };
    onCalculate(resultStats);
    setTimeout(() => {
      document.getElementById('your-score')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  // Calculate position for live preview bar
  const minScore = 400;
  const maxScore = 1600;
  const clampedScore = Math.max(minScore, Math.min(maxScore, curTotal));
  const markerPos = ((clampedScore - minScore) / (maxScore - minScore)) * 100;

  return (
    <>
      <section className="bg-[#F0F4F8] pt-12 pb-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:items-center">
          
          {/* Left Column: Hero Text */}
          <div className="flex-1 w-full lg:w-[55%]">
            <h1 className="text-3xl md:text-[42px] font-bold text-[#0A2342] leading-[1.15] tracking-tight">
              Free SAT Score Calculator — Digital SAT 2025 & 2026
            </h1>
            <p className="mt-4 text-[#6B7280] text-lg leading-relaxed max-w-xl">
              Enter your correct answers for each of the 4 modules. Our calculator instantly converts your raw scores to scaled scores (400–1600), shows your percentile, and estimates your college matches — free, no login.
            </p>
            
            <div className="flex flex-wrap gap-3 mt-6">
              {["College Board Aligned", "2025 & 2026 Digital SAT", "100% Free"].map(pill => (
                <div key={pill} className="flex items-center gap-1.5 bg-[#E8F5E9] text-[#2E7D32] px-3 py-1.5 rounded-full text-sm font-medium border border-[#A5D6A7]/30">
                  <CheckCircle2 size={16} />
                  <span>{pill}</span>
                </div>
              ))}
            </div>
            
            <div className="flex gap-4 mt-8">
              <div className="flex-1 bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-sm">
                <div className="text-3xl font-extrabold text-[#0A2342]">1,200+</div>
                <div className="text-sm font-medium text-[#6B7280] mt-1">students use this daily</div>
              </div>
              <div className="flex-1 bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-sm">
                <div className="text-3xl font-extrabold text-[#0097A7]">±20 pts</div>
                <div className="text-sm font-medium text-[#6B7280] mt-1">average accuracy</div>
              </div>
            </div>
          </div>

          {/* Right Column: Calculator Tool */}
          <div className="flex-1 w-full lg:w-[45%]">
            <div className="w-full bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-[#E5E7EB] p-5 md:p-7 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0A2342]"></div>
              
              <div className="mb-6 pl-2">
                <h2 className="text-xl font-bold text-[#0A2342]">Digital SAT Score Calculator</h2>
                <p className="text-sm text-[#6B7280] mt-1 font-medium">(2025 & 2026 Digital SAT format — 4 adaptive modules)</p>
              </div>

              <div className="space-y-6">
                {/* R&W 1 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#0097A7]"></div>
                      <span className="font-bold text-[15px] text-[#0A2342]">Reading & Writing — Module 1</span>
                    </div>
                    <span className="text-xs font-semibold bg-[#F3F4F6] text-[#4B5563] px-2 py-0.5 rounded-md">27 questions</span>
                  </div>
                  <input type="range" min="0" max="27" value={rw1} onChange={e => setRw1(Number(e.target.value))} 
                    className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#0097A7]" />
                  <div className="text-right mt-1.5 font-bold text-[#0A2342] text-[15px]">{rw1} / 27 correct</div>
                </div>

                {/* R&W 2 */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#1565C0]"></div>
                      <span className="font-bold text-[15px] text-[#0A2342]">Reading & Writing — Module 2</span>
                    </div>
                    <span className="text-xs font-semibold bg-[#F3F4F6] text-[#4B5563] px-2 py-0.5 rounded-md">27 questions</span>
                  </div>
                  <div className="text-[13px] text-[#6B7280] italic mb-3 ml-4.5">(Difficulty depends on your Module 1 performance)</div>
                  <input type="range" min="0" max="27" value={rw2} onChange={e => setRw2(Number(e.target.value))} 
                    className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#1565C0]" />
                  <div className="text-right mt-1.5 font-bold text-[#0A2342] text-[15px]">{rw2} / 27 correct</div>
                </div>

                {/* Math 1 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#2E7D32]"></div>
                      <span className="font-bold text-[15px] text-[#0A2342]">Math — Module 1</span>
                    </div>
                    <span className="text-xs font-semibold bg-[#F3F4F6] text-[#4B5563] px-2 py-0.5 rounded-md">22 questions</span>
                  </div>
                  <input type="range" min="0" max="22" value={m1} onChange={e => setM1(Number(e.target.value))} 
                    className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#2E7D32]" />
                  <div className="text-right mt-1.5 font-bold text-[#0A2342] text-[15px]">{m1} / 22 correct</div>
                </div>

                {/* Math 2 */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#7B1FA2]"></div>
                      <span className="font-bold text-[15px] text-[#0A2342]">Math — Module 2</span>
                    </div>
                    <span className="text-xs font-semibold bg-[#F3F4F6] text-[#4B5563] px-2 py-0.5 rounded-md">22 questions</span>
                  </div>
                  <div className="text-[13px] text-[#6B7280] italic mb-3 ml-4.5">(Difficulty depends on your Module 1 performance)</div>
                  <input type="range" min="0" max="22" value={m2} onChange={e => setM2(Number(e.target.value))} 
                    className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#7B1FA2]" />
                  <div className="text-right mt-1.5 font-bold text-[#0A2342] text-[15px]">{m2} / 22 correct</div>
                </div>
              </div>

              {/* Difficulty Toggles */}
              <div className="mt-6 pt-5 border-t border-[#E5E7EB]">
                <div className="text-[13px] font-semibold text-[#6B7280] mb-2 uppercase tracking-wider">Module 2 Difficulty (optional):</div>
                <div className="flex gap-2">
                  {['Easy', 'Standard', 'Hard'].map(d => (
                    <button key={d} onClick={() => setDiff(d)}
                      className={`flex-1 py-1.5 text-sm font-medium rounded-full transition-all border ${
                        diff === d ? 'bg-[#0097A7] text-white border-[#0097A7]' : 'bg-white text-[#4B5563] border-[#D1D5DB] hover:bg-[#F9FAFB]'
                      }`}>
                      {d} {diff === d && '✓'}
                    </button>
                  ))}
                </div>
                <p className="text-[12px] text-[#6B7280] mt-3 leading-relaxed">
                  ⓘ Standard is the most common. Choose Hard if you scored well on Module 1.
                </p>
              </div>

              {/* Submit Button */}
              <button 
                onClick={handleCalculate}
                className="w-full mt-6 h-[52px] rounded-xl text-white font-bold text-[16px] shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg, #0A2342 0%, #0097A7 100%)' }}>
                Calculate My SAT Score →
              </button>
              <div className="text-center text-[#6B7280] text-xs mt-3 font-medium">Results appear instantly — no signup needed</div>

              {/* Live Score Preview */}
              <div className="mt-7 p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <div className="relative pt-6 pb-2">
                  <div className="absolute top-0 -ml-2.5 transition-all duration-300 ease-out" style={{ left: `${markerPos}%` }}>
                    <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#0A2342] mx-auto"></div>
                  </div>
                  <div className="flex h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#C62828]" style={{ width: '41.6%' }}></div> {/* 400-900 */}
                    <div className="bg-[#F9A825]" style={{ width: '16.6%' }}></div> {/* 900-1100 */}
                    <div className="bg-[#1565C0]" style={{ width: '16.6%' }}></div> {/* 1100-1300 */}
                    <div className="bg-[#0097A7]" style={{ width: '12.5%' }}></div> {/* 1300-1450 */}
                    <div className="bg-[#2E7D32]" style={{ width: '12.5%' }}></div> {/* 1450-1600 */}
                  </div>
                </div>
                <div className="text-center mt-2">
                  <span className="text-[#0A2342] font-bold text-xl tracking-tight">Est. Score: {curTotal.toLocaleString()}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: RESULTS PANEL */}
      <AnimatePresence>
        {showResults && (
          <motion.section 
            id="your-score"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-white py-16 px-4 border-b border-[#E5E7EB] overflow-hidden"
          >
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <div className="inline-block px-3 py-1 bg-[#E0F2F1] text-[#00838F] text-[13px] font-bold rounded-full mb-3 tracking-wide">
                  YOUR RESULTS
                </div>
                <h2 className="text-[28px] md:text-3xl font-bold text-[#0A2342]">Your SAT Score Breakdown</h2>
              </div>

              <div className="flex flex-col md:flex-row gap-12 items-center">
                {/* SVG Gauge */}
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="relative w-[280px] h-[280px]">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                     {/* Background Arc */}
                     <circle cx="100" cy="100" r="80" fill="none" stroke="#F1F5F9" strokeWidth="16" />
                     {/* Foreground Dynamic Arc */}
                     <motion.circle 
                       cx="100" cy="100" r="80" fill="none" 
                       stroke={getTier(curTotal).color} 
                       strokeWidth="16"
                       strokeLinecap="round"
                       strokeDasharray="502.65"
                       initial={{ strokeDashoffset: 502.65 }}
                       animate={{ strokeDashoffset: 502.65 - (502.65 * (markerPos / 100)) }}
                       transition={{ duration: 1.5, ease: "easeOut" }}
                     />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                      <span className="text-[#6B7280] font-semibold text-sm uppercase tracking-widest">Total Score</span>
                      <span className="text-5xl font-extrabold text-[#0A2342] tracking-tighter mt-1 mb-1">{curTotal}</span>
                      <span className="text-[#9CA3AF] text-sm">out of 1600</span>
                      <div className="mt-3 px-4 py-1 rounded-full text-white text-xs font-bold shadow-sm" style={{ backgroundColor: getTier(curTotal).color }}>
                        {getTier(curTotal).label.toUpperCase()} SCORE
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-8 mt-6">
                    <div className="text-center">
                      <div className="text-[#6B7280] text-xs font-bold uppercase tracking-wide">Section Scores</div>
                      <div className="text-[#0A2342] font-bold text-lg">{curRw} + {curM}</div>
                    </div>
                    <div className="w-px h-8 bg-[#E5E7EB]"></div>
                    <div className="text-center">
                      <div className="text-[#6B7280] text-xs font-bold uppercase tracking-wide">Percentile</div>
                      <div className="text-[#0A2342] font-bold text-lg">{getPercentile(curTotal)}</div>
                    </div>
                  </div>
                </div>

                {/* Stat Cards */}
                <div className="flex-[1.2] w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0097A7]"></div>
                    <div className="pl-3">
                      <div className="text-[#6B7280] text-sm font-semibold flex items-center gap-2">
                        <span>Reading & Writing Score</span>
                      </div>
                      <div className="text-3xl font-bold text-[#0A2342] mt-3 mb-4">{curRw}</div>
                      <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full overflow-hidden">
                        <motion.div className="bg-[#0097A7] h-full" initial={{ width: 0 }} animate={{ width: `${(curRw/800)*100}%` }} transition={{ duration: 1, delay: 0.2 }}></motion.div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#7B1FA2]"></div>
                    <div className="pl-3">
                      <div className="text-[#6B7280] text-sm font-semibold flex items-center gap-2">
                        <span>Math Score</span>
                      </div>
                      <div className="text-3xl font-bold text-[#0A2342] mt-3 mb-4">{curM}</div>
                      <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full overflow-hidden">
                        <motion.div className="bg-[#7B1FA2] h-full" initial={{ width: 0 }} animate={{ width: `${(curM/800)*100}%` }} transition={{ duration: 1, delay: 0.3 }}></motion.div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#1565C0]"></div>
                    <div className="pl-3">
                      <div className="text-[#6B7280] text-sm font-semibold">National Percentile</div>
                      <div className="text-3xl font-bold text-[#0A2342] mt-2 mb-2">{getPercentile(curTotal)}</div>
                      <div className="text-[13px] text-[#6B7280] leading-snug">You scored higher than {parseInt(getPercentile(curTotal))}% of test takers</div>
                    </div>
                  </div>

                  <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#2E7D32]"></div>
                    <div className="pl-3">
                      <div className="text-[#6B7280] text-sm font-semibold">Score Tier</div>
                      <div className="mt-3 mb-3">
                        <span className="px-3 py-1 text-sm font-bold text-white rounded-md uppercase" style={{ backgroundColor: getTier(curTotal).color }}>
                          {getTier(curTotal).label}
                        </span>
                      </div>
                      <div className="text-[13px] text-[#6B7280] leading-snug">Based on typical 4-year university admissions profiles</div>
                    </div>
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
