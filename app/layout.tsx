import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'English MOET · Luyện tập Tiếng Anh 6–12',
  description: 'English MOET: học phát âm, từ vựng, ngữ pháp, luyện tập và làm bài test Tiếng Anh lớp 6 đến lớp 12.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
