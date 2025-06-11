import { updateSession } from '@/lib/supabase/updateSession'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  return updateSession(request)
}

export const config = {
  matcher: ['/(.*)'], // 모든 경로에서 실행
}