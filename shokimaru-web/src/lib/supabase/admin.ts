import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

// 管理者用のSupabaseクライアント（サービスロールキーを使用）
// これによりRLSをバイパスできます
export const createAdminClient = () => {
  if (!process.env.SUPABASE_SERVICE_KEY) {
    throw new Error('SUPABASE_SERVICE_KEY is not set')
  }

  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}