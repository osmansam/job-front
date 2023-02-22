import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FormRow from "../../components/FormRow";
import FormRowSelect from "../../components/FormRowSelect";

import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  createProfile,
  getProfile,
  handleChange,
  setIsEditing,
} from "../../features/profile/ProfileSlice.js";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    name,
    lastName,
    email,
    phone,
    address,
    city,
    country,
    zipCode,
    degreeOptions,
    degree,
    field,
    fieldOptions,
    university,
    graduationYear,
    skills,
    isLoading,
    isEditing,
  } = useSelector((state) => state.profile);

  const { user } = useSelector((state) => state.user);

  const handleProfileChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };
  React.useEffect(() => {
    dispatch(getProfile());
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setIsEditing(true));
    dispatch(
      createProfile({
        name,
        lastName,
        email,
        phone,
        address,
        city,
        country,
        zipCode,
        degree,
        field,
        university,
        graduationYear,
        skills,
        isEditing,
      })
    );
  };

  if (!user) {
    return history.push("/register");
  }

  return (
    <Wrapper>
      <h1 className="title">Profile</h1>
      <div className="underline"></div>
      <form onSubmit={handleSubmit}>
        <FormRow
          label="Name"
          type="text"
          name="name"
          value={name}
          handleChange={handleProfileChange}
        />
        <FormRow
          label="Last Name"
          type="text"
          name="lastName"
          value={lastName}
          handleChange={handleProfileChange}
        />
        <FormRow
          label="Email"
          type="email"
          name="email"
          value={email}
          handleChange={handleProfileChange}
        />
        <FormRow
          label="Phone"
          type="text"
          name="phone"
          value={phone}
          handleChange={handleProfileChange}
        />
        <FormRow
          label="Address"
          type="text"
          name="address"
          value={address}
          handleChange={handleProfileChange}
        />
        <FormRow
          label="City"
          type="text"
          name="city"
          value={city}
          handleChange={handleProfileChange}
        />
        <FormRow
          label="Country"
          type="text"
          name="country"
          value={country}
          handleChange={handleProfileChange}
        />
        <FormRow
          label="Zip Code"
          type="text"
          name="zipCode"
          value={zipCode}
          handleChange={handleProfileChange}
        />
        <FormRowSelect
          label="Degree"
          name="degree"
          value={degree}
          handleChange={handleProfileChange}
          list={degreeOptions}
        />
        <FormRowSelect
          label="Field"
          name="field"
          value={field}
          handleChange={handleProfileChange}
          list={fieldOptions}
        />
        <FormRow
          label="University"
          type="text"
          name="university"
          value={university}
          handleChange={handleProfileChange}
        />
        <FormRow
          label="Graduation Year"
          type="text"
          name="graduationYear"
          value={graduationYear}
          handleChange={handleProfileChange}
        />
        <FormRow
          label="Skills"
          type="text"
          name="skills"
          value={skills}
          handleChange={handleProfileChange}
        />
        <button type="submit">{isEditing ? "Edit" : "Submit"}</button>
      </form>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .title {
    text-align: center;
    margin-bottom: 1rem;
    margin-top: 2rem;
  }
  .underline {
    width: 12rem;
    height: 0.25rem;
    background: gray;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2rem;
  }
  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 5rem;
    row-gap: 1.5rem;
    max-width: 800px;
    margin: 0 auto;
  }
  button {
    margin-left: 1rem;
    margin-top: 1.3rem;
    height: 2.5rem;
    padding: 0.5rem 1rem;
    background: gray;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      background: #333;
    }
  }
`;
export default Profile;
