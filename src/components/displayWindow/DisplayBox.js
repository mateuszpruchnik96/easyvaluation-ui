import React, { useEffect, useState } from "react";
import Material from "./Material";

function DisplayBox({ materials }) {
  const [parts, setParts] = useState("");

  useEffect(() => {
    const fetchSingleParts = async () => {
      try {
        const res = await fetch(`http://localhost:8080/materials/singlepart`, {
          crossDomain: true,
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error(`Problem getting location data`);
        const data = await res.json();
        setParts([...data]);
        console.log(parts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSingleParts();
  }, []);

  try {
    return (
      <div className="display-box">
        {parts.map((part) => (
          <Material part={part} key={part.id} />
        ))}
      </div>
    );
  } catch (e) {
    return <div>Something went wrong</div>;
  }
}

export default DisplayBox;
