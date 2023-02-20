import React from "react";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  clearFilters,
  handleFilters,
  changePage,
} from "../../features/search/searchSlice";

const SearchContainer = () => {
  const { search, searchStatus, searchType, sort, page, isLoading } =
    useSelector((state) => state.search);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleFilters({ [name]: value }));
  };
  const handlePageChange = (e) => {
    const { name, value } = e.target;
    dispatch(changePage(value));
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <FormRow
          label="Search"
          name="search"
          value={search}
          onChange={handleChange}
        />
        <FormRowSelect
          label="status"
          name="searchStatus"
          value={searchStatus}
          onChange={handleChange}
        />
        <FormRowSelect
          label="type"
          name="searchType"
          value={searchType}
          onChange={handleChange}
        />
        <FormRowSelect
          label="sort"
          name="sort"
          value={sort}
          onChange={handleChange}
        />
        <button onClick={handleSubmit} disabled={isLoading}>
          Clear Filters
        </button>
      </form>
    </Wrapper>
  );
};
const Wrapper = styled.div``;
export default SearchContainer;
