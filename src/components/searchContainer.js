import React from "react";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getAllJobs } from "../features/search/searchSlice.js";
import {
  clearFilters,
  handleFilters,
  changePage,
} from "../features/search/searchSlice.js";

const SearchContainer = () => {
  const {
    search,
    searchStatus,
    searchType,
    sort,
    page,
    isLoading,
    sortOptions,
  } = useSelector((state) => state.search);
  const { statusOptions, jobTypeOptions } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
    dispatch(getAllJobs());
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
      <form className="form">
        <div className="form-center">
          {/* search position */}
          <FormRow
            type="text"
            name="search"
            value={search}
            handleChange={handleChange}
          />
          {/* search by status */}
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleChange}
            list={["all", ...statusOptions]}
          />

          {/* search by type*/}
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleChange}
            list={["all", ...jobTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleChange}
            list={sortOptions}
          />
          <button disabled={isLoading} onClick={handleSubmit}>
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .form {
    width: 120vh;
  }

  .form-center {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;

    width: 100%;
  }
`;
export default SearchContainer;
