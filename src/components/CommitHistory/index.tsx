import React, { useState } from "react";
import instance from "../../axiosConfig";
import { Commit } from "../../model/github.interface";
import { ColumnWrapper, CustomButton, CustomInput } from "../CustomElements";
import ItemCommitHistory from "./ItemCommitHistory";
import "./styles.css";

const CommitHistoryComponent: React.FC = ({ handleLogout }) => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [owner, setOwner] = useState<string>("");
  const [repo, setRepo] = useState<string>("");
  const [repositoryUrl, setRepositoryUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValidGitHubRepoURL = (url: string) => {
    const githubRepoPattern = /^(https?:\/\/)?(www\.)?github\.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)(\.git)?$/i;
    return githubRepoPattern.test(url);
  };

  const extractRepoNameFromURL = (urlRepo: string) => {
    if (urlRepo.endsWith(".git")) {
      urlRepo = urlRepo.slice(0, -4);
    }
    return urlRepo;
  };

  const fetchCommitHistory = async () => {
    if (!isValidGitHubRepoURL(repositoryUrl)) {
      setError(
        "Please enter a valid URL, example:\nhttps://github.com/youlserf/backend-git-commit-history\nhttps://github.com/youlserf/backend-git-commit-history.git"
      );
      return;
    }

    setLoading(true);
    setError(null);

    const bearerToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    try {
      let urlOwner = owner;
      let urlRepo = repo;

      if (repositoryUrl) {
        const urlParts = repositoryUrl.split("/");
        urlOwner = urlParts[urlParts.length - 2];
        urlRepo = extractRepoNameFromURL(urlParts[urlParts.length - 1]);
      }

      const response = await instance.get(
        `/github/commit-history/${urlOwner}/${urlRepo}`,
        config
      );

      setOwner(urlOwner);
      setRepo(urlRepo);
      setCommits(response.data);
    } catch (error) {
      setCommits([]);
      if (error.response && error.response.status === 404) {
        setError("Resource not found. Please check the format of the URL.");
      } else {
        setError("Error fetching commit history.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <p>Error: {error}</p>}
      {commits[0] && (
        <img
          src={commits[0]?.author?.avatar_url ?? "fallback-image-url"}
          alt="Avatar"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
          }}
        />
      )}
      <div>
        <CustomButton
          onClick={() => handleLogout()}
          style={{ position: "absolute", top: 2, right: 2 }}
        >
          Logout
        </CustomButton>
        <ColumnWrapper>
          <CustomInput
            placeholder="Repository URL"
            type="text"
            value={repositoryUrl}
            onChange={(e) => setRepositoryUrl(e.target.value)}
          />
          <CustomButton onClick={() => fetchCommitHistory()}>
            Fetch Commits
          </CustomButton>
        </ColumnWrapper>
        <div className="card">
          <div className="title">
            <p className="heading">
              Commit History of {owner || "Owner"} / {repo || "Repo"}
            </p>
          </div>
          <div className="wrapper">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
              </div>
            ) : (
              commits.map((commit) => (
                <ItemCommitHistory key={commit.sha} item={commit} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommitHistoryComponent;
