'use client';

import React, { useState } from 'react';
import { Button } from './ui/Button';

interface JoinFormProps {
  onSubmit: (name: string) => void;
  loading?: boolean;
}

export function JoinForm({ onSubmit, loading = false }: JoinFormProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Ваше имя
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите ваше имя"
          className="w-full px-5 py-3.5 text-base border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-[#14b0ff] focus:border-[#14b0ff] outline-none transition-all placeholder:text-gray-400"
          required
          disabled={loading}
        />
      </div>
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={!name.trim() || loading}
      >
        {loading ? 'Присоединение...' : 'Присоединиться'}
      </Button>
    </form>
  );
}
