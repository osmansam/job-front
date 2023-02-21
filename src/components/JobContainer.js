import React from "react";
import styled from "styled-components";
import Job from "./Job";

const JobContainer = ({ jobs }) => {
  const jobsLength = jobs.length;
  return (
    <Wrapper jobsLength={jobsLength}>
      {jobs.map((job) => {
        return <Job key={job._id} job={job} />;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 2rem;
  border: 1px solid black;
  width: ${(props) => props.jobsLength * 300}px;
  max-width: 100%;
`;

export default JobContainer;
