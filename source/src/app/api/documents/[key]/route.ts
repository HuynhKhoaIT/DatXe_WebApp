import { NextResponse } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
    S3Client,
    GetObjectCommand
  } from "@aws-sdk/client-s3";
// Bucket and s3: same as above
const Bucket = process.env.AMPLIFY_BUCKET;
const s3 = new S3Client({
    endpoint: process.env.AWS_ENDPOINT,
    region: 'REGION',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
  });
export async function GET(_: Request, { params }: { params: { key : string } }) {
  const command = new GetObjectCommand({ Bucket, Key: params.key });
  const src = await getSignedUrl(s3, command, { expiresIn: 3600 });

  return NextResponse.json({ src });
}