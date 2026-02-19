'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Plus } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [roomId, setRoomId] = useState('');

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId.trim()) {
      router.push(`/room/${roomId.trim()}`);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      <div className="max-w-lg w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            Planning Poker
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-light">
            Оценивайте задачи спринта вместе с командой
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-10">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-5">
                Присоединиться к комнате
              </h2>
              <form onSubmit={handleJoinRoom} className="space-y-4">
                <input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="Введите ID комнаты"
                  className="w-full px-5 py-3.5 text-base border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-[#14b0ff] focus:border-[#14b0ff] outline-none transition-all placeholder:text-gray-400"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={!roomId.trim()}
                >
                  Присоединиться
                </Button>
              </form>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-800 text-gray-400 font-medium">или</span>
              </div>
            </div>

            <div>
              <Button
                onClick={() => router.push('/new')}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                <Plus className="w-5 h-5 mr-2" />
                Создать новую комнату
              </Button>
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-600">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide">
                Как это работает
              </h3>
              <ol className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#e0f4ff] dark:bg-[#0a3a52] text-[#14b0ff] dark:text-[#14b0ff] rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <span className="pt-0.5">Создайте комнату или присоединитесь к существующей</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#e0f4ff] dark:bg-[#0a3a52] text-[#14b0ff] dark:text-[#14b0ff] rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span className="pt-0.5">Поделитесь ссылкой с командой</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#e0f4ff] dark:bg-[#0a3a52] text-[#14b0ff] dark:text-[#14b0ff] rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <span className="pt-0.5">Проголосуйте карточками для оценки задачи</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#e0f4ff] dark:bg-[#0a3a52] text-[#14b0ff] dark:text-[#14b0ff] rounded-full flex items-center justify-center text-xs font-bold">
                    4
                  </span>
                  <span className="pt-0.5">Обсудите результаты и начните новый раунд</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-8 font-light">
          Real-time Planning Poker для Agile команд
        </p>
      </div>
    </main>
  );
}
