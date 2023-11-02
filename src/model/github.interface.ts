
export interface CommitAuthor {
    name: string;
    email: string;
    date: string;
  }
  
  export interface Commit {
    sha: string;
    commit: {
      author: CommitAuthor;
      message: string;
    };
    html_url: string;
    author: {
      login: string;
      id: number;
      avatar_url: string;
      html_url: string;
    };
    committer: {
      login: string;
      id: number;
      avatar_url: string;
      html_url: string;
    };
  }
  