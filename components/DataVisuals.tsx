'use client';
import React, { useState } from 'react';

// --- SECTION 4: SCORE DISTRIBUTION CHARTS ---
export function ScoreDistributions() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["R&W Module 1", "R&W Module 2", "Math Module 1", "Math Module 2"];
  
  // Dummy data demonstrating Albert.io style visual distributions
  const chartData = [
    { range: "24-27", pct: 15, desc: "Top performers. You have mastered this section's concepts." },
    { range: "20-23", pct: 28, isUser: true, desc: "Strong performance. You are likely to score highly overall." },
    { range: "16-19", pct: 32, desc: "Average performance. There is room for improvement on trickier questions." },
    { range: "12-15", pct: 18, desc: "Below average. Reviewing fundamental concepts will help increase this score." },
    { range: "0-11", pct: 7, desc: "Needs significant improvement. Focus deeply on foundational skills and question types." }
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="score-distribution" className="bg-[#F0F4F8] py-[60px] px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-[28px] font-bold text-[#0A2342]">How Do You Compare to Other Students?</h2>
          <p className="text-[#6B7280] mt-2 font-medium">Score distribution from thousands of students on practice exams</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab, i) => (
            <button key={tab} onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === i ? 'bg-[#0A2342] text-white' : 'bg-white text-[#6B7280] shadow-sm hover:text-[#0A2342]'}`}>
              {tab} {activeTab === i && '✓'}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#E5E7EB]">
          <h3 className="text-lg font-bold text-[#0A2342]">{tabs[activeTab]} Score Distribution</h3>
          <p className="text-sm text-[#6B7280] mb-8">Based on practice exam data from SAT students</p>

          <div className="space-y-4">
            {chartData.map((d, i) => (
              <div 
                key={i} 
                className="flex items-center gap-4 relative"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="w-14 text-right text-sm font-bold text-[#0A2342]">{d.range}</div>
                <div className="flex-1 h-8 bg-[#F3F4F6] rounded-md relative flex items-center cursor-help">
                  <div 
                    className={`h-full flex items-center px-3 font-medium text-xs rounded-l-md ${d.pct * 2.5 === 100 ? 'rounded-r-md' : ''} ${d.isUser ? 'bg-[#0A2342] text-white' : 'bg-gradient-to-r from-[#0097A7] to-[#80DEEA] text-white'} transition-all`} 
                    style={{ width: `${d.pct * 2.5}%` }}>
                    {d.pct}%
                  </div>
                  
                  {hoveredIndex === i && (
                    <div className="absolute left-0 top-10 w-64 bg-[#0A2342] text-white text-xs p-3 rounded-lg shadow-xl z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="absolute -top-1.5 left-6 w-3 h-3 bg-[#0A2342] rotate-45"></div>
                      <div className="relative z-10">
                        <span className="font-bold text-sm block mb-1">Score Range {d.range} ({d.pct}% of students)</span>
                        <span className="text-[#9CA3AF] leading-relaxed">{d.desc}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-[#F8FAFC] border border-[#cbd5e1] rounded-xl p-4 flex items-center gap-3">
             <div className="bg-[#0A2342] text-white text-xs font-bold px-2 py-1 rounded">▲</div>
             <p className="text-sm font-medium text-[#0A2342]">Your score falls in the top 28% of students on this module</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- SECTION 5: COLLEGE MATCH ---
export function CollegeMatch({ baseScore = 1240 }: { baseScore?: number }) {
  const matchTiers = [
    { title: "Ivy League & MIT", range: "1,500+", req: 1500, color: "#0A2342", schools: "Harvard, Yale, Princeton, MIT" },
    { title: "Top 20 Universities", range: "1,400 – 1,550", req: 1400, color: "#1565C0", schools: "Duke, Northwestern, UCLA, UMich" },
    { title: "Top 50 Universities", range: "1,280 – 1,420", req: 1280, color: "#0097A7", schools: "Boston U, Tulane, UC Santa Barbara" },
    { title: "State Universities", range: "1,100 – 1,300", req: 1100, color: "#2E7D32", schools: "Penn State, Univ of Florida, Ohio State" },
    { title: "Community & Reg.", range: "900 – 1,100", req: 0, color: "#F9A825", schools: "Open-enrollment programs" },
  ];

  return (
    <section id="college-match" className="bg-white py-[60px] px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 bg-[#E0F2F1] text-[#00838F] text-[13px] font-bold rounded-full mb-3 tracking-wide">
            COLLEGE MATCHING
          </div>
          <h2 className="text-[28px] font-bold text-[#0A2342] mb-2">Which Colleges Match Your Score?</h2>
          <p className="text-[#6B7280]">Your estimated score of <strong className="text-[#0A2342]">{baseScore}</strong> qualifies you for these college tiers</p>
        </div>

        <div className="flex overflow-x-auto pb-8 gap-5 snap-x hide-scrollbar">
          {matchTiers.map((tier, i) => {
             const isMatch = baseScore >= tier.req && (i === 0 || baseScore < matchTiers[i-1].req);
             const almostMatch = !isMatch && baseScore < tier.req && baseScore >= tier.req - 100;
             return (
              <div key={tier.title} className={`min-w-[280px] w-[280px] snap-center shrink-0 bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${isMatch ? 'border-2 border-[#0A2342] shadow-md scale-[1.02]' : 'border border-[#E5E7EB]'}`}>
                <div className="h-16 flex items-center justify-center font-bold text-white relative" style={{ backgroundColor: tier.color }}>
                   {isMatch && <div className="absolute -top-3 right-3 bg-[#F9A825] text-[#0A2342] text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm border border-yellow-200">YOUR TIER</div>}
                   {tier.title}
                </div>
                <div className="p-5 flex flex-col h-[220px]">
                  <div className="font-bold text-[#0097A7] mb-3">{tier.range}</div>
                  <div className="text-[13px] text-[#6B7280] leading-relaxed flex-1">
                    <span className="font-semibold block mb-1">Typical Schools:</span>
                    {tier.schools}
                  </div>
                  
                  <div className="mt-auto">
                    {isMatch ? (
                      <div className="w-full text-center py-2 bg-[#E8F5E9] text-[#2E7D32] font-bold text-sm rounded-lg flex justify-center items-center gap-1.5">
                        <span className="text-lg leading-none">✓</span> You Qualify
                      </div>
                    ) : almostMatch ? (
                      <div className="w-full text-center py-2 bg-[#FFF8E1] text-[#F57F17] font-bold text-sm rounded-lg">
                        Almost There (+{tier.req - baseScore} pts)
                      </div>
                    ) : (
                      <div className="w-full text-center py-2 bg-[#F3F4F6] text-[#9CA3AF] font-bold text-sm rounded-lg">
                        Higher Score Needed
                      </div>
                    )}
                  </div>
                </div>
              </div>
             )
          })}
        </div>
      </div>
    </section>
  );
}

// --- SECTION 6: WHAT IS A GOOD SAT SCORE ---
export function ScoreTiersVisual() {
  return (
    <section id="good-sat-score" className="bg-[#F0F4F8] py-[60px] px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[28px] font-bold text-[#0A2342]">What Is a Good SAT Score?</h2>
          <p className="text-[#6B7280] mt-2">Score tiers based on national percentile data from College Board</p>
        </div>

        <div className="mb-16 relative">
          <div className="flex h-20 rounded-xl overflow-hidden shadow-sm font-bold text-white">
             <div className="bg-[#C62828] w-[20%] flex flex-col justify-center items-center text-center px-1">
               <span className="text-xs lg:text-sm">400-870</span><span className="text-[10px] lg:text-xs font-medium opacity-80 uppercase leading-tight mt-0.5">Below Avg</span>
             </div>
             <div className="bg-[#F9A825] w-[20%] flex flex-col justify-center items-center text-center px-1">
               <span className="text-xs lg:text-sm">870-1050</span><span className="text-[10px] lg:text-xs font-medium opacity-80 uppercase leading-tight mt-0.5">Average</span>
             </div>
             <div className="bg-[#1565C0] w-[20%] flex flex-col justify-center items-center text-center px-1">
               <span className="text-xs lg:text-sm">1050-1200</span><span className="text-[10px] lg:text-xs font-medium opacity-80 uppercase leading-tight mt-0.5">Good</span>
             </div>
             <div className="bg-[#0097A7] w-[20%] flex flex-col justify-center items-center text-center px-1">
               <span className="text-xs lg:text-sm">1200-1400</span><span className="text-[10px] lg:text-xs font-medium opacity-80 uppercase leading-tight mt-0.5">Great</span>
             </div>
             <div className="bg-[#2E7D32] w-[20%] flex flex-col justify-center items-center text-center px-1">
               <span className="text-xs lg:text-sm">1400-1600</span><span className="text-[10px] lg:text-xs font-medium opacity-80 uppercase leading-tight mt-0.5">Exceptional</span>
             </div>
          </div>
          <div className="absolute top-[85px] left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[10px] border-l-transparent border-r-transparent border-b-[#0A2342] rotate-180"></div>
            <div className="bg-[#0A2342] text-white text-xs font-bold px-2 py-1 rounded shadow-md mt-1 whitespace-nowrap">Your Score: 1,240</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-sm">
            <div className="text-[28px] font-black text-[#F9A825] mb-2 leading-none">1,050</div>
            <div className="font-bold text-[#0A2342] mb-1">Average SAT Score</div>
            <p className="text-sm text-[#6B7280]">National average for all test takers (50th percentile). Good for many regional universities and community colleges.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-sm">
            <div className="text-[28px] font-black text-[#1565C0] mb-2 leading-none">1,200+</div>
            <div className="font-bold text-[#0A2342] mb-1">Good SAT Score</div>
            <p className="text-sm text-[#6B7280]">Above average (74th %ile). Competitive for most 4-year state universities and less selective private colleges.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-sm">
            <div className="text-[28px] font-black text-[#0097A7] mb-2 leading-none">1,400+</div>
            <div className="font-bold text-[#0A2342] mb-1">Great SAT Score</div>
            <p className="text-sm text-[#6B7280]">Highly competitive (94th %ile). Strong candidate for top 20-50 universities nationwide.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-sm">
            <div className="text-[28px] font-black text-[#2E7D32] mb-2 leading-none">1,600</div>
            <div className="font-bold text-[#0A2342] mb-1">Perfect SAT Score</div>
            <p className="text-sm text-[#6B7280]">Maximum possible. Achieved by less than 1% of all test takers. Ivy League tier.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
