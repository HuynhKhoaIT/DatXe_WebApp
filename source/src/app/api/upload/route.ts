import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import {
  S3Client,
  ListObjectsCommand,
  PutObjectCommand,
  GetObjectCommand
} from "@aws-sdk/client-s3";

const Bucket = process.env.AWS_BUCKET_NAME;
const s3 = new S3Client({
  endpoint: process.env.AWS_ENDPOINT,
  region: 'REGION',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

// endpoint to get the list of files in the bucket
export async function GET() {
//   const response = await s3.send(new ListObjectsCommand({ Bucket }));
const command = new GetObjectCommand({
    Bucket: Bucket,
    Key: "5a79ebac-20210519_075831.jpg",
  });

  try {
    const response = await s3.send(command);
    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
    const str = await response.Body?.transformToString();
    return NextResponse.json(str)
  } catch (err) {
    console.error(err);
  }
}

// endpoint to upload a file to the bucket
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const files = formData.getAll("file") as File[];
  const response = await Promise.all(
    files.map(async (file) => {
        const key = `${uuidv4()}_${file.name}`;
        const Body = (await file.arrayBuffer()) as Buffer;
        
        s3.send(new PutObjectCommand({ Bucket, Key: key, Body,ACL:'public-read' }));
        return key;
    })
  );

  return NextResponse.json(response);
}