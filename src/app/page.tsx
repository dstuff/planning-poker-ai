'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ThemeToggle';

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
    <main className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <div className="max-w-lg w-full">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Planning Poker
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Оценивайте задачи спринта вместе с командой
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Присоединиться к комнате
              </h2>
              <form onSubmit={handleJoinRoom} className="space-y-4">
                <input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="Введите ID комнаты или ссылку"
                  className="w-full px-5 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
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
                <div className="w-full border-t-2 border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-lg">
                <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium">или</span>
              </div>
            </div>

            <div>
              <Button
                onClick={() => router.push('/new')}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Создать новую комнату
              </Button>
            </div>

            <div className="pt-6 border-t-2 border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
                Как это работает:
              </h3>
              <ol className="space-y-3 text-lg text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-base font-bold">
                    1
                  </span>
                  <span className="pt-0.5">Создайте комнату или присоединитесь к существующей</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-base font-bold">
                    2
                  </span>
                  <span className="pt-0.5">Поделитесь ссылкой с командой</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-base font-bold">
                    3
                  </span>
                  <span className="pt-0.5">Проголосуйте карточками для оценки задачи</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-base font-bold">
                    4
                  </span>
                  <span className="pt-0.5">Обсудите результаты и начните новый раунд</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        <p className="text-center text-base text-gray-500 mt-8">
          Real-time Planning Poker для Agile команд
        </p>
      </div>
    </main>
  );
}
