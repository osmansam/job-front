import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Candidate = ({ candidate }) => {
  const history = useHistory();
  return (
    <Wrapper>
      <div className="candidate">
        <div className="candidate__info">
          <h3>{candidate.user.name}</h3>
          <p>{candidate.user.email}</p>
          <p>{candidate.user.phone}</p>
        </div>
        <div className="candidate__actions">
          <button
            onClick={() => {
              history.push(`/dashboard/candidate/${candidate._id}`);
            }}
          >
            View
          </button>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .candidate {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid black;
    border-radius: 5px;
    padding: 1rem;
    margin: 1rem;
    width: 100%;
    max-width: 500px;
    height: 100px;
    cursor: pointer;
  }
`;
