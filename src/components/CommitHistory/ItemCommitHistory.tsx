import { Commit } from "../../model/github.interface";
import "./styles.css"

const colors = [
  { name: 'black'},
  { name: 'eerie-black'},
  { name: 'chinese-black'},
  { name: 'night-rider'},
  { name: 'chinese-white'},
  { name: 'anti-flash-white'},
  { name: 'white'},
];

import React from 'react';

const ItemCommitHistory: React.FC<{ item: Commit }> = ({ item }) => {
  // Select a random color from the colors array
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className={`color ${randomColor.name}`}>
      {item.commit.author.name}
      <span className="hex">{item.commit.message}</span>
    </div>
  );
};

export default ItemCommitHistory;


