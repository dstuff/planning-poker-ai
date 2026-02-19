'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Plus, Loader2 } from 'lucide-react';

export default function NewRoomPage() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateRoom = () => {
    setIsCreating(true);
    const roomId = uuidv4();
    router.push(`/room/${roomId}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <div className="max-w-lg w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Создать новую комнату
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Создайте комнату для планинг покера и пригласите команду
          </p>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-xl p-6 border-2 border-blue-100 dark:border-blue-900">
              <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-200 mb-4">
                Как это работает:
              </h3>
              <ul className="text-base text-blue-800 dark:text-blue-300 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">✓</span>
                  <span>Будет создан уникальный URL комнаты</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">✓</span>
                  <span>Поделитесь ссылкой с командой</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">✓</span>
                  <span>Каждый участник вводит своё имя</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">✓</span>
                  <span>Голосуйте карточками в реальном времени</span>
                </li>
              </ul>
            </div>

            <Button
              onClick={handleCreateRoom}
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isCreating}
            >
              {isCreating ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Создание...
                </>
              ) : (
                <>
                  <Plus className="w-6 h-6 mr-2" />
                  Создать комнату
                </>
              )}
            </Button>

            <Button
              onClick={() => router.push('/')}
              variant="outline"
              size="lg"
              className="w-full"
            >
              Назад
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
