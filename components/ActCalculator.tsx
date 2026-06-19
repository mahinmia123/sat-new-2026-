'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Simplified ACT Concordance for demo purposes
function getActSectionScore(raw: number, maxRaw: number) {
  if (raw <= 0) return 1;
  if (raw >= maxRaw) return 36;
  // Basic linear distribution + some curve
  let ratio = raw / maxRaw;
  let score = Math.round(ratio * 36);
  if (score < 1) score = 1;
  if (score > 36) score = 36;
  return score;
}

export function ActCalculator() {
  const [english, setEnglish] = useState(60);
  const [math, setMath] = useState(48);
  const [reading, setReading] = useState(30);
  const [science, setScience] = useState(28);
  const [showResults, setShowResults] = useState(false);

  const eScore = getActSectionScore(english, 75);
  const mScore = getActSectionScore(math, 60);
  const rScore = getActSectionScore(reading, 40);
  const sScore = getActSectionScore(science, 40);
  const composite = Math.round((eScore + mScore + rScore + sScore) / 4);

  const handleCalculate = () => {
    setShowResults(true);
    setTimeout(() => {
      document.getElementById('your-act-score')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  const markerPos = ((composite - 1) / (36 - 1)) * 100;

  return (
    <>
      <section id="act-calculator" className="bg-[#F0F4F8] pt-16 pb-16 px-4 border-t border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:items-center">
          
          <div className="flex-1 w-full lg:w-[55%]">
            <h2 className="text-3xl md:text-[38px] font-bold text-[#0A2342] leading-[1.15] tracking-tight">
              ACT Score Calculator
            </h2>
            <p className="mt-4 text-[#6B7280] text-lg leading-relaxed max-w-xl">
              Enter your raw scores (correct answers) for all four ACT sections. Our calculator will instantly determine your scaled section scores (1-36) and your overall composite score.
            </p>
            
            <div className="flex flex-wrap gap-3 mt-6">
              {["English (75Qs)", "Math (60Qs)", "Reading (40Qs)", "Science (40Qs)"].map(pill => (
                <div key={pill} className="flex items-center gap-1.5 bg-white text-[#0A2342] px-3 py-1.5 rounded-full text-sm font-bold border border-[#E5E7EB] shadow-sm">
                  <span>{pill}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full lg:w-[45%]">
            <div className="w-full bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-[#E5E7EB] p-5 md:p-7 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#1565C0]"></div>
              
              <div className="mb-6 pl-2">
                <h3 className="text-xl font-bold text-[#0A2342]">Raw ACT Scores</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-[15px] text-[#0A2342]">English</span>
                  </div>
                  <input type="range" min="0" max="75" value={english} onChange={e => setEnglish(Number(e.target.value))} 
                    className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#1565C0]" />
                  <div className="text-right mt-1.5 font-bold text-[#0A2342] text-[14px]">{english} / 75 correct</div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-[15px] text-[#0A2342]">Math</span>
                  </div>
                  <input type="range" min="0" max="60" value={math} onChange={e => setMath(Number(e.target.value))} 
                    className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#1565C0]" />
                  <div className="text-right mt-1.5 font-bold text-[#0A2342] text-[14px]">{math} / 60 correct</div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-[15px] text-[#0A2342]">Reading</span>
                  </div>
                  <input type="range" min="0" max="40" value={reading} onChange={e => setReading(Number(e.target.value))} 
                    className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#1565C0]" />
                  <div className="text-right mt-1.5 font-bold text-[#0A2342] text-[14px]">{reading} / 40 correct</div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-[15px] text-[#0A2342]">Science</span>
                  </div>
                  <input type="range" min="0" max="40" value={science} onChange={e => setScience(Number(e.target.value))} 
                    className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#1565C0]" />
                  <div className="text-right mt-1.5 font-bold text-[#0A2342] text-[14px]">{science} / 40 correct</div>
                </div>
              </div>

              <button 
                onClick={handleCalculate}
                className="w-full mt-8 h-[52px] rounded-xl text-white font-bold text-[16px] shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: '#1565C0' }}>
                Calculate ACT Composite
              </button>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showResults && (
          <motion.section 
            id="your-act-score"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-white py-16 px-4 border-b border-[#E5E7EB] overflow-hidden"
          >
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-[28px] font-bold text-[#0A2342] mb-10">Your Estimated ACT Score</h2>

              <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
                <div className="flex-1 max-w-sm flex flex-col items-center justify-center bg-[#F8FAFC] rounded-3xl p-8 border border-[#E5E7EB] shadow-sm">
                    <div className="text-[#6B7280] font-bold uppercase tracking-widest text-sm mb-4">Composite Score</div>
                    <div className="text-7xl font-extrabold text-[#1565C0] tracking-tighter mb-2">{composite}</div>
                    <div className="text-[#9CA3AF] text-sm font-medium">Out of 36</div>
                </div>

                <div className="flex-1 w-full grid grid-cols-2 gap-4">
                  <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-5 text-left">
                    <div className="text-[#6B7280] text-[13px] font-bold uppercase tracking-wider">English</div>
                    <div className="text-3xl font-bold text-[#0A2342] mt-2">{eScore}</div>
                  </div>
                  <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-5 text-left">
                    <div className="text-[#6B7280] text-[13px] font-bold uppercase tracking-wider">Math</div>
                    <div className="text-3xl font-bold text-[#0A2342] mt-2">{mScore}</div>
                  </div>
                  <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-5 text-left">
                    <div className="text-[#6B7280] text-[13px] font-bold uppercase tracking-wider">Reading</div>
                    <div className="text-3xl font-bold text-[#0A2342] mt-2">{rScore}</div>
                  </div>
                  <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-5 text-left">
                    <div className="text-[#6B7280] text-[13px] font-bold uppercase tracking-wider">Science</div>
                    <div className="text-3xl font-bold text-[#0A2342] mt-2">{sScore}</div>
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
