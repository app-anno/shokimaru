// クライアントサイドから使用する画像アップロード関数
export async function uploadImage(file: File): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Upload error:", error);
      return null;
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
}

export async function deleteImage(imageUrl: string): Promise<boolean> {
  try {
    const response = await fetch("/api/upload", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: imageUrl }),
    });

    return response.ok;
  } catch (error) {
    console.error("Delete error:", error);
    return false;
  }
}