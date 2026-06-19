'use client';
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SiteHeader, CalculatorCore } from '@/components/CalculatorCore';
import { ScoreDistributions, CollegeMatch, ScoreTiersVisual } from '@/components/DataVisuals';
import { ConversionTables, PercentileTable } from '@/components/DataTables';
import { SuperscoreCalculator, TargetScoreCalculator, ActConverter } from '@/components/BonusTools';
import { PsatCalculator } from '@/components/PsatCalculator';
import { ActCalculator } from '@/components/ActCalculator';
import { EducationalContent, PolicyContent } from '@/components/InfoContent';
import { FaqSection, RelatedCalculators, SiteFooter } from '@/components/FaqAndFooter';

import { ScrollStepper } from '@/components/ScrollStepper';

function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [calcStats, setCalcStats] = useState<any>(null);

  return (
    <>
      <SiteHeader />
      <ScrollStepper />
      <main className="w-full">
        {/* Section 2 & 3 */}
        <Reveal>
          <CalculatorCore onCalculate={setCalcStats} />
        </Reveal>
        
        {/* Section 4 */}
        <Reveal>
          <ScoreDistributions />
        </Reveal>
        
        {/* Section 5 */}
        <Reveal>
          <CollegeMatch baseScore={calcStats ? calcStats.total : 1240} />
        </Reveal>
        
        {/* Section 6 */}
        <Reveal>
          <ScoreTiersVisual />
        </Reveal>
        
        {/* Section 7 */}
        <Reveal>
          <PsatCalculator />
        </Reveal>

        {/* Section 8 */}
        <Reveal>
          <ActCalculator />
        </Reveal>

        {/* Section 9 */}
        <Reveal>
          <ConversionTables />
        </Reveal>
        
        {/* Section 10 */}
        <Reveal>
          <PercentileTable />
        </Reveal>
        
        {/* Section 11 */}
        <Reveal>
          <EducationalContent />
        </Reveal>
        
        {/* Section 12 */}
        <Reveal>
          <SuperscoreCalculator />
        </Reveal>
        
        {/* Section 13 */}
        <Reveal>
          <TargetScoreCalculator />
        </Reveal>
        
        {/* Section 14 */}
        <Reveal>
          <ActConverter />
        </Reveal>
        
        {/* Section 15 */}
        <Reveal>
          <PolicyContent />
        </Reveal>
        
        {/* Section 16 */}
        <Reveal>
          <FaqSection />
        </Reveal>
        
        {/* Section 17 */}
        <Reveal>
          <RelatedCalculators />
        </Reveal>
      </main>

      {/* Section 18 */}
      <SiteFooter />
    </>
  );
}
