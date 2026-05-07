'use client';
import { useState } from 'react';
import { ChevronDown, Check, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed?: boolean;
  locked?: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface LessonListProps {
  modules: Module[];
  onLessonClick?: (lesson: Lesson) => void;
  className?: string;
}

export function LessonList({ modules, onLessonClick, className }: LessonListProps) {
  const [openId, setOpenId] = useState<string | null>(modules[0]?.id ?? null);

  return (
    <div className={cn('space-y-2', className)}>
      {modules.map((mod) => (
        <div key={mod.id} className="border border-border rounded-md overflow-hidden">
          <button
            type="button"
            onClick={() => setOpenId(openId === mod.id ? null : mod.id)}
            className="w-full flex items-center justify-between p-4 bg-surface-1 hover:bg-surface-2 transition"
          >
            <span className="font-serif text-lg text-ink">{mod.title}</span>
            <ChevronDown
              size={20}
              className={cn('transition', openId === mod.id && 'rotate-180')}
            />
          </button>

          {openId === mod.id && (
            <ul>
              {mod.lessons.map((lesson) => (
                <li key={lesson.id}>
                  <button
                    type="button"
                    disabled={lesson.locked}
                    onClick={() => onLessonClick?.(lesson)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-2 transition text-left disabled:opacity-50"
                  >
                    {lesson.completed ? (
                      <Check size={16} className="text-success" />
                    ) : lesson.locked ? (
                      <Lock size={16} className="text-ink-3" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-border-strong" />
                    )}
                    <span className="font-serif text-base text-ink flex-1">{lesson.title}</span>
                    <span className="font-mono text-xs text-ink-3">{lesson.duration}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
