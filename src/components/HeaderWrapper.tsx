'use client';

import React from 'react';
import { Header } from './Header';
import { useHeader } from './HeaderProvider';

export function HeaderWrapper() {
  const { title, showCopyButton, showLeaveButton, onCopyLink, onLeave } = useHeader();
  return (
    <Header
      title={title}
      showCopyButton={showCopyButton}
      showLeaveButton={showLeaveButton}
      onCopyLink={onCopyLink}
      onLeave={onLeave}
    />
  );
}
