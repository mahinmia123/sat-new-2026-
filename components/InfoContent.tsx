'use client';
import React from 'react';
import { Calculator, CheckCircle, XCircle } from 'lucide-react';

// --- SECTION 9: HOW SCORING WORKS ---
export function EducationalContent() {
  return (
    <section id="how-sat-scoring-works" className="bg-white py-[60px] px-4 border-b border-[#E5E7EB]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[28px] font-bold text-[#0A2342]">How Is the Digital SAT Scored?</h2>
          <p className="text-[#6B7280] mt-2">A step-by-step visual guide to the 2025 Digital SAT scoring process</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-2 mb-16">
           <div className="flex-1 bg-[#0097A7] text-white p-6 rounded-2xl shadow-sm text-center relative w-full lg:w-auto">
             <div className="text-3xl mb-3 opacity-90">📝</div>
             <div className="font-bold text-lg mb-2">Answer Questions</div>
             <div className="text-sm opacity-90 leading-snug">Each correct answer = +1 raw point. No penalty for wrong answers.</div>
             <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 z-10 text-[#0097A7]">▶</div>
           </div>
           
           <div className="flex-1 bg-[#1565C0] text-white p-6 rounded-2xl shadow-sm text-center relative w-full lg:w-auto mt-4 lg:mt-0">
             <div className="text-3xl mb-3 opacity-90">🔀</div>
             <div className="font-bold text-lg mb-2">Module 2 Adapts</div>
             <div className="text-sm opacity-90 leading-snug">Your M1 score determines if M2 is Easy or Hard difficulty.</div>
             <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 z-10 text-[#1565C0]">▶</div>
           </div>

           <div className="flex-1 bg-[#0A2342] text-white p-6 rounded-2xl shadow-sm text-center w-full lg:w-auto mt-4 lg:mt-0 relative">
             <div className="text-3xl mb-3 opacity-90">📊</div>
             <div className="font-bold text-lg mb-2">Raw → Scaled</div>
             <div className="text-sm opacity-90 leading-snug">College Board converts total raw score to a 200–800 scale per section.</div>
             <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 z-10 text-[#0A2342]">▶</div>
           </div>

           <div className="flex-1 bg-[#2E7D32] text-white p-6 rounded-2xl shadow-sm text-center w-full lg:w-auto mt-4 lg:mt-0">
             <div className="text-3xl mb-3 opacity-90">🏆</div>
             <div className="font-bold text-lg mb-2">Total Score</div>
             <div className="text-sm opacity-90 leading-snug">Math (200–800) + Reading & Writing (200–800) = Total (400–1600).</div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-[#E5E7EB] p-8 rounded-3xl bg-[#F8FAFC]">
            <h3 className="text-xl font-bold text-[#0A2342] mb-5">Reading & Writing Section</h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3 text-[15px] text-[#4B5563]"><span className="text-[#0097A7] mt-1">●</span> Module 1 — 27 questions, 32 mins</li>
              <li className="flex items-start gap-3 text-[15px] text-[#4B5563]"><span className="text-[#1565C0] mt-1">●</span> Module 2 — 27 questions, 32 mins (adaptive)</li>
            </ul>
            <hr className="border-[#E2E8F0] mb-5"/>
            <div className="font-bold text-[#0A2342] mb-1">Total questions: 54</div>
            <div className="font-bold text-[#0A2342] mb-5">Section score range: 200–800</div>
            <div className="bg-[#FFF8E1] text-[#F57F17] text-sm p-3 rounded-lg flex gap-2"><span className="font-bold">ⓘ</span>High Mod 1 score → Harder Mod 2 → Higher score ceiling</div>
          </div>
          
          <div className="border border-[#E5E7EB] p-8 rounded-3xl bg-[#F8FAFC]">
            <h3 className="text-xl font-bold text-[#0A2342] mb-5">Math Section</h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3 text-[15px] text-[#4B5563]"><span className="text-[#2E7D32] mt-1">●</span> Module 1 — 22 questions, 35 mins</li>
              <li className="flex items-start gap-3 text-[15px] text-[#4B5563]"><span className="text-[#7B1FA2] mt-1">●</span> Module 2 — 22 questions, 35 mins (adaptive)</li>
            </ul>
            <hr className="border-[#E2E8F0] mb-5"/>
            <div className="font-bold text-[#0A2342] mb-1">Total questions: 44</div>
            <div className="font-bold text-[#0A2342] mb-5">Section score range: 200–800</div>
            <div className="bg-[#F3F4F6] text-[#4B5563] text-sm p-3 rounded-lg flex gap-2"><span className="font-bold text-[#6B7280]">ⓘ</span>Built-in Desmos graphing calculator allowed for ALL questions</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- SECTION 13: POLICY UPDATE ---
export function PolicyContent() {
  return (
    <section id="calculator-policy-2025" className="bg-white py-[60px] px-4 border-b border-[#E5E7EB]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex flex-col items-start">
           <span className="inline-block bg-[#FFF3E0] text-[#E65100] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-[#FFE0B2]">
             ⚠ Policy Update — August 2025
           </span>
           <h2 className="text-[28px] font-bold text-[#0A2342]">New SAT Calculator Policy for 2025–2026</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-10 border border-[#E5E7EB] p-8 rounded-3xl shadow-sm bg-[#F8FAFC]">
          <div className="flex-[1.2]">
            <h3 className="text-lg font-bold text-[#0A2342] mb-3">What Changed?</h3>
            <p className="text-[#4B5563] leading-relaxed mb-8">
              Starting August 2025, the College Board banned CAS (Computer Algebra System) calculators from all SAT and PSAT tests, including in-school administrations from October 2025 onward.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h4 className="text-[#C62828] font-bold mb-3 flex items-center gap-2 border-b border-[#FECACA] pb-2">
                  <XCircle size={18} /> No longer allowed:
                </h4>
                <ul className="space-y-2 text-[15px] text-[#4B5563]">
                  <li>• TI-Nspire CAS models</li>
                  <li>• HP Prime</li>
                  <li>• Casio ClassPad</li>
                  <li>• Any calculator with CAS</li>
                </ul>
              </div>
              <div>
                <h4 className="text-[#2E7D32] font-bold mb-3 flex items-center gap-2 border-b border-[#bbf7d0] pb-2">
                  <CheckCircle size={18} /> Still allowed:
                </h4>
                <ul className="space-y-2 text-[15px] text-[#4B5563]">
                  <li>• TI-84 Plus (all series without CAS)</li>
                  <li>• TI-Nspire (non-CAS version)</li>
                  <li>• Casio fx-9750GII / fx-9860GII</li>
                   <li>• Standard Scientific models</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
             <div className="bg-[#0A2342] text-white p-8 rounded-2xl shadow-lg relative overflow-hidden h-full flex flex-col justify-center border border-[#1e446d]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1565C0] rounded-full blur-3xl opacity-50 -mr-10 -mt-10 pointer-events-none"></div>
                <div className="relative z-10">
                  <Calculator size={48} className="text-[#F9A825] mb-5 opacity-90" />
                  <h3 className="text-lg font-bold mb-2 text-white">CAS Calculators Banned</h3>
                  <p className="text-blue-100 text-[13px] mb-6 leading-relaxed">
                    Effective August 2025 Weekend SAT and October 2025 School-Day SAT administrations globally.
                  </p>
                  
                  <div className="bg-[#1e3a5f] border-l-4 border-[#0097A7] pl-4 pr-3 py-3 rounded text-[13px] text-white font-medium leading-[1.6]">
                    The built-in Desmos graphing calculator remains available for ALL math questions in the digital Bluebook app. No external calculator is strictly required.
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
