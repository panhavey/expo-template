import { ReactNode } from 'react';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverPosition {
  x: number;
  y: number;
  width?: number;
  height?: number;
}

export interface PopoverProps {
  children: ReactNode;
  content: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  fullScreen?: boolean;
  placement?: PopoverPlacement;
  position?: PopoverPosition;
  offset?: number;
}

export interface PopoverContentProps {
  children: ReactNode;
  fullScreen?: boolean;
  style?: any;
}

export interface PopoverOverlayProps {
  onClose: () => void;
  fullScreen?: boolean;
  children: ReactNode;
  overlayColor?: string;
}