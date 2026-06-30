# VeriWeb 코드 리뷰 보고서

> 작성일: 2026-06-09  
> 대상 브랜치: `feature/last_1`  
> 리뷰 범위: 프론트엔드 전체 (`src/`)

---

## 목차

1. [프로젝트 개요](#1-프로젝트-개요)
2. [발견된 문제 및 수정 내역](#2-발견된-문제-및-수정-내역)
   - [BUG-01] addHistory / clearHistory — useCallback 누락
   - [BUG-02] useAnalysisHistory 이중 인스턴스 문제
   - [BUG-03] LinkAnalysisPage — useEffect 의존성 누락
   - [BUG-04] useImageAnalysis — switchMode 상태 미초기화
3. [잔여 과제 (백엔드 협의 필요)](#3-잔여-과제-백엔드-협의-필요)
4. [변경 파일 요약](#4-변경-파일-요약)

---

## 1. 프로젝트 개요

| 항목 | 내용 |
|---|---|
| 프레임워크 | React 19 + TypeScript + Vite |
| 스타일 | Tailwind CSS v4 |
| 라우팅 | React Router DOM v7 |
| HTTP | Axios (interceptor 적용) |
| 배포 | Vercel |

**주요 기능**

- URL 신뢰도 분석 (도메인·출처·근거·일관성·조작 등 7개 카테고리 채점)
- 이미지 AI 생성 여부 탐지
- 영상 AI 생성 여부 탐지 (프레임 단위)
- 피드 (신뢰도 분류된 아티클 목록)
- 분석 히스토리 (localStorage, 최신 10개)

---

## 2. 발견된 문제 및 수정 내역

---

### [BUG-01] `addHistory` / `clearHistory` — `useCallback` 누락

**파일:** `src/share/hooks/useAnalysisHistory.ts`  
**심각도:** 중 (잠재적 무한루프)

#### 문제

```ts
// 수정 전 — 매 렌더링마다 새 함수 참조 생성
function addHistory(item: ...) { ... }
function clearHistory() { ... }
```

`addHistory`는 렌더링마다 새 참조를 가집니다.  
`useEffect` 의존성 배열에 넣으면 `addHistory 변경 → effect 재실행 → 렌더링 → addHistory 변경 → ...` 무한루프가 발생합니다.  
이로 인해 개발자는 의존성 배열에서 `addHistory`를 제외하는 우회를 선택하게 되고, 이는 [BUG-03]으로 이어집니다.

#### 수정

Context 도입([BUG-02] 참고)과 함께 `useCallback`으로 참조를 안정화했습니다.

```ts
// 수정 후 — src/share/context/HistoryContext.tsx
const addHistory = useCallback((item: Omit<HistoryItem, "analyzedAt">) => {
  setHistory((prev) => {
    const deduped = prev.filter((h) => h.id !== item.id);
    const next = [
      { ...item, analyzedAt: new Date().toISOString() },
      ...deduped,
    ].slice(0, MAX_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  });
}, []); // setHistory는 안정된 참조 → 빈 deps 가능

const clearHistory = useCallback(() => {
  localStorage.removeItem(STORAGE_KEY);
  setHistory([]);
}, []);
```

---

### [BUG-02] `useAnalysisHistory` 이중 인스턴스 문제

**파일:** `src/share/hooks/useAnalysisHistory.ts` → `src/share/context/HistoryContext.tsx`  
**심각도:** 중 (상태 불일치)

#### 문제

```
MainPage         → useAnalysisHistory() → state A (독립)
LinkAnalysisPage → useAnalysisHistory() → state B (독립)
```

두 컴포넌트가 각자 독립된 `useState`를 가집니다.  
`LinkAnalysisPage`에서 `addHistory`를 호출하면 state B와 localStorage는 업데이트되지만, **MainPage의 state A는 갱신되지 않습니다.**  
현재는 React Router가 한 번에 하나의 Route만 렌더링하므로 remount 시 `readStorage`를 다시 읽어 타이밍 문제가 숨겨지지만, 향후 레이아웃 라우트나 모달 등으로 두 컴포넌트가 동시에 렌더링되는 구조가 추가되면 즉시 버그로 표면화됩니다.

#### 수정

`HistoryContext` + `HistoryProvider`를 도입해 앱 전체에서 단일 인스턴스를 공유합니다.

```
src/share/context/HistoryContext.tsx   ← 신규 (Provider + useAnalysisHistory)
src/share/hooks/useAnalysisHistory.ts  ← HistoryContext re-export로 교체
src/main.tsx                           ← HistoryProvider 추가
```

```tsx
// main.tsx 수정 후
<HistoryProvider>
  <App />
</HistoryProvider>
```

기존 컴포넌트의 import 경로(`../../../share/hooks/useAnalysisHistory`)는 변경 없이 동일하게 유지됩니다.

---

### [BUG-03] `LinkAnalysisPage` — `useEffect` 의존성 배열에 `addHistory` 누락

**파일:** `src/pages/analyst/link/LinkAnalysisPage.tsx`  
**심각도:** 낮 (ESLint 경고, 잠재적 stale closure)

#### 문제

```ts
// 수정 전 — addHistory가 deps에 없음
useEffect(() => {
  ...
  addHistory({ ... });
}, [analysisId]); // ← addHistory 누락
```

[BUG-01]이 수정되지 않은 상태에서 `addHistory`를 deps에 넣으면 무한루프가 발생하기 때문에 의도적으로 제외된 것으로 보입니다. `useCallback`으로 참조가 안정화된 지금은 안전하게 추가할 수 있습니다.

#### 수정

```ts
// 수정 후
}, [analysisId, addHistory]);
```

---

### [BUG-04] `useImageAnalysis` — `switchMode` 상태 미초기화

**파일:** `src/pages/analyst/image/useImageAnalysis.ts`  
**심각도:** 중 (잔류 UI 오염)

#### 문제

```ts
// 수정 전 — switchMode에서 누락된 초기화
function switchMode(nextMode: Mode) {
  if (nextMode === mode) return;
  setPreview(...)
  setFile(null);
  setDragging(false);
  setVideoResult(null);
  setVideoError(null);
  // ← setResult(null) 없음: 이미지 분석 결과가 영상 모드에서도 잔류
  // ← setServerError(null) 없음: 이미지 API 에러가 영상 모드에서도 잔류
  // ← setFileError(null) 없음: 이미지 파일 에러가 영상 모드 진입 시 잔류
  setMode(nextMode);
}
```

이미지 분석 후 에러 또는 결과가 있는 상태에서 영상 탭으로 전환하면, 이전 모드의 에러 메시지나 결과가 화면에 남을 수 있습니다.

#### 수정

```ts
// 수정 후
function switchMode(nextMode: Mode) {
  if (nextMode === mode) return;
  setPreview((cur) => { if (cur) URL.revokeObjectURL(cur); return null; });
  setFile(null);
  setDragging(false);
  setResult(null);        // ← 추가
  setVideoResult(null);
  setServerError(null);   // ← 추가
  setVideoError(null);
  setFileError(null);     // ← 추가
  if (inputRef.current) inputRef.current.value = "";
  setMode(nextMode);
}
```

---

## 3. 잔여 과제 (백엔드 협의 필요)

### [RISK-01] IDOR — 분석 결과 URL 순차 열람 가능

**위치:** `/result?id=123`  
**심각도:** 높음 (인증 없는 공개 서비스인 경우 설계 의도 확인 필요)

현재 분석 결과는 숫자 `id` 하나로 조회됩니다. 인증이 없기 때문에 누구나 `id`를 1씩 증가시켜 전체 분석 이력을 열람할 수 있습니다 (IDOR: Insecure Direct Object Reference).

**백엔드에서 해결해야 할 것:**

- 세션/JWT 기반 인증 도입 후 결과 소유자 검증
- 또는 UUID v4 기반 결과 키 사용 (예측 불가 링크)

**프론트엔드에서 할 수 있는 것 (완화만 가능, 보안 아님):**

```ts
// 분석 직후 결과 id를 sessionStorage에 저장
// 저장된 id가 없으면 접근 차단 (단, DevTools로 우회 가능)
```

이 서비스가 "공개 결과 공유"를 의도한 설계라면 문제가 없지만, 그렇다면 명시적인 `isPublic` 플래그와 UI 안내가 필요합니다.

---

## 4. 변경 파일 요약

| 파일 | 변경 유형 | 연관 이슈 |
|---|---|---|
| `src/share/context/HistoryContext.tsx` | 신규 생성 | BUG-01, BUG-02 |
| `src/share/hooks/useAnalysisHistory.ts` | 전면 교체 (re-export) | BUG-01, BUG-02 |
| `src/main.tsx` | `HistoryProvider` 추가 | BUG-02 |
| `src/pages/analyst/link/LinkAnalysisPage.tsx` | `useEffect` deps 수정 | BUG-03 |
| `src/pages/analyst/image/useImageAnalysis.ts` | `switchMode` 초기화 추가 | BUG-04 |
