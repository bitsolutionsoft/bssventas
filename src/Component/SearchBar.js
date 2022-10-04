import React from "react";
import "../css/estilo.css";
function SearchBar(props) {
  return (
    <div className="row mb-2">
      <div className="col-8">
        <div className="input-group form-group ">
          <div className="input-group-prepend w-100">
            <span
              className="bi bi-search form-control-icon fa-1x "
              style={{ color: "gray" }}
            ></span>
            <input
              type="text"
              className="form-control "
              placeholder={props.placeholder}
              value={props.value}
              onChange={props.onChange}
            />
          </div>
        </div>
      </div>
      <div className="col-3">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle={props.data_bs_toggle}
          data-bs-target={props.data_bs_target}
          onClick={props.onClick}
        >
          Agregar Nuevo
        </button>
      </div>
    </div>
  );
}
export default SearchBar;
