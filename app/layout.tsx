import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'English MOET · Luyện tập Tiếng Anh 8, 9, 10',
  description: 'English MOET: học ngữ pháp, luyện tập và làm bài test Tiếng Anh lớp 8, 9, 10.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
