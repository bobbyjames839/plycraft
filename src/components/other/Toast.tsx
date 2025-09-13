import React, { createContext, useContext, useState, useCallback, useRef, useEffect, ReactNode } from 'react';
import '../../styles/other/Toast.css';

export type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  createdAt: number;
  ttl: number; 
}

interface ToastContextValue {
  push: (type: ToastType, message: string, opts?: { ttl?: number }) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

interface ProviderProps { children: ReactNode }

export function ToastProvider({ children }: ProviderProps) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const timers = useRef<Record<string, number>>({});

  const remove = useCallback((id: string) => {
    setItems(prev => prev.filter(t => t.id !== id));
    const handle = timers.current[id];
    if (handle) {
      window.clearTimeout(handle);
      delete timers.current[id];
    }
  }, []);

  const push = useCallback((type: ToastType, message: string, opts?: { ttl?: number }) => {
    const id = Math.random().toString(36).slice(2);
    const ttl = opts?.ttl ?? 4000;
    const toast: ToastItem = { id, type, message, ttl, createdAt: Date.now() };
    setItems(prev => [...prev, toast]);
    const handle = window.setTimeout(() => remove(id), ttl);
    timers.current[id] = handle;
  }, [remove]);

  // Optional: auto-trim if more than 5
  useEffect(() => {
    if (items.length > 5) {
      setItems(prev => prev.slice(prev.length - 5));
    }
  }, [items]);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="t-stack" role="status" aria-live="polite" aria-atomic="false">
        {items.map(t => (
          <div
            key={t.id}
            className={`t-item t-${t.type}`}
            role={t.type === 'error' ? 'alert' : 'status'}
            onClick={() => remove(t.id)}
          >
            <div className="t-msg">{t.message}</div>
            <button className="t-close" aria-label="Dismiss" onClick={(e) => { e.stopPropagation(); remove(t.id); }}>×</button>
            <div className="t-bar" style={{ animationDuration: `${t.ttl}ms` }} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
