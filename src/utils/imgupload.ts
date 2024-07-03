export async function uploadImage(formData: FormData): Promise<string> {
  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const responseData = await response.json();
  return responseData.imageUrl;
}