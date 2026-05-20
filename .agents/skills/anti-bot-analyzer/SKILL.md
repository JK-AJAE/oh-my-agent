---
name: "anti-bot-analyzer"
description: "웹사이트의 안티봇 방어 메커니즘을 분석하고 합법적 우회 전략을 수립하는 스킬. '안티봇 분석해줘', '봇 차단 우회', 'Cloudflare 대응', '캡차 감지', 'rate limit 확인' 등 안티봇 분석 시 사용한다. 단, 불법적 우회 도구 개발, CAPTCHA 자동 풀이 서비스, 개인정보 침해 스크래핑은 이 스킬의 범위가 아니다."
category: "utility"
---

# Anti-Bot Analyzer — 안티봇 방어 분석 + 합법적 대응

target-analyst와 crawler-developer의 안티봇 분석 역량을 강화하는 스킬.

## 대상 에이전트

- **target-analyst** — 대상 사이트의 방어 수준을 사전 평가
- **crawler-developer** — 분석 결과 기반 합법적 크롤러 전략 수립

## 안티봇 방어 계층 분류

### Level 1: 기본 방어 (난이도: 하)
| 방어 | 감지 방법 | 대응 전략 |
|------|----------|----------|
| robots.txt | `GET /robots.txt` | 규칙 준수 (Crawl-delay, Disallow) |
| User-Agent 필터 | 403/429 응답 | 실제 브라우저 UA 헤더 설정 |
| Referer 검사 | 빈 Referer 시 차단 | 적절한 Referer 헤더 설정 |
| IP Rate Limit | 짧은 간격 시 429 | `time.sleep()` + 랜덤 지연 |

### Level 2: 중급 방어 (난이도: 중)
| 방어 | 감지 방법 | 대응 전략 |
|------|----------|----------|
| 쿠키 기반 세션 | Set-Cookie 추적 | `requests.Session()` 유지 |
| JavaScript 렌더링 필수 | 빈 HTML body | Playwright/Puppeteer 사용 |
| 동적 토큰 (CSRF) | hidden input | 토큰 추출 후 요청에 포함 |
| API 인증 | 401 응답 | 공개 API 키 분석 |

### Level 3: 고급 방어 (난이도: 상)
| 방어 | 감지 방법 | 대응 전략 |
|------|----------|----------|
| Cloudflare | `cf-` 쿠키, challenge 페이지 | 합법적 API 탐색 |
| Akamai Bot Manager | `_abck` 쿠키 | 공식 API/RSS 대안 탐색 |
| 브라우저 핑거프린팅 | navigator/WebGL 검사 | 스텔스 플러그인 |
| reCAPTCHA/hCaptcha | `g-recaptcha` DOM | API 대안 사용 |
| TLS 핑거프린팅 (JA3) | 비표준 TLS 차단 | curl_cffi |

## 방어 수준 자동 감지 플로우
