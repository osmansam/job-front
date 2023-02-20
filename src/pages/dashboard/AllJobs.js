import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory, Link } from "react-router-dom";
import { getAllJobs } from "../../features/search/searchSlice";
import styled from "styled-components";
import JobContainer from "../../components/JobContainer";
import SearchContainer from "../../components/SearchContainer";

const AllJobs = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, jobs } = useSelector((state) => state.search);
  useEffect(() => {
    dispatch(getAllJobs());
  }, []);

  return (
    <Wrapper>
      <h1 className="title">All Jobs</h1>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <div className="search-container">
            <SearchContainer />
          </div>
          <div className="jobs-container">
            <JobContainer jobs={jobs} />
          </div>
        </div>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100%;
  display: inline-block;
  .title {
    width: 100%;
    font-size: 2rem;
    font-weight: 700;
    text-transform: capitalize;
    margin: 3rem auto;
    padding-left: 3rem;
    border-bottom: 1px solid #ccc;
  }
  .jobs-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 1.5rem;
  }
  .search-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1.5rem;
  }
`;

export default AllJobs;
