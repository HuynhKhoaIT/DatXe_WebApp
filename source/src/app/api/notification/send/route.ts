import { createNotification } from '@/app/libs/prisma/notification';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const dataInput = {
            priority:"HIGH",
            data:{
                "title": json.title,
                "body":  json.body
            },
            to: json.to
        };
        const {data} = await axios.post('https://fcm.googleapis.com/fcm/send', dataInput, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `key=${process.env.FIREBASE_KEY}`
            }
        })
        return NextResponse.json(data);
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}