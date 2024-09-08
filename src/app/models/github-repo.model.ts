export interface GithubRepo {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string | null;
    forks_count: number;
    stargazers_count: number;
    language: string;
    open_issues_count: number;
    visibility: string;
    created_at: string;
    updated_at: string;
  }
  