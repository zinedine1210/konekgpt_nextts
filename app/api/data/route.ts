// app/api/data/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const data = ['halo', 'world'];
  return NextResponse.json(data);
}
