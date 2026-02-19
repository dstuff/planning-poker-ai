'use client';

import React from 'react';
import { Button } from './ui/Button';
import { ThemeToggle } from './ThemeToggle';
import { Link, LogOut } from 'lucide-react';

interface RoomControlsProps {
  onCopyLink: () => void;
  onLeave: () => void;
}

export function RoomControls({
  onCopyLink,
  onLeave,
}: RoomControlsProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center items-stretch">
      <ThemeToggle />
      <Button
        onClick={onCopyLink}
        variant="outline"
        size="md"
        className="h-[44px]"
      >
        <Link className="w-4 h-4 mr-2" />
        Копировать
      </Button>

      <Button
        onClick={onLeave}
        variant="danger"
        size="md"
        className="h-[44px]"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Выйти
      </Button>
    </div>
  );
}
