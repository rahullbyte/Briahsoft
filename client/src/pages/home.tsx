import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGitHubUser, fetchCommitData } from "@/lib/githubApi";
import { SearchForm } from "@/components/search-form";
import { UserProfile } from "@/components/user-profile";
import { StatisticsCard } from "@/components/statistics-card";
import { LanguageChart } from "@/components/language-chart";
import { CommitsChart } from "@/components/commits-chart";
import { RepositoryList } from "@/components/repository-list";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { ErrorDisplay } from "@/components/error-display";
import { ThemeToggle } from "@/components/theme-toggle";
import { GitHubUser } from "@shared/types";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [searchedUsername, setSearchedUsername] = useState<string>("");
  
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
    isError: isUserError,
  } = useQuery({
    queryKey: [`/api/github/users/${searchedUsername}`],
    queryFn: () => fetchGitHubUser(searchedUsername),
    enabled: !!searchedUsername,
    staleTime: 5 * 60 * 1000,
  });
  
  const {
    data: commitData,
    isLoading: commitLoading,
    isError: isCommitError,
  } = useQuery({
    queryKey: [`/api/github/users/${searchedUsername}/commits`],
    queryFn: () => fetchCommitData(searchedUsername),
    enabled: !!searchedUsername,
    staleTime: 5 * 60 * 1000,
  });

  const handleSearch = (value: string) => {
    setSearchedUsername(value);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">GitHub Profile Analyzer</h1>
        <ThemeToggle />
      </header>

      <SearchForm 
        username={username} 
        setUsername={setUsername} 
        onSearch={handleSearch} 
      />

      {(userLoading || commitLoading) && <LoadingSkeleton />}

      {isUserError && (
        <ErrorDisplay 
          message={userError instanceof Error ? userError.message : "An error occurred while fetching user data"} 
        />
      )}

      {userData && !userLoading && !isUserError && (
        <div className="flex flex-col md:flex-row gap-8">
          <UserProfile user={userData as GitHubUser} />

          <main className="flex-1">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Statistics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <StatisticsCard 
                  title="Total Contributions" 
                  value={userData.total_pull_requests + userData.total_issues_contributed} 
                  label="Active" 
                  labelColor="secondary"
                />
                <StatisticsCard 
                  title="Pull Requests" 
                  value={userData.total_pull_requests} 
                  label="Contributor" 
                  labelColor="accent"
                />
                <StatisticsCard 
                  title="Code Reviews" 
                  value={userData.total_reviews} 
                  label="Reviewer" 
                  labelColor="primary"
                />
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Language Distribution</h2>
              <div className="rounded-lg border border-border bg-card shadow-sm p-6">
                <LanguageChart languages={userData.languages} />
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Contribution Activity</h2>
              <div className="rounded-lg border border-border bg-card shadow-sm p-6">
                <CommitsChart commitData={commitData || []} />
              </div>
            </section>

            <section>
              <RepositoryList repositories={userData.repositories} />
            </section>
          </main>
        </div>
      )}
    </div>
  );
}
