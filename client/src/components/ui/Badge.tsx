interface BadgeProps {
  children: React.ReactNode;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
}

const colorMap: Record<string, string> = {
  blue:   'bg-blue-500/20 text-blue-300 ring-1 ring-blue-500/30',
  green:  'bg-green-500/20 text-green-300 ring-1 ring-green-500/30',
  red:    'bg-red-500/20 text-red-300 ring-1 ring-red-500/30',
  yellow: 'bg-yellow-500/20 text-yellow-300 ring-1 ring-yellow-500/30',
  gray:   'bg-white/10 text-gray-400 ring-1 ring-white/20',
};

export function Badge({ children, color = 'gray' }: BadgeProps) {
  return (
    <span className={`badge ${colorMap[color] ?? colorMap.gray}`}>
      {children}
    </span>
  );
}
