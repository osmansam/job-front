import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory, Link } from "react-router-dom";
import { getAllJobs } from "../../features/job/jobSlice";
import styled from "styled-components";
import JobContainer from "../../components/JobContainer";

const AllJobs = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, jobs } = useSelector((state) => state.job);
  useEffect(() => {
    dispatch(getAllJobs());
  }, []);

  return (
    <Wrapper>
      <h1>All Jobs</h1>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <JobContainer jobs={jobs} />
        </div>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: block;
  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-transform: capitalize;
    margin: 3rem auto;
    align-items: center;
  }
`;

export default AllJobs;