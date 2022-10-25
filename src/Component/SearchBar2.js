import React from "react";
import "../css/estilo.css";

function SearchBar2(props) {
  return (
    
    <div className="row mb-2">
      <div className="col">
        <div className="input-group form-group ">
          <div className="input-group-prepend w-100">
            <span
              className="bi bi-search form-control-icon fa-1x "
              style={{ color: "gray" }}
            ></span>
            <input
              type="text"
              className="form-control"
              placeholder={props.placeholder}
              value={props.value}
              onChange={props.onChange}
            />
          </div>
        </div>
      </div>
    </div>
 
   );
}
export default SearchBar2;
