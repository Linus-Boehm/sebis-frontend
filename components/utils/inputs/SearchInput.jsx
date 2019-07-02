import React from "react";

const SearchInput = ({ name, value, onChange }) => (
  <div className="field">
    <p className="control has-icons-left">
      <input
        className="input"
        type="text"
        name={name}
        placeholder="Search"
        value={value}
        onChange={onChange}
      />
      <span className="icon is-small is-left">
        <i className="fas fa-lock"></i>
      </span>
    </p>
  </div>
)

export default SearchInput;
