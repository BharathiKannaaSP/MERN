import React from "react";
import "./Features.css";
import { featuresDetails } from "../../data";
import useFetch from "../../hooks/useFetch";
function Features() {
  const {data,loading,error} = useFetch("hotels/countByCity/?cities=Los Angeles,New York")
  console.log("Count By Count",data)
  return (
    <div className="features">
      {data && featuresDetails.map((features,i) => (
        <div className="featureItems" key={features.id}>
          <img className="featureImg" src={features.img} alt="property" />
          <div className="featureTitle">
            <h1>{features.title}</h1>
            <h2>{data?.[i] || "2"} Properties</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Features;
