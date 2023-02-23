import { React, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCandidate } from "../features/user/userSlice";

const Candidate = ({ candidate }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [readMore, setReadMore] = useState(false);
  const {
    name,
    lastName,
    degree,
    university,
    email,
    address,
    city,
    country,
    zipCode,
    phone,
    field,
    graduationYear,
    skills,
  } = candidate;
  const handleAccepted = () => {
    dispatch(
      updateCandidate({ id: candidate._id, isAccepted: true, isPending: false })
    );
  };
  const handleRejected = () => {
    dispatch(
      updateCandidate({ id: candidate._id, isRejected: true, isPending: false })
    );
  };
  return (
    <Wrapper>
      <div className="candidate">
        <p>
          <span className="bold">FullName : </span>
          {name} {lastName}
        </p>
        <p>
          <span className="bold">Degree : </span>
          {degree}
        </p>
        <p>
          <span className="bold">University : </span>
          {university}
        </p>
        {readMore && (
          <>
            <p>
              <span className="bold">Email : </span>
              {email}
            </p>
            <p>
              <span className="bold">Address : </span>
              {address}
            </p>
            <p>
              <span className="bold">City : </span>
              {city}
            </p>
            <p>
              <span className="bold">Country : </span>
              {country}
            </p>
            <p>
              <span className="bold">ZipCode : </span>
              {zipCode}
            </p>
            <p>
              <span className="bold">Phone : </span>
              {phone}
            </p>
            <p>
              <span className="bold">Field : </span>
              {field}
            </p>
            <p>
              <span className="bold">GraduationYear : </span>
              {graduationYear}
            </p>
            <p>
              <span className="bold">Skills : </span>
              {skills}
            </p>
          </>
        )}
        <button
          onClick={() => {
            setReadMore(!readMore);
          }}
        >
          {readMore ? "Less" : "More"}
        </button>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  text-transform: capitalize;
  .candidate {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    justify-items: center;
    border-radius: 5px;
    padding: 1rem;
    margin: 1rem;
    width: 70%;
    border: 1px solid #000;
    cursor: pointer;
  }
  button {
    color: white;
    border: none;
    grid-column: 2/3;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    margin-left: auto;
    margin-right: auto;
  }
  .bold {
    font-weight: bold;
  }
`;
export default Candidate;
