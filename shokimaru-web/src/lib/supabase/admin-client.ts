import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/database";

export const createAdminClient = () => {
  // 管理画面用のクライアント（service roleキーを使用）
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
};