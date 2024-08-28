// app/hooks/useNotification.ts
'use client'
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

export default function UseNotification(): void {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('redirected') === 'true') {
        alert('starterkit_nextjs')
        router.replace(router.asPath.split('?')[0]); // Menghapus parameter query setelah notifikasi ditampilkan
    }
  }, [searchParams, router]);
}