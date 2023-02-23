import React from "react";
import styled from "styled-components";
import Candidate from "./Candidate";
import { useSelector } from "react-redux";

const CandidatesContainer = ({ candidates }) => {
  return (
    <Wrapper>
      <h1 className="title">Candidates</h1>
      {candidates &&
        candidates.map((candidate) => {
          return <Candidate key={candidate._id} candidate={candidate} />;
        })}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin: 2rem;
  max-width: 100%;
  width: 100%;
  .title {
    text-align: center;
    margin-bottom: 1rem;
  }
`;
export default CandidatesContainer;
