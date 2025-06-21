import { createClient } from "./client";

const BUCKET_NAME = "fishing-images";

export async function uploadImage(file: File): Promise<string | null> {
  const supabase = createClient();
  
  // ファイル名を一意にするため、タイムスタンプを追加
  const timestamp = Date.now();
  const fileExt = file.name.split(".").pop();
  const fileName = `${timestamp}.${fileExt}`;
  const filePath = `${fileName}`;

  // アップロード
  const { error: uploadError, data } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error("Upload error:", uploadError);
    return null;
  }

  // 公開URLを取得
  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return publicUrl;
}

export async function deleteImage(imageUrl: string): Promise<boolean> {
  const supabase = createClient();
  
  // URLからファイルパスを抽出
  const url = new URL(imageUrl);
  const pathParts = url.pathname.split("/");
  const fileName = pathParts[pathParts.length - 1];

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([fileName]);

  if (error) {
    console.error("Delete error:", error);
    return false;
  }

  return true;
}