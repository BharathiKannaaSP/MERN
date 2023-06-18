import React from "react";
import { FeaturedPropertiesDetails } from "../../data";
import "./FeaturedProperties.css";
import useFetch from "../../hooks/useFetch";
function FeaturedProperties() {
  const { data, error, loading } = useFetch("/hotels?featured=true&limit=3");
  console.log(data, "Featured Properties");
  return (
    <div className="featuredProperties">
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          {data &&
            FeaturedPropertiesDetails.map((FeaturedProperties, i) => (
              <div
                className="featuredPropertiesItems"
                key={FeaturedProperties.id}
              >
                <img
                  src={data[i]?.photos[0]}
                  alt={FeaturedProperties.alt}
                  className="featuredPropertyImg"
                />
                <span className="featuredPropertyName">{data[i]?.name}</span>
                <span className="featuredPropertyCity">{data[i]?.city}</span>
                <span className="featuredPropertyPrice">
                  Starting From ${data[i]?.cheapestPrice}
                </span>
                {data[i]?.rating && (
                  <div className="featuredPropertyrating">
                    <button>{data[i]?.rating}</button>
                    <p>{FeaturedProperties.reviews}</p>
                  </div>
                )}
              </div>
            ))}
        </>
      )}
    </div>
  );
}

export default FeaturedProperties;
