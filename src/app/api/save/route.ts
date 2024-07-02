import { NextResponse } from "next/server";

import { prisma } from "@/lib";

export async function POST(request: Request) {
    const { diary, isPublic } = await request.json();

    try {
        const newDiary = await prisma.diary.create({
            data: {
                diary,
                isPublic,
            },
        });
        return NextResponse.json(newDiary, { status: 200 });
    } catch (error) {
        console.error("Error saving diary:", error);
        return NextResponse.json({ error: "Failed to save diary" }, { status: 500 });
    }
}
