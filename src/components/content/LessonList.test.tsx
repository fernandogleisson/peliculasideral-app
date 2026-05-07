import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { LessonList } from './LessonList';

const modules = [
  {
    id: 'mod-1',
    title: 'Módulo 1',
    lessons: [
      { id: 'l1', title: 'Aula 1', duration: '12 min', completed: true },
      { id: 'l2', title: 'Aula 2', duration: '8 min', locked: true },
      { id: 'l3', title: 'Aula 3', duration: '15 min' },
    ],
  },
  {
    id: 'mod-2',
    title: 'Módulo 2',
    lessons: [{ id: 'l4', title: 'Aula 4', duration: '10 min' }],
  },
];

describe('LessonList', () => {
  it('opens first module by default', () => {
    render(<LessonList modules={modules} />);
    expect(screen.getByText('Aula 1')).toBeInTheDocument();
    expect(screen.queryByText('Aula 4')).not.toBeInTheDocument();
  });

  it('toggles module on header click', async () => {
    const user = userEvent.setup();
    render(<LessonList modules={modules} />);
    await user.click(screen.getByText('Módulo 2'));
    expect(screen.getByText('Aula 4')).toBeInTheDocument();
  });

  it('disables locked lessons', () => {
    render(<LessonList modules={modules} />);
    expect(screen.getByRole('button', { name: /Aula 2/ })).toBeDisabled();
  });

  it('calls onLessonClick when lesson clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<LessonList modules={modules} onLessonClick={onClick} />);
    await user.click(screen.getByRole('button', { name: /Aula 1/ }));
    expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ id: 'l1' }));
  });

  it('renders duration label-mono', () => {
    render(<LessonList modules={modules} />);
    expect(screen.getByText('12 min')).toHaveClass('font-mono');
  });
});
