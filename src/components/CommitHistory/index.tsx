import React, { useEffect, useState } from "react";
import instance from "../../axiosConfig";
import { Commit } from "../../model/github.interface";
import { ColumnWrapper, CustomButton, CustomInput } from "../CustomElements";
import ItemCommitHistory from "./ItemCommitHistory";
import "./styles.css";




const defaultOwner = "youlserf"; // Replace with the default owner
const defaultRepo = "challenge-backend"; // Replace with the default repository

const CommitHistoryComponent: React.FC = ({ handleLogout }) => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [owner, setOwner] = useState<string>(""); // State to capture username
  const [repo, setRepo] = useState<string>(""); // State to capture repository name
  const [repositoryUrl, setRepositoryUrl] = useState<string>(""); // State to capture repository URL

  const fetchCommitHistory = () => {
    const bearerToken = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    if (repositoryUrl) {
      const urlParts = repositoryUrl.split("/");
      const urlOwner = urlParts[urlParts.length - 2];
      const urlRepo = urlParts[urlParts.length - 1];

      instance
        .get(`/github/commit-history/${urlOwner}/${urlRepo}`, config)
        .then((response) => {
          setOwner(urlOwner);
          setRepo(urlRepo);
          setCommits(response.data);
        })
        .catch((error) => {
          setCommits([]);
          if (error.response && error.response.status === 404) {
            // Show an alert or message to inform the user that the resource was not found
            alert("Resource not found. Please check the owner and repo in the URL.");
          } else {
            console.error("Error fetching commit history:", error);
          }
        });
    } else {
      // User entered username and repo name
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
    }
  };

  useEffect(() => {
    // Initially fetch commit history with default values
    fetchCommitHistory();
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
        <CustomButton
          onClick={() => handleLogout()}
          style={{ position: "absolute", top: 2, right: 2 }}
        >
          logout
        </CustomButton>
        <ColumnWrapper>
          <CustomInput
            placeholder="Repository URL"
            type="text"
            value={repositoryUrl}
            onChange={(e) => setRepositoryUrl(e.target.value)}
          />
          <CustomButton onClick={() => fetchCommitHistory()}>Fetch Commits</CustomButton>
        </ColumnWrapper>
        <div className="card">
          <div className="title">
            <p className="heading">
              Commit History of {owner || "Owner"} / {repo || "Repo"}
            </p>
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
