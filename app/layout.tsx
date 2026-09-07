import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vịt Nhỏ English 8 · Luyện đề giữa kỳ',
  description: 'Làm 6 đề giữa kỳ Tiếng Anh 8 Global Success và xem đáp án ngay khi làm sai.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
