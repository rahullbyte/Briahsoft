import { GitHubUser, Repository, LanguageStat } from "@shared/types";

const defaultHeaders = {
  Accept: "application/vnd.github.v3+json",
};

type GitHubActivity =
  | { type: "commit"; repo: string; date: string }
  | { type: "pull_request"; repo: string; action: string; date: string; title: string }
  | { type: "issue"; repo: string; action: string; date: string; title: string }
  | { type: "review"; repo: string; action: string; date: string }
  | { type: "watch"; repo: string; date: string };

  
const getHeaders = () => {
  const token = import.meta.env.VITE_GITHUB_ACCESS_TOKEN 
  
  if (token) {
    return {
      ...defaultHeaders,
      Authorization: `Bearer ${token}`,
    };
  }
  
  return defaultHeaders;
};

function detectFrameworks(contents: any[]): string[] {
  const frameworks: string[] = [];
  const frameworkFiles: Record<string, string[]> = {
    "package.json": [
      "react",
      "express",
      "next",
      "vue",
      "angular",
      "nestjs",
      "prisma",
    ],
    "pom.xml": ["spring"],
    "requirements.txt": ["django", "flask"],
    Gemfile: ["rails"],
    "composer.json": ["laravel"],
    "build.gradle": ["android", "spring"],
  };

  if (!Array.isArray(contents)) return [];

  contents.forEach((file) => {
    const filename = file.name?.toLowerCase();
    if (filename && frameworkFiles[filename]) {
      frameworks.push(...frameworkFiles[filename]);
    }
  });
  
  return frameworks;
}

export function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    JavaScript: "#f7df1e",
    TypeScript: "#3178c6",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Python: "#3572A5",
    Java: "#b07219",
    PHP: "#4F5D95",
    Ruby: "#701516",
    "C#": "#178600",
    "C++": "#f34b7d",
    C: "#555555",
    Go: "#00ADD8",
    Swift: "#F05138",
    Kotlin: "#A97BFF",
    Rust: "#DEA584",
    Dart: "#00B4AB",
    Elixir: "#6e4a7e",
    Haskell: "#5e5086",
    Jupyter: "#DA5B0B",
  };

  return colors[language] || "#6c757d";
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays < 1) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 30) return `${diffDays} days ago`;
  
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths} ${diffMonths === 1 ? "month" : "months"} ago`;
  
  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears} ${diffYears === 1 ? "year" : "years"} ago`;
}

