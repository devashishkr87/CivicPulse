import { Button } from '@/components/ui/Button';

interface KnowledgeCardProps {
  title: string;
  description: string;
  onLearnMore: () => void;
}

export function KnowledgeCard({ title, description, onLearnMore }: KnowledgeCardProps) {
  return (
    <div className="card flex h-full flex-col gap-4 transition-all duration-200 hover:border-primary/40 hover:bg-white/8">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/20">
          <svg
            className="h-4 w-4 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
      <p className="flex-1 text-xs leading-relaxed text-gray-400">{description}</p>
      <Button
        variant="ghost"
        className="w-full text-xs"
        onClick={onLearnMore}
        aria-label={`Learn more about ${title}`}
      >
        Learn More →
      </Button>
    </div>
  );
}
