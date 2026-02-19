'use client';

import React from 'react';
import { Button } from './ui/Button';
import { ThemeToggle } from './ThemeToggle';

interface RoomControlsProps {
  onCopyLink: () => void;
  onLeave: () => void;
}

export function RoomControls({
  onCopyLink,
  onLeave,
}: RoomControlsProps) {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      <ThemeToggle />
      <Button
        onClick={onCopyLink}
        variant="outline"
        size="md"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
        Копировать ссылку
      </Button>
      
      <Button
        onClick={onLeave}
        variant="danger"
        size="md"
      >
        Покинуть комнату
      </Button>
    </div>
  );
}
