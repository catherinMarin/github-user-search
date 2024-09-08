import { GithubFollower } from "./github-follower.model";

export interface GithubUser {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    followers_url: string;
    repos_url: string;
    type: string;
    score: number;
    followers?: GithubFollower[];
  }
  