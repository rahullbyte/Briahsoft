import { Card, CardContent } from "@/components/ui/card";
import { Star, GitFork } from "lucide-react";
import { Repository } from "@shared/types";
import { formatDate, formatSize, getLanguageColor } from "@/lib/githubApi";

interface RepositoryCardProps {
  repository: Repository;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  return (
    <Card className="hover:border-primary/50 transition">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <a 
            href={repository.url} 
            className="text-lg font-semibold text-primary hover:underline" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {repository.name}
          </a>
          <div className="flex items-center text-xs text-muted-foreground">
            <div className="flex items-center mr-3">
              <Star className="mr-1 h-4 w-4" />
              <span>{repository.stars}</span>
            </div>
            <div className="flex items-center">
              <GitFork className="mr-1 h-4 w-4" />
              <span>{repository.forks}</span>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-foreground mb-4">
          {repository.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {repository.language && repository.language !== "Not specified" && (
            <span 
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{
                backgroundColor: `${getLanguageColor(repository.language)}20`,
                color: getLanguageColor(repository.language)
              }}
            >
              {repository.language}
            </span>
          )}
          
          {repository.frameworks.map((framework) => (
            <span 
              key={framework}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent"
            >
              {framework}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Last updated: {formatDate(repository.updated_at)}</span>
          <span>File size: {formatSize(repository.size)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
