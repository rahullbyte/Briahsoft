export interface LanguageStat {
    language: string;
    count: number;
    percentage: number;
  }
  
  export interface Repository {
    name: string;
    description: string;
    stars: number;
    forks: number;
    language: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    url: string;
    homepage: string;
    size: number;
    watchers_count: number;
    open_issues_count: number;
    has_issues: boolean;
    has_projects: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    archived: boolean;
    disabled: boolean;
    visibility: string;
    license: string;
    default_branch: string;
    file_count: number;
    frameworks: string[];
  }
  
  export interface GitHubUser {
    username: string;
    name: string;
    bio: string;
    email: string;
    location: string;
    company: string;
    blog: string;
    twitter_username: string;
    type: string;
    site_admin: boolean;
    hireable: boolean | null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
    avatar_url: string;
    gravatar_id: string;
    html_url: string;
    total_stars: number;
    total_forks: number;
    total_size_kb: number;
    total_open_issues: number;
    total_watchers: number;
    total_pull_requests: number;
    total_issues_contributed: number;
    total_reviews: number;
    total_watched: number;
    languages: LanguageStat[];
    frameworks: string[];
    top_repos: Repository[];
    repositories: Repository[];
    recent_activity: any[];
    has_collaborative_projects: boolean;
    experience_level: string;
    account_age_years: number;
  }
  