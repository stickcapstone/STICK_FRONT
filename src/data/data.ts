export const BREAKDOWN = [
  { label: "출처 신뢰성",      score: 78, cls: "g" },
  { label: "사실 확인 가능성", score: 55, cls: "y" },
  { label: "표현 편향성",      score: 61, cls: "y" },
  { label: "인용 검증",        score: 40, cls: "r" },
  { label: "교차 검증 일치도", score: 72, cls: "g" },
];

export const LINKS = [
  { tag: "공식 출처", type: "src", text: "통계청 공식 발표 — 2024 국내 경제 지표 보고서" },
  { tag: "유사 기사", type: "sim", text: "연합뉴스 — 동일 사건 관련 보도 (수치 상이)" },
  { tag: "유사 기사", type: "sim", text: "KBS 뉴스 — 동일 이슈 교차 보도" },
  { tag: "팩트체크",  type: "fc",  text: "SNU 팩트체크 — 관련 허위정보 검증 결과" },
];

export const REC_ARTICLES = [
  { outlet: "연합뉴스", title: "경제부처, 2024년 하반기 정책 방향 공식 발표" },
  { outlet: "KBS",      title: "통계청 발표 실질 수치 분석 — 전문가 해설" },
  { outlet: "한국일보", title: "관련 법안 처리 현황 및 국회 논의 경과" },
];

export const FEED_ITEMS = [
  { cat: "정치", outlet: "연합뉴스",   score: 94, bg: "linear-gradient(135deg,#0a1628,#081c10)", icon: "🏛️", title: "국회 예산결산위원회, 2025년도 추경 예산안 본회의 상정 확정",  time: "2시간 전" },
  { cat: "경제", outlet: "한국경제",   score: 88, bg: "linear-gradient(135deg,#18120a,#241800)", icon: "💹", title: "한국은행 기준금리 동결 결정 — 물가 안정세 고려한 판단",       time: "4시간 전" },
  { cat: "IT",   outlet: "전자신문",   score: 91, bg: "linear-gradient(135deg,#0a1220,#00102e)", icon: "💻", title: "국내 AI 스타트업 글로벌 투자 유치 1조 돌파 — 역대 최고치",   time: "6시간 전" },
  { cat: "건강", outlet: "메디컬투데이", score: 96, bg: "linear-gradient(135deg,#180a0a,#200000)", icon: "🏥", title: "질병관리청, 독감 유행주의보 전국 확대 발령 — 예방접종 권고", time: "8시간 전" },
  { cat: "국제", outlet: "KBS",        score: 85, bg: "linear-gradient(135deg,#0a160a,#081a0e)", icon: "🌍", title: "G20 정상회의, 기후변화 대응 공동선언문 채택 — 탄소중립 가속화", time: "어제" },
  { cat: "경제", outlet: "조선비즈",   score: 89, bg: "linear-gradient(135deg,#140a18,#1c0024)", icon: "📊", title: "삼성전자 3분기 실적 발표 — 반도체 사업 흑자전환 공식 확인",  time: "어제" },
];

export const ANALYSIS_STEPS = [
  [12,  "URL 유효성 확인 중..."],
  [28,  "출처 데이터베이스 조회 중..."],
  [48,  "교차 검증 분석 중..."],
  [68,  "표현 편향성 분석 중..."],
  [86,  "팩트체크 DB 대조 중..."],
  [100, "분석 완료!"],
];

export const FILTERS = ["전체", "정치", "경제", "IT", "건강", "국제"];

export const RESULT_SCORE = 62;
