import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobContainer from "../../components/JobContainer";
import styled from "styled-components";
import { getAllCandidates } from "../../features/user/userSlice";
const AppliedJobs = () => {
  const { user, candidates } = useSelector((state) => state.user);
  const { jobs } = useSelector((state) => state.search);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCandidates());
    const appliedJobs = candidates?.filter((candidate) => {
      return candidate.user === user.userId;
    });
    const jobs = appliedJobs?.map((obj) => obj.job);
    console.log(jobs);
  }, []);

  return (
    <Wrapper>
      <h1 className="title">Applied Jobs</h1>
      <div className="jobs-container">
        <JobContainer jobs={jobs} />
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div``;
export default AppliedJobs;
