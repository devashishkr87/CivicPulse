interface SkeletonProps {
  className?: string;
  lines?: number;
}

export function Skeleton({ className = '', lines = 1 }: SkeletonProps) {
  return (
    <div className={`animate-pulse space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 rounded-lg bg-white/10"
          style={{ width: i === lines - 1 && lines > 1 ? '70%' : '100%' }}
        />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="card animate-pulse space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-white/10" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-1/2 rounded bg-white/10" />
          <div className="h-3 w-1/3 rounded bg-white/10" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 rounded bg-white/10" />
        <div className="h-3 rounded bg-white/10" />
        <div className="h-3 w-4/5 rounded bg-white/10" />
      </div>
      <div className="h-8 rounded-lg bg-white/10" />
    </div>
  );
}
