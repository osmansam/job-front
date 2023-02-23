import React from "react";
import styled from "styled-components";
import Candidate from "./Candidate";
import { useSelector } from "react-redux";

const CandidatesContainer = () => {
  const { candidates } = useSelector((state) => state.user);
  return (
    <Wrapper>
      {candidates.map((candidate) => {
        return <Candidate key={candidate._id} candidate={candidate} />;
      })}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  margin: 2rem;
  max-width: 100%;
`;
