---
name: "advoost-efficiency-analyzer"
description: "네이버 ADVoost(AI 타겟팅)의 효율을 분석하고 수동 비딩과 비교하여 최적의 광고 예산 배분을 결정하는 스킬"
category: "infrastructure"
mode: "skill"
---

# 📊 advoost-efficiency-analyzer

네이버의 AI 기반 타겟팅 솔루션인 ADVoost의 성과를 정밀 분석하고, 휴먼 에이전트의 수동 비딩 데이터와 교차 검증하여 전체 ROI를 극대화합니다.

## 🎯 주요 기능

1. **성과 비교 분석**: ADVoost 자동 입찰 그룹과 수동 입찰 그룹의 CPA, ROAS, 전환율을 실시간 비교.
2. **비중 최적화**: 성과가 좋은 쪽으로 예산을 자동 배분할 수 있도록 가이드라인 생성.
3. **이상 징후 탐지**: AI 타겟팅이 비정상적으로 높은 단가로 입찰하거나 저품질 트래픽을 유도할 경우 경고 및 수동 전환 권고.

## 🛠️ 실행 프로토콜

1. `naver-api`를 통해 ADVoost 적용 캠페인과 수동 캠페인의 최근 7일간 데이터를 로드한다.
2. 두 그룹 간의 핵심 지표(ROAS, CPC, CTR) 편차를 계산한다.
3. AI 타겟팅이 유리한 시간대와 키워드 패턴을 파악하여 보고서를 작성한다.
4. "ADVoost 비중을 X%로 조정"하는 구체적인 예산 전략을 제안한다.

---
[Evolved: 2026-05-14]
