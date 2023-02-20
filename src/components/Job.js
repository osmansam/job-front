import React from "react";
import styled from "styled-components";

const Job = ({ job }) => {
  const { id, position, company, jobLocation, jobType, status } = job;

  return (
    <Wrapper>
      <div className="job-container">
        <h1>{position}</h1>
        <h2>
          <span>Company:</span>
          {company}
        </h2>
        <h3>
          <span>Location:</span>
          {jobLocation}
        </h3>
        <h4>
          <span>Type:</span>
          {jobType}
        </h4>
        <h5>
          <span>Status:</span>
          {status}
        </h5>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .job-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    border: 1px solid black;
    border-radius: 5px;
    padding: 1rem;
    margin: 1rem;
    width: 100%;
    max-width: 200px;
  }
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-transform: capitalize;
  }
  h2 {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 1rem;
    text-transform: capitalize;
  }
  h3 {
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 1rem;
    text-transform: capitalize;
  }
  h4 {
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 1rem;
    text-transform: capitalize;
  }
  h5 {
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 1rem;
    text-transform: capitalize;
  }
  span {
    font-weight: 700;
    margin-right: 0.5rem;
  }
`;

export default Job;
