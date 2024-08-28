// app/layout.tsx
import './globals.css'
import { GlobalProvider } from '@@/src/context/GlobalContext';
import { ReactNode, Suspense } from 'react';
import { Metadata } from 'next';
import "@@/src/utils/script"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className='scroll-smooth'>
      <body>
        <ToastContainer />
        <GlobalProvider>
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
