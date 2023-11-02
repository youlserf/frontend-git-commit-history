// src/components/CommitHistory.tsx
import "./styles.css";
import React, { useEffect, useState } from "react";
import instance from "../../axiosConfig";
import { Commit } from "../../model/github.interface";
import ItemCommitHistory from "./ItemCommitHistory";
import { CustomButton, CustomInput } from "../CustomElements";

const CommitHistoryComponent: React.FC = ({handleLogout}) => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [owner, setOwner] = useState<string>(""); // State to capture username
  const [repo, setRepo] = useState<string>(""); // State to capture repository name

  const fetchCommitHistory = () => {
    instance
      .get(`/github/commit-history/${owner}/${repo}`)
      .then((response) => {
        setCommits(response.data);
      })
      .catch((error) => {
        console.error("Error fetching commit history:", error);
      });
  };

  useEffect(() => {
    // Initially fetch commit history with default values
    fetchCommitHistory();
  }, [owner, repo]); // Update commit history when owner or repo changes

  return (
    <>
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
      <button
        onClick={() => handleLogout()}
        style={{ position: "absolute", top: 2, right: 2 }}
      >
        logout
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        <CustomInput
          placeholder="GitHub Username"
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
        <CustomInput
          placeholder="Repository Name"
          type="text"
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
        />
        <CustomButton onClick={fetchCommitHistory}>Fetch Commits</CustomButton>
      </div>
      <div className="card">
        <div className="title">
          <p className="heading">Commit History of {owner}</p>
        </div>
        <div className="wrapper">
          {commits.map((commit) => (
            <ItemCommitHistory key={commit.sha} item={commit} />
          ))}
        </div>
      </div>
    </div>
    </>

  );
};

export default CommitHistoryComponent;
