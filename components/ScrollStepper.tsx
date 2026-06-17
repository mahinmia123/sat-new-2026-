'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const sections = [
  { id: 'calculator', label: 'Calculator' },
  { id: 'score-distribution', label: 'Score Chart' },
  { id: 'college-match', label: 'College Match' },
  { id: 'score-conversion-table', label: 'Score Tables' },
  { id: 'faq', label: 'FAQ' },
];

export function ScrollStepper() {
  const [activeSection, setActiveSection] = useState('calculator');

  useEffect(() => {
    const handleScroll = () => {
      // Find the current section
      let current = 'calculator'; // Default to first section
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the top of the section is somewhat near the top of viewport (e.g. 150px)
          if (rect.top <= 200) {
            current = section.id;
          }
        }
      }
      if (current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const activeIndex = sections.findIndex(s => s.id === activeSection);

  return (
    <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] shadow-[0_2px_10px_rgba(0,0,0,0.03)] overflow-x-auto hide-scrollbar">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between min-w-[600px]">
        {sections.map((section, index) => {
          const isActive = index === activeIndex;
          const isPassed = index < activeIndex;
          
          return (
            <div key={section.id} className="flex-[1] flex items-center">
              <div 
                className="flex items-center gap-2.5 cursor-pointer group"
                onClick={() => {
                  const el = document.getElementById(section.id);
                  if (el) {
                     const y = el.getBoundingClientRect().top + window.scrollY - 110;
                     window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
              >
                <div 
                  className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    isActive ? 'bg-[#0097A7] text-white ring-4 ring-[#E0F2F1] shadow-sm' :
                    isPassed ? 'bg-[#0A2342] text-white' :
                    'bg-[#F3F4F6] text-[#6B7280] group-hover:bg-[#E5E7EB]'
                  }`}
                >
                  {isPassed ? '✓' : index + 1}
                </div>
                <span className={`text-[13px] font-bold tracking-tight transition-colors whitespace-nowrap ${
                    isActive ? 'text-[#0097A7]' :
                    isPassed ? 'text-[#0A2342]' :
                    'text-[#6B7280] group-hover:text-[#4B5563]'
                  }`}>
                  {section.label}
                </span>
              </div>
              
              {index < sections.length - 1 && (
                <div className="flex-[1] h-[2px] mx-4 bg-[#E5E7EB] overflow-hidden rounded-full min-w-[20px]">
                  <motion.div 
                    className="h-full bg-[#0097A7]"
                    initial={{ width: '0%' }}
                    animate={{ width: isPassed ? '100%' : '0%' }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
