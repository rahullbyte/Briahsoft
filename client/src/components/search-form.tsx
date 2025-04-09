import { FormEvent } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchFormProps {
  username: string;
  setUsername: (username: string) => void;
  onSearch: (username: string) => void;
}

export function SearchForm({ username, setUsername, onSearch }: SearchFormProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form className="flex items-center gap-2" onSubmit={handleSubmit}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Enter GitHub username"
            className="w-full pl-10 pr-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <Button type="submit">Search</Button>
      </form>
    </div>
  );
}
