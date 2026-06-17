'use client';
import React, { useState } from 'react';
import { Calculator, ChevronDown, CheckCircle, FileText, BarChart2 } from 'lucide-react';

// --- SECTION 14: FAQ ---
export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  
  const faqs = [
    { q: "How accurate is the SAT score calculator?", a: "This calculator uses official College Board scoring conversion tables and is generally accurate within ±20–30 points. Results are estimates and actual scores may vary depending on question difficulty and adaptive routing." },
    { q: "What is a good SAT score for college admission?", a: "A score of 1200 or above places you in the 74th percentile, which is competitive for most 4-year universities. For highly selective schools like the Ivy League, a score of 1500+ is typically expected." },
    { q: "How is the Digital SAT different from the old SAT?", a: "The Digital SAT (DSAT) launched in March 2024. It is shorter (2 hours 14 min vs 3+ hours), fully adaptive with 4 modules instead of rigid sections, and securely tracked using the Bluebook software. Scores still range from 400–1600." },
    { q: "What is SAT superscoring and do all colleges accept it?", a: "SAT superscoring means colleges take your highest section scores across multiple test dates and combine them into one composite score. Over 90% of U.S. colleges accept superscores, but always verify with each individual school." },
    { q: "How many times can I take the SAT?", a: "There is no official limit to how many times you can take the SAT. Most colleges see all scores unless they offer Score Choice. Experts recommend taking the SAT 2–3 times for optimal results." },
    { q: "Is a 1200 a good SAT score?", a: "Yes — 1200 places you at approximately the 74th percentile, meaning you scored better than 74% of all test takers. It makes you competitive for most state universities and many private colleges." },
    { q: "Is a 1400 a good SAT score?", a: "A 1400 is an excellent score placing you at the 94th percentile. You would be competitive for many top-20 universities including Georgetown, University of Michigan, UCLA, and NYU." },
    { q: "Can I get a perfect 1600 on the SAT?", a: "Yes. A perfect 1600 requires 800 in both Math and Reading & Writing. In rare cases, College Board's equating process allows one wrong answer and still results in an 800 for a section. About 0.1–0.5% of students achieve a perfect score." },
    { q: "How long are SAT scores valid?", a: "SAT scores are valid for 5 years from the test date. Most colleges accept scores within this window. Always check each college's policy on score expiration, especially for older test dates." },
    { q: "What is the average SAT score?", a: "The national average SAT score is approximately 1,050 (50th percentile) for all test takers. For college-bound seniors specifically, the average is slightly higher at around 1,080–1,100." },
    { q: "Does the Digital SAT still penalize wrong answers?", a: "No. The Digital SAT uses rights-only scoring — you earn +1 point for each correct answer and 0 points for wrong or blank answers. Always guess rather than leave a question blank." },
    { q: "How do I calculate my SAT score from a practice test?", a: "Count the number of correct answers in each module (R&W M1, R&W M2, Math M1, Math M2). Add R&W modules together and Math modules together to get two raw scores. Use our calculator above to convert these raw totals to your 400–1600 scaled score." }
  ];

  return (
    <section id="faq" className="bg-[#F0F4F8] py-[60px] px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-[28px] font-bold text-[#0A2342]">Frequently Asked Questions About SAT Scoring</h2>
          <p className="text-[#6B7280] mt-2">Everything you need to know about Digital SAT scores</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-[#E5E7EB] rounded-[12px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200">
              <button 
                onClick={() => setOpenIdx(openIdx === i ? null : i)} 
                className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-[#F9FAFB] transition-colors focus:outline-none"
              >
                <span className="font-bold text-[16px] text-[#0A2342] pr-4 leading-snug">{faq.q}</span>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIdx === i ? 'bg-[#0A2342] text-white' : 'bg-gray-100 text-[#0A2342]'}`}>
                  <ChevronDown size={20} className={`transition-transform duration-300 ${openIdx === i ? 'rotate-180' : ''}`} />
                </div>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIdx === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                style={{ maxHeight: openIdx === i ? '300px' : '0' }}
              >
                <div className="px-5 pb-6 pt-0 text-[15px] text-[#6B7280] leading-[1.7] border-t border-transparent">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- SECTION 15: RELATED CALCULATORS ---
export function RelatedCalculators() {
  return (
    <section className="bg-white py-[48px] px-4 border-t border-[#E5E7EB]">
       <div className="max-w-6xl mx-auto">
          <h2 className="text-[24px] font-bold text-[#0A2342] text-center mb-8">More Free Score Calculators</h2>
          
          <div className="flex overflow-x-auto pb-6 gap-5 snap-x lg:grid lg:grid-cols-4 hide-scrollbar">
             {[
               { icon: <FileText size={24} />, title: "PSAT Score Calculator", desc: "Convert your PSAT raw scores and check National Merit eligibility." },
               { icon: <span className="font-bold text-2xl leading-none">A</span>, title: "ACT Score Calculator", desc: "Enter your correct answers and get your ACT composite score." },
               { icon: <BarChart2 size={24} />, title: "SAT Score Chart 2025", desc: "Full raw-to-scaled score conversion tables for all test forms." },
               { icon: <span className="font-bold text-2xl leading-none">⇄</span>, title: "SAT to ACT Converter", desc: "Official College Board concordance table — find your equivalent score." }
             ].map((item, i) => (
                <div key={i} className="min-w-[260px] w-[260px] lg:w-auto snap-center shrink-0 bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm hover:border-[#0097A7] hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col items-start hover:-translate-y-1">
                   <div className="w-12 h-12 rounded-xl bg-[#F0F4F8] text-[#0097A7] group-hover:bg-[#0097A7] group-hover:text-white transition-colors flex items-center justify-center mb-5">
                      {item.icon}
                   </div>
                   <h3 className="font-bold text-[#0A2342] mb-2">{item.title}</h3>
                   <p className="text-sm text-[#6B7280] leading-relaxed mb-6 flex-1">{item.desc}</p>
                   <button className="text-[13px] font-bold text-[#0097A7] uppercase tracking-wide group-hover:underline mt-auto">
                     Try Tool →
                   </button>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
}

// --- SECTION 16: FOOTER ---
export function SiteFooter() {
  return (
    <footer className="bg-[#0A2342] text-white pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-2 bg-red- ml lg:grid-cols-4 gap-10 mb-12">
            <div className="col-span-1 pr-6">
               <div className="flex items-center gap-2 mb-4">
                  <Calculator size={24} className="text-[#0097A7]" />
                  <span className="font-bold text-xl tracking-tight text-white">FreeSATCalculator</span>
               </div>
               <p className="text-[14px] text-[#9CA3AF] leading-relaxed">
                 Free, accurate SAT score calculator for the 2025–2026 Digital SAT. Completely private, secure, and no login required.
               </p>
            </div>
            
            <div>
              <h4 className="font-bold text-[15px] mb-4 text-white uppercase tracking-wider">Calculators</h4>
              <ul className="space-y-3 text-[14px] text-[#9CA3AF]">
                <li><a href="#" className="hover:text-[#0097A7] transition-colors">SAT Score Calculator</a></li>
                <li><a href="#" className="hover:text-[#0097A7] transition-colors">PSAT Score Calculator</a></li>
                <li><a href="#superscore" className="hover:text-[#0097A7] transition-colors">SAT Superscore Calculator</a></li>
                <li><a href="#sat-to-act" className="hover:text-[#0097A7] transition-colors">SAT to ACT Converter</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[15px] mb-4 text-white uppercase tracking-wider">Resources</h4>
              <ul className="space-y-3 text-[14px] text-[#9CA3AF]">
                <li><a href="#good-sat-score" className="hover:text-[#0097A7] transition-colors">What is a Good SAT Score?</a></li>
                <li><a href="#score-conversion-table" className="hover:text-[#0097A7] transition-colors">SAT Score Chart 2025</a></li>
                <li><a href="#sat-percentile" className="hover:text-[#0097A7] transition-colors">SAT Percentile Rankings</a></li>
                <li><a href="#how-sat-scoring-works" className="hover:text-[#0097A7] transition-colors">How the SAT is Scored</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[15px] mb-4 text-white uppercase tracking-wider">About</h4>
              <ul className="space-y-3 text-[14px] text-[#9CA3AF] mb-6">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
              <div className="flex gap-3">
                 <div className="bg-[#152e4d] px-3 py-1.5 rounded-lg text-xs font-bold text-[#8fb5e0] flex items-center gap-1.5 border border-[#1e446d]">
                    🔒 Secure
                 </div>
                 <div className="bg-[#152e4d] px-3 py-1.5 rounded-lg text-xs font-bold text-[#8fb5e0] flex items-center gap-1.5 border border-[#1e446d]">
                    📅 Updated 2025
                 </div>
              </div>
            </div>
         </div>
         
         <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[14px] text-[#9CA3AF] font-medium">© {new Date().getFullYear()} FreeSATCalculator.com — All rights reserved.</div>
            <div className="text-[12px] text-[#6B7280] text-center md:text-right max-w-[500px] leading-relaxed">
               Not affiliated with or endorsed by College Board®. SAT® is a trademark registered by College Board. All calculations provided are estimates based on public concordance guidelines.
            </div>
         </div>
      </div>
    </footer>
  );
}
