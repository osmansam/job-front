import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobContainer from "../../components/JobContainer";
import styled from "styled-components";
import { getAllCandidates } from "../../features/user/userSlice";
import { changeAppliedJobPage } from "../../features/search/searchSlice";
const AppliedJobs = () => {
  const { user, candidates } = useSelector((state) => state.user);
  const { appliedJobspage } = useSelector((state) => state.search);
  const { jobs } = useSelector((state) => state.search);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [jobsToShow, setJobsToShow] = useState([]);
  const dispatch = useDispatch();
  const handlePageChange = (pageNumber) => {
    dispatch(changeAppliedJobPage(pageNumber));
  };
  useEffect(() => {
    dispatch(getAllCandidates());
    // dispatch(handlePageChange(1));
  }, [dispatch]);
  useEffect(() => {
    if (candidates) {
      console.log(candidates);
      const appliedJobs = candidates?.filter((candidate) => {
        return candidate.user === user.userId;
      });
      const jobs = appliedJobs?.map((obj) => obj.job);
      setNumberOfPages(Math.ceil(jobs.length / 4));
      const startIndex = (appliedJobspage - 1) * 4;
      const endIndex = startIndex + 4;
      setJobsToShow(jobs.slice(startIndex, endIndex));
    }
  }, [dispatch, candidates, appliedJobspage]);

  return (
    <Wrapper>
      <h1 className="title">Applied Jobs</h1>
      <div className="jobs-container">
        <JobContainer jobs={jobsToShow} />
      </div>
      <div className="page-container">
        {numberOfPages > 1 &&
          Array.from({ length: numberOfPages }, (_, i) => {
            const pageNumber = i + 1;
            return (
              <button
                key={pageNumber}
                className={`${
                  appliedJobspage === pageNumber ? "active" : null
                }`}
                onClick={() => {
                  handlePageChange(pageNumber);
                }}
              >
                {pageNumber}
              </button>
            );
          })}
      </div>
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

  .page-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1.5rem;
  }
  .active {
    background-color: black;
    color: #fff;
  }
`;
export default AppliedJobs;
