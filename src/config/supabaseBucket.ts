import { supabaseAdminClient } from "./supbaseClient";

type BucketName = "images" | "videos" | "pdfs";
const mimeTypes: Record<BucketName, string[]> = {
  images: ["image/*"],
  videos: ["video/*"],
  pdfs: ["application/pdf"],
};

export async function ensureBucketExists(bucketName: BucketName) {
  const { data: buckets, error } =
    await supabaseAdminClient.storage.listBuckets();

  if (error) {
    console.error("Error listing buckets:", error);
    return;
  }

  if (buckets.some((bucket) => bucket.name === bucketName)) {
    console.log(`Bucket "${bucketName}" already exists.`);
    return;
  }

  const { data, error: createError } =
    await supabaseAdminClient.storage.createBucket(bucketName, {
      public: true,
      allowedMimeTypes: mimeTypes[bucketName],
      fileSizeLimit: "1MB",
    });

  if (createError) {
    console.error("Error creating bucket:", createError);
    return;
  }

  console.log(`Bucket "${bucketName}" created successfully.`);
}
