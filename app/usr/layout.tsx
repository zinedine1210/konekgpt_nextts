// app/admin/layout.tsx
import { ReactNode, Suspense } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

export default function UserLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <div className='flex flex-col w-full min-h-screen h-screen overflow-hidden'>
      <Navbar />
      <main className='flex-1 w-full xl:flex overflow-hidden h-full'>
        <Sidebar />
        <div className='w-full h-full overflow-y-auto bg-zinc-100'>
          {children}
        </div>
      </main>
    </div>
  );
}
