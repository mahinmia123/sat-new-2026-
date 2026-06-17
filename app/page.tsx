'use client';
import React, { useState } from 'react';
import { SiteHeader, CalculatorCore } from '@/components/CalculatorCore';
import { ScoreDistributions, CollegeMatch, ScoreTiersVisual } from '@/components/DataVisuals';
import { ConversionTables, PercentileTable } from '@/components/DataTables';
import { SuperscoreCalculator, TargetScoreCalculator, ActConverter } from '@/components/BonusTools';
import { EducationalContent, PolicyContent } from '@/components/InfoContent';
import { FaqSection, RelatedCalculators, SiteFooter } from '@/components/FaqAndFooter';

export default function Home() {
  const [calcStats, setCalcStats] = useState<any>(null);

  return (
    <>
      <SiteHeader />
      <main className="w-full">
        {/* Section 2 & 3 */}
        <CalculatorCore onCalculate={setCalcStats} />
        
        {/* Section 4 */}
        <ScoreDistributions />
        
        {/* Section 5 */}
        <CollegeMatch baseScore={calcStats ? calcStats.total : 1240} />
        
        {/* Section 6 */}
        <ScoreTiersVisual />
        
        {/* Section 7 */}
        <ConversionTables />
        
        {/* Section 8 */}
        <PercentileTable />
        
        {/* Section 9 */}
        <EducationalContent />
        
        {/* Section 10 */}
        <SuperscoreCalculator />
        
        {/* Section 11 */}
        <TargetScoreCalculator />
        
        {/* Section 12 */}
        <ActConverter />
        
        {/* Section 13 */}
        <PolicyContent />
        
        {/* Section 14 */}
        <FaqSection />
        
        {/* Section 15 */}
        <RelatedCalculators />
      </main>

      {/* Section 16 */}
      <SiteFooter />
    </>
  );
}
