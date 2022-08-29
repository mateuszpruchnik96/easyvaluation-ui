import React from "react";

const Material = ({ part }) => {
  return (
    <div className={`display-box__material`}>
      <p>ID: {part.id}</p>
      <p>{part.description}</p>
    </div>
  );
};

export default Material;
