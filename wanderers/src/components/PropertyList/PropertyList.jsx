import React from "react";
import { propertyListType } from "../../data";
import useFetch from "../../hooks/useFetch";
import "./PropertyList.css";
function PropertyList() {
  const {data,loading,error} = useFetch("/hotels/countByType")
  console.log("Count By Type",data)
  return (
    <div className="pList">
      {loading?<>Loading...</>:<>
      {data && propertyListType.map((propertyList,i) => (
        <div className="pListItem" key={propertyList.id}>
          <img className="pListImg" src={propertyList.img} alt={propertyList.alt} />
          <div className="pListTitle">
            <h1>{data[i]?.type}</h1>
            <h2>{data[i]?.count} {data[i]?.type}</h2>
          </div>
        </div>
      ))}
      </>}
    </div>
  );
}

export default PropertyList;
