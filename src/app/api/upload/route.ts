import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const originalFile = formData.get("file") as File;

    if (!originalFile) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await originalFile.arrayBuffer();
    const file = new Blob([arrayBuffer], { type: originalFile.type });
    const fileName = originalFile.name || "screenshot.png";

    // Try Provider 1: catbox.moe
    try {
      console.log("Attempting upload to catbox.moe...");
      const catboxFormData = new FormData();
      catboxFormData.append("reqtype", "fileupload");
      catboxFormData.append("fileToUpload", file, fileName);

      const response = await fetch("https://catbox.moe/user/api.php", {
        method: "POST",
        body: catboxFormData,
      });

      if (response.ok) {
        const textUrl = await response.text();
        if (textUrl.startsWith("http")) {
          console.log("catbox.moe upload success:", textUrl);
          return NextResponse.json({ url: textUrl });
        }
      }
      console.warn("catbox.moe failed, trying backup provider...");
    } catch (err) {
      console.error("catbox.moe upload error:", err);
    }

    // Try Provider 2: uguu.se
    try {
      console.log("Attempting upload to uguu.se...");
      const uguuFormData = new FormData();
      uguuFormData.append("files[]", file, fileName);

      const response = await fetch("https://uguu.se/upload.php", {
        method: "POST",
        body: uguuFormData,
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.files && result.files.length > 0) {
          const directUrl = result.files[0].url;
          console.log("uguu.se upload success:", directUrl);
          return NextResponse.json({ url: directUrl });
        }
      }
    } catch (err) {
      console.error("uguu.se upload error:", err);
    }

    return NextResponse.json(
      { error: "All payment screenshot upload attempts failed. Please check your internet connection or try again." },
      { status: 500 }
    );
  } catch (error: any) {
    console.error("Main API upload handler error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
