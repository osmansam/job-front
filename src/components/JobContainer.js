import React from "react";
import styled from "styled-components";
import Job from "./Job";

const JobContainer = ({ jobs }) => {
  return (
    <Wrapper>
      {jobs.map((job) => {
        return <Job key={job.id} job={job} />;
      })}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 1rem;
`;

export default JobContainer;
