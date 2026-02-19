'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface HeaderContextType {
  title: string;
  showCopyButton: boolean;
  showLeaveButton: boolean;
  setTitle: (title: string) => void;
  setShowCopyButton: (show: boolean) => void;
  setShowLeaveButton: (show: boolean) => void;
  onCopyLink?: () => void;
  onLeave?: () => void;
  setOnCopyLink: (fn?: () => void) => void;
  setOnLeave: (fn?: () => void) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState('Planning Poker');
  const [showCopyButton, setShowCopyButton] = useState(false);
  const [showLeaveButton, setShowLeaveButton] = useState(false);
  const [onCopyLink, setOnCopyLink] = useState<(() => void) | undefined>();
  const [onLeave, setOnLeave] = useState<(() => void) | undefined>();

  return (
    <HeaderContext.Provider
      value={{
        title,
        setTitle,
        showCopyButton,
        setShowCopyButton,
        showLeaveButton,
        setShowLeaveButton,
        onCopyLink,
        setOnCopyLink,
        onLeave,
        setOnLeave,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
}
