import React from "react";
import { FaSearch } from 'react-icons/fa';

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
      <span className="icon is-left is-small">
        <FaSearch />
      </span>
    </p>
  </div>
)

export default SearchInput;
