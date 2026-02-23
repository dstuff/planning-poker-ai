'use client';

import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Copy, LogOut } from 'lucide-react';

interface HeaderProps {
  title: string;
  showCopyButton?: boolean;
  showLeaveButton?: boolean;
  onCopyLink?: () => void;
  onLeave?: () => void;
}

export function Header({
  title,
  showCopyButton = false,
  showLeaveButton = false,
  onCopyLink,
  onLeave,
}: HeaderProps) {
  const actionButtons = (
    <div className="flex items-center gap-2">
      {showCopyButton && onCopyLink && (
        <button
          onClick={onCopyLink}
          className="inline-flex items-center justify-center gap-2 px-3 py-2 min-h-[44px] sm:min-h-0 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all focus:outline-none focus:ring-2 focus:ring-[#14b0ff] sm:w-auto w-[44px] cursor-pointer"
          title="Копировать ссылку"
          aria-label="Копировать ссылку"
        >
          <Copy className="w-4 h-4 flex-shrink-0" />
          <span className="hidden sm:inline text-sm font-medium whitespace-nowrap">Копировать</span>
        </button>
      )}
      {showLeaveButton && onLeave && (
        <button
          onClick={onLeave}
          className="inline-flex items-center justify-center gap-2 px-3 py-2 min-h-[44px] sm:min-h-0 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all focus:outline-none focus:ring-2 focus:ring-red-400 sm:w-auto w-[44px] cursor-pointer"
          title="Выйти из комнаты"
          aria-label="Выйти из комнаты"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span className="hidden sm:inline text-sm font-medium whitespace-nowrap">Выйти</span>
        </button>
      )}
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white truncate max-w-[calc(100%-120px)] sm:max-w-[calc(100%-200px)]">
            {title}
          </h1>
          <div className="flex items-center gap-2 flex-shrink-0">
            {actionButtons}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
