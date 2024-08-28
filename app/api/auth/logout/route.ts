// app/api/logout/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  // Hapus cookie
  cookies().delete('auth_token')
  return NextResponse.json({
    success: true,
    message: 'Logout',
    status: 200,
    data: null
  }, { status: 200 });
}
