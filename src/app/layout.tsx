import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import { HeaderProvider } from '@/components/HeaderProvider';
import { HeaderWrapper } from '@/components/HeaderWrapper';
import './globals.css';

export const metadata: Metadata = {
  title: 'Planning Poker - Оценка задач для Agile команд',
  description: 'Real-time Planning Poker для командной оценки задач спринта',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <HeaderProvider>
            <HeaderWrapper />
            <div className="pt-16">{children}</div>
          </HeaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
