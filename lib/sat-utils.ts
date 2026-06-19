import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Math map based on 44 questions total (22 per module)
export const mathScoreMap = [
  [0, 200], [5, 320], [10, 400], [15, 470], [20, 530],
  [25, 590], [30, 650], [35, 700], [40, 760], [44, 800]
];

// R&W map based on 54 questions total (27 per module)
export const rwScoreMap = [
  [0, 200], [5, 280], [10, 360], [15, 410], [20, 460],
  [25, 510], [30, 560], [35, 610], [40, 660], [45, 710], 
  [50, 760], [54, 800]
];

// PSAT Math map (Max 760)
export const psatMathScoreMap = [
  [0, 160], [5, 280], [10, 360], [15, 440], [20, 500],
  [25, 560], [30, 620], [35, 670], [40, 730], [44, 760]
];

// PSAT R&W map (Max 760)
export const psatRwScoreMap = [
  [0, 160], [5, 250], [10, 330], [15, 390], [20, 440],
  [25, 490], [30, 530], [35, 580], [40, 630], [45, 680], 
  [50, 730], [54, 760]
];

// ACT Concordance Map
export const actMap = [
  [1600, 36], [1540, 35], [1480, 34], [1420, 32], [1350, 30], 
  [1280, 28], [1200, 25], [1110, 22], [1010, 19], [910, 17], [800, 13]
];

function interpolate(val: number, map: number[][]) {
  if (val <= map[0][0]) return map[0][1];
  if (val >= map[map.length - 1][0]) return map[map.length - 1][1];
  
  for (let i = 0; i < map.length - 1; i++) {
    const [x1, y1] = map[i];
    const [x2, y2] = map[i+1];
    
    if (val >= x1 && val <= x2) {
      const ratio = (val - x1) / (x2 - x1);
      return y1 + ratio * (y2 - y1);
    }
  }
  return map[0][1];
}

export function calculateSectionScore(rawM1: number, rawM2: number, difficulty: string, section: 'RW' | 'MATH') {
  const totalRaw = rawM1 + rawM2;
  const map = section === 'RW' ? rwScoreMap : mathScoreMap;
  
  let baseScore = interpolate(totalRaw, map);
  
  // Apply adaptive penalty/bonus if they performed reasonably on M1
  if (totalRaw > 10) {
    if (difficulty === 'Hard') baseScore += 15;
    if (difficulty === 'Easy') baseScore -= 15;
  }
  
  let rounded = Math.round(baseScore / 10) * 10;
  if (rounded > 800) rounded = 800;
  if (rounded < 200) rounded = 200;
  
  return rounded;
}

export function calculatePsatSectionScore(rawM1: number, rawM2: number, difficulty: string, section: 'RW' | 'MATH') {
  const totalRaw = rawM1 + rawM2;
  const map = section === 'RW' ? psatRwScoreMap : psatMathScoreMap;
  
  let baseScore = interpolate(totalRaw, map);
  
  // Apply adaptive penalty/bonus if they performed reasonably on M1
  if (totalRaw > 10) {
    if (difficulty === 'Hard') baseScore += 10;
    if (difficulty === 'Easy') baseScore -= 10;
  }
  
  let rounded = Math.round(baseScore / 10) * 10;
  if (rounded > 760) rounded = 760;
  if (rounded < 160) rounded = 160;
  
  return rounded;
}

export function getPercentile(totalScore: number) {
  if (totalScore >= 1600) return "99th+";
  if (totalScore >= 1500) return "99th";
  if (totalScore >= 1400) return "94th";
  if (totalScore >= 1300) return "89th";
  if (totalScore >= 1200) return "74th";
  if (totalScore >= 1100) return "58th";
  if (totalScore >= 1050) return "50th";
  if (totalScore >= 950) return "36th";
  if (totalScore >= 870) return "25th";
  return "10th";
}

export function getPsatPercentile(totalScore: number) {
  if (totalScore >= 1480) return "99th+";
  if (totalScore >= 1420) return "99th";
  if (totalScore >= 1350) return "95th";
  if (totalScore >= 1250) return "89th";
  if (totalScore >= 1150) return "75th";
  if (totalScore >= 1050) return "58th";
  if (totalScore >= 950) return "38th";
  if (totalScore >= 850) return "21st";
  return "10th";
}

export function getPsatTier(totalScore: number) {
  if (totalScore >= 1350) return { label: "Exceptional", color: "#2E7D32" };
  if (totalScore >= 1150) return { label: "Great", color: "#0097A7" };
  if (totalScore >= 1000) return { label: "Good", color: "#1565C0" };
  if (totalScore >= 850) return { label: "Average", color: "#F9A825" };
  return { label: "Below Avg", color: "#C62828" };
}

export function getTier(totalScore: number) {
  if (totalScore >= 1400) return { label: "Exceptional", color: "#2E7D32" };
  if (totalScore >= 1200) return { label: "Great", color: "#0097A7" };
  if (totalScore >= 1050) return { label: "Good", color: "#1565C0" };
  if (totalScore >= 870) return { label: "Average", color: "#F9A825" };
  return { label: "Below Avg", color: "#C62828" };
}

export function getCollegeMatch(totalScore: number) {
  if (totalScore >= 1450) return 0; // Ivy
  if (totalScore >= 1350) return 1; // Top 20
  if (totalScore >= 1250) return 2; // Top 50
  if (totalScore >= 1100) return 3; // State
  return 4; // Community
}
