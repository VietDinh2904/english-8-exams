import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vịt Nhỏ English 8 & 9 · Luyện đề trực tuyến',
  description: 'Luyện đề Tiếng Anh 8 và Tiếng Anh 9 với hai chế độ luyện tập, bài test và hướng dẫn giải chi tiết.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
