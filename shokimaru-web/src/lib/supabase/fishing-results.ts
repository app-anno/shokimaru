import { createClient } from "./server";
import { Database } from "@/types/database";

type FishingResult = Database["public"]["Tables"]["fishing_results"]["Row"];
type FishingResultInsert = Database["public"]["Tables"]["fishing_results"]["Insert"];
type FishingResultUpdate = Database["public"]["Tables"]["fishing_results"]["Update"];
type FishingResultImage = Database["public"]["Tables"]["fishing_result_images"]["Row"];

export type FishingResultWithImages = FishingResult & {
  images: FishingResultImage[];
};

// 釣果一覧を取得（公開データのみ）
export async function getFishingResults(limit?: number): Promise<FishingResultWithImages[]> {
  const supabase = await createClient();
  
  let query = supabase
    .from("fishing_results")
    .select(`
      *,
      images:fishing_result_images(*)
    `)
    .eq("is_public", true)
    .order("date", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching fishing results:", error);
    return [];
  }

  // 画像を表示順でソート
  const resultsWithSortedImages = (data || []).map(result => ({
    ...result,
    images: result.images?.sort((a: FishingResultImage, b: FishingResultImage) => a.display_order - b.display_order) || []
  }));

  return resultsWithSortedImages;
}

// 特定の釣果を取得
export async function getFishingResultById(id: string): Promise<FishingResultWithImages | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("fishing_results")
    .select(`
      *,
      images:fishing_result_images(*)
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching fishing result:", error);
    return null;
  }

  // 画像を表示順でソート
  if (data) {
    return {
      ...data,
      images: data.images?.sort((a: FishingResultImage, b: FishingResultImage) => a.display_order - b.display_order) || []
    };
  }

  return null;
}

// 釣果を作成
export async function createFishingResult(result: FishingResultInsert) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("fishing_results")
    .insert(result)
    .select()
    .single();

  if (error) {
    console.error("Error creating fishing result:", error);
    throw error;
  }

  return data;
}

// 釣果を更新
export async function updateFishingResult(id: string, result: FishingResultUpdate) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("fishing_results")
    .update(result)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating fishing result:", error);
    throw error;
  }

  return data;
}

// 釣果を削除
export async function deleteFishingResult(id: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("fishing_results")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting fishing result:", error);
    throw error;
  }

  return true;
}

// 管理画面用：全ての釣果を取得（非公開含む）
export async function getAllFishingResults() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("fishing_results")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching all fishing results:", error);
    return [];
  }

  return data || [];
}