import React, { useState, Fragment, ChangeEvent, FormEvent } from "react";
import MetaData from "../Layout/MetaData";
import "./Search.css";
import { useNavigate } from "react-router";

const Search: React.FC = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  const keywordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <Fragment>
      <MetaData title="Search A Product -- ECOMMERCE" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={keywordChangeHandler}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
