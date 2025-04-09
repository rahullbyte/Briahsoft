import { useState } from "react";
import { Repository } from "@shared/types";
import { RepositoryCard } from "@/components/repository-card";

interface RepositoryListProps {
  repositories: Repository[];
}

type SortOption = "stars" | "updated" | "name" | "created";

export function RepositoryList({ repositories }: RepositoryListProps) {
  const [sortBy, setSortBy] = useState<SortOption>("stars");
  const [visibleCount, setVisibleCount] = useState(5);
  
  const sortRepositories = (repos: Repository[], sort: SortOption) => {
    switch (sort) {
      case "stars":
        return [...repos].sort((a, b) => b.stars - a.stars);
      case "updated":
        return [...repos].sort((a, b) => 
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      case "name":
        return [...repos].sort((a, b) => a.name.localeCompare(b.name));
      case "created":
        return [...repos].sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      default:
        return repos;
    }
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
  };
  
  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 5, repositories.length));
  };
  
  const sortedRepos = sortRepositories(repositories, sortBy);
  const visibleRepos = sortedRepos.slice(0, visibleCount);
  
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Repositories</h2>
        
        <div className="flex items-center">
          <label htmlFor="sort-repos" className="text-sm mr-2">Sort by:</label>
          <select 
            id="sort-repos" 
            className="text-sm border border-border rounded-md py-1 px-2 bg-background"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="stars">Stars</option>
            <option value="updated">Recently Updated</option>
            <option value="name">Name</option>
            <option value="created">Newest</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        {visibleRepos.map(repo => (
          <RepositoryCard key={repo.name} repository={repo} />
        ))}
      </div>
      
      {visibleCount < repositories.length && (
        <div className="mt-6 text-center">
          <button 
            onClick={loadMore}
            className="bg-muted dark:bg-muted/20 text-foreground px-4 py-2 rounded-md hover:bg-muted/80 dark:hover:bg-muted/30 focus:outline-none focus:ring-2 focus:ring-ring transition"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
}