export function formatSize(sizeKB: number): string {
  if (sizeKB < 1024) return `${sizeKB} KB`;
  const sizeMB = (sizeKB / 1024).toFixed(1);
  return `${sizeMB} MB`;
}

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const headers = getHeaders();
  const userUrl = `https://api.github.com/users/${username}`;
  const reposUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
  const eventsUrl = `https://api.github.com/users/${username}/events?per_page=100`;
  const starredUrl = `https://api.github.com/users/${username}/starred?per_page=100`;

  try {
    const userResponse = await fetch(userUrl, { headers });
    if (!userResponse.ok) {
      throw new Error(`User fetch failed: ${userResponse.status} ${userResponse.statusText}`);
    }
    const userData = await userResponse.json();

    const reposResponse = await fetch(reposUrl, { headers });
    if (!reposResponse.ok) {
      throw new Error(`Repos fetch failed: ${reposResponse.status}`);
    }
    const repos = await reposResponse.json();

    const eventsResponse = await fetch(eventsUrl, { headers });
    if (!eventsResponse.ok) {
      throw new Error(`Events fetch failed: ${eventsResponse.status}`);
    }
    const events = await eventsResponse.json();

    const starredResponse = await fetch(starredUrl, { headers });
    if (!starredResponse.ok) {
      throw new Error(`Starred fetch failed: ${starredResponse.status}`);
    }
    const starredRepos = await starredResponse.json();

    let languageStats: Record<string, number> = {};
    let totalStars = 0;
    let totalForks = 0;
    let totalSize = 0;
    let totalOpenIssues = 0;
    let totalWatchers = 0;
    let detailedRepos: Repository[] = [];
    let frameworks = new Set<string>();
    let hasCollaborativeProjects = false;

    for (let repo of repos) {
      totalStars += repo.stargazers_count || 0;
      totalForks += repo.forks_count || 0;
      totalSize += repo.size || 0;
      totalOpenIssues += repo.open_issues_count || 0;
      totalWatchers += repo.watchers_count || 0;
      
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
      }
      
      if (repo.forks_count > 0 || repo.stargazers_count > 0) {
        hasCollaborativeProjects = true;
      }

      const contentsUrl = `https://api.github.com/repos/${username}/${repo.name}/contents`;
      const contentsResponse = await fetch(contentsUrl, { headers });
      const contents = contentsResponse.ok ? await contentsResponse.json() : [];
      let fileCount = Array.isArray(contents) ? contents.length : 0;
      let detectedFrameworks = detectFrameworks(contents);

      detectedFrameworks.forEach((fw) => frameworks.add(fw));

      detailedRepos.push({
        name: repo.name,
        description: repo.description || "No description provided",
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        language: repo.language || "Not specified",
        created_at: repo.created_at || "",
        updated_at: repo.updated_at || "",
        pushed_at: repo.pushed_at || "",
        url: repo.html_url,
        homepage: repo.homepage || "",
        size: repo.size || 0,
        watchers_count: repo.watchers_count || 0,
        open_issues_count: repo.open_issues_count || 0,
        has_issues: repo.has_issues || false,
        has_projects: repo.has_projects || false,
        has_wiki: repo.has_wiki || false,
        has_pages: repo.has_pages || false,
        archived: repo.archived || false,
        disabled: repo.disabled || false,
        visibility: repo.visibility || "",
        license: repo.license ? repo.license.name : "None",
        default_branch: repo.default_branch || "main",
        file_count: fileCount,
        frameworks: Array.from(detectedFrameworks),
      });
    }

    detailedRepos.sort((a, b) => b.stars - a.stars);
    const topRepos = detailedRepos.slice(0, 5);

    let recentActivity: GitHubActivity[] = [];
    let totalPullRequests = 0;
    let totalIssuesContributed = 0;
    let totalReviews = 0;
    let totalWatched = 0;

    events.forEach((event: any) => {
      if (event.type === "PushEvent") {
        recentActivity.push({
          type: "commit",
          repo: event.repo.name,
          date: event.created_at,
        });
      } else if (event.type === "PullRequestEvent") {
        totalPullRequests++;
        recentActivity.push({
          type: "pull_request",
          repo: event.repo.name,
          action: event.payload.action,
          date: event.created_at,
          title: event.payload.pull_request?.title || "N/A",
        });
      } else if (event.type === "IssuesEvent") {
        totalIssuesContributed++;
        recentActivity.push({
          type: "issue",
          repo: event.repo.name,
          action: event.payload.action,
          date: event.created_at,
          title: event.payload.issue?.title || "N/A",
        });
      } else if (event.type === "PullRequestReviewEvent") {
        totalReviews++;
        recentActivity.push({
          type: "review",
          repo: event.repo.name,
          action: event.payload.action,
          date: event.created_at,
        });
      } else if (event.type === "WatchEvent") {
        totalWatched++;
        recentActivity.push({
          type: "watch",
          repo: event.repo.name,
          date: event.created_at,
        });
      }
    });
    
    recentActivity = recentActivity.slice(0, 10);

    const totalLanguagesCount = Object.values(languageStats).reduce(
      (acc, count) => acc + count,
      0
    );
    
    const sortedLanguages: LanguageStat[] = Object.entries(languageStats)
      .sort((a, b) => b[1] - a[1])
      .map(([lang, count]) => ({
        language: lang,
        count,
        percentage: parseFloat(((count / totalLanguagesCount) * 100).toFixed(2)),
      }));

    const accountAge =
      (new Date().getTime() - new Date(userData.created_at).getTime()) /
      (1000 * 60 * 60 * 24 * 365);
      
    const experienceLevel =
      accountAge > 5 ? "Senior" : accountAge > 2 ? "Mid-level" : "Junior";

    return {
      username: userData.login || "",
      name: userData.name || userData.login || "",
      bio: userData.bio || "",
      email: userData.email || "",
      location: userData.location || "",
      company: userData.company || "",
      blog: userData.blog || "",
      twitter_username: userData.twitter_username || "",
      type: userData.type || "",
      site_admin: userData.site_admin || false,
      hireable: userData.hireable || null,
      public_repos: userData.public_repos || 0,
      public_gists: userData.public_gists || 0,
      followers: userData.followers || 0,
      following: userData.following || 0,
      created_at: userData.created_at || "",
      updated_at: userData.updated_at || "",
      avatar_url: userData.avatar_url || "",
      gravatar_id: userData.gravatar_id || "",
      html_url: userData.html_url || "",
      total_stars: totalStars,
      total_forks: totalForks,
      total_size_kb: totalSize,
      total_open_issues: totalOpenIssues,
      total_watchers: totalWatchers,
      total_pull_requests: totalPullRequests,
      total_issues_contributed: totalIssuesContributed,
      total_reviews: totalReviews,
      total_watched: totalWatched,
      languages: sortedLanguages,
      frameworks: Array.from(frameworks),
      top_repos: topRepos,
      repositories: detailedRepos,
      recent_activity: recentActivity,
      has_collaborative_projects: hasCollaborativeProjects,
      experience_level: experienceLevel,
      account_age_years: parseFloat(accountAge.toFixed(1)),
    };
  } catch (error: any) {
    console.error("Error fetching GitHub data:", error.message);
    throw error;
  }
}

export async function fetchCommitData(username: string): Promise<{ date: string; count: number }[]> {
  const headers = getHeaders();
  const eventsUrl = `https://api.github.com/users/${username}/events?per_page=100`;

  try {
    const response = await fetch(eventsUrl, { headers });
    if (!response.ok) {
      throw new Error(`Events fetch failed: ${response.status}`);
    }
    
    const events = await response.json();
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);
    
    const dateData: { date: string; count: number }[] = [];
    for (let i = 0; i < 30; i++) {
      const day = new Date(thirtyDaysAgo);
      day.setDate(day.getDate() + i);
      
      const formattedDate = day.toISOString().split('T')[0];
      
      const displayDate = day.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
      
      dateData.push({
        date: displayDate,
        count: 0
      });
    }
    
    events.forEach((event: any) => {
      if (event.type === 'PushEvent') {
        const eventDate = new Date(event.created_at);
        const formattedEventDate = eventDate.toISOString().split('T')[0];
        
        if (eventDate >= thirtyDaysAgo) {
          const dayIndex = Math.floor((eventDate.getTime() - thirtyDaysAgo.getTime()) / (1000 * 60 * 60 * 24));
          
          if (dayIndex >= 0 && dayIndex < 30) {
            const commitCount = event.payload.commits ? event.payload.commits.length : 0;
            dateData[dayIndex].count += commitCount;
          }
        }
      }
    });
    
    return dateData;
  } catch (error) {
    console.error("Error fetching commit data:", error);
    throw error;
  }
}
