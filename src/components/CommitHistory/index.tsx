// src/components/CommitHistory.tsx
import "./styles.css";
import React, { useEffect, useState } from "react";
import instance from "../../axiosConfig";
import { Commit } from "../../model/github.interface";
import ItemCommitHistory from "./ItemCommitHistory";
import { CustomButton, CustomInput } from "../CustomElements";

const defaultOwner = "youlserf"; // Replace with the default owner
const defaultRepo = "challenge-backend"; // Replace with the default repository

const CommitHistoryComponent: React.FC = ({handleLogout}) => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [owner, setOwner] = useState<string>(""); // State to capture username
  const [repo, setRepo] = useState<string>(""); // State to capture repository name

 

  const fetchCommitHistory = (owner, repo) => {
    const bearerToken = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    instance
      .get(`/github/commit-history/${owner}/${repo}`, config)
      .then((response) => {
        setCommits(response.data);
      })
      .catch((error) => {
        setCommits([]);
        if (error.response && error.response.status === 404) {
          // Show an alert or message to inform the user that the resource was not found
          alert("Resource not found. Please check the owner and repo.");
        } else {
          console.error("Error fetching commit history:", error);
        }
      });
  };

  useEffect(() => {
    // Initially fetch commit history with default values
    fetchCommitHistory(defaultOwner, defaultRepo);
  }, []); // Update commit history when owner or repo changes

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
          <CustomButton onClick={fetchCommitHistory}>
            Fetch Commits
          </CustomButton>
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
