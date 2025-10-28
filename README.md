# Molody 🎵

Molody는 음악을 추천하고 공유하는 플랫폼입니다. 웹과 모바일 환경을 모두 지원하여 언제 어디서든 새로운 음악을 발견하고 나만의 플레이리스트를 관리할 수 있습니다.

## ✨ 주요 기능

- **오늘의 노래**: 매일 새로운 노래를 추천받을 수 있습니다.
- **음악 추천**: 사용자의 취향을 기반으로 한 맞춤 음악을 추천합니다.
- **마이페이지**: 내가 좋아한 노래나 등록한 노래를 관리할 수 있습니다.
- **크로스 플랫폼**: 웹과 모바일 앱을 통해 동일한 사용자 경험을 제공합니다.

## 🛠️ 기술 스택

이 프로젝트는 Yarn Workspaces를 사용한 모노레포로 구성되어 있습니다.

- **Monorepo**: `Yarn Workspaces`
- **Web Frontend**: `Next.js`, `TypeScript`, `Tailwind CSS`
- **Mobile App**: `React Native`, `Expo`, `TypeScript`
- **Backend**: `Supabase` (Database, Auth, Storage, Edge Functions)
- **Shared Logic**: `apps/core` 디렉토리에서 웹과 모바일이 공통으로 사용하는 비즈니스 로직과 타입을 관리합니다.

## 📂 프로젝트 구조

```
/
├── apps/
│   ├── core/      # 공통 비즈니스 로직 및 타입
│   ├── mobile/    # Expo (React Native) 모바일 앱
│   └── web/       # Next.js 웹 애플리케이션
├── supabase/      # Supabase 백엔드 (functions, migrations)
└── package.json   # 모노레포 루트 설정
```