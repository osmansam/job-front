import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FormRow from "../components/FormRow";
import FormRowSelect from "../components/FormRowSelect";
import { registerUser, loginUser } from "../features/user/userSlice";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.user);
  const [isMember, setIsMember] = React.useState(false);

  const initialState = {
    name: "",
    email: "",
    password: "",
    role: "employee",
    isMember, // true = login, false = register
  };
  const [values, setValues] = React.useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const toggleMember = () => {
    setIsMember((prevMember) => {
      let isMember = !prevMember;
      setValues({ ...values, isMember });
      return isMember;
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, name, role } = values;
    if (isMember) {
      if (!email || !password) {
        toast.error("Please fill out all fields");
        return;
      }
      dispatch(loginUser({ email, password }));
      setValues(initialState);
    }
    if (!isMember) {
      if (!name || !email || !password) {
        toast.error("Please fill out all fields");
        return;
      }
      dispatch(registerUser({ name, email, password, role }));
      setValues(initialState);
      setIsMember(true);
    }
  };
  React.useEffect(() => {
    if (user) {
      setTimeout(() => {
        history.push("/allJobs");
      }, 100);
    }
  }, [user]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <h2>{isMember ? "Login" : "Register"}</h2>
        {!isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
            labelText="Name"
          />
        )}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
          labelText="Email"
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
          labelText="Password"
        />
        {!isMember && (
          <FormRowSelect
            name="role"
            value={values.role}
            handleChange={handleChange}
            list={["employee", "employer"]}
          />
        )}

        <button type="submit" className="btn btn-primary">
          {isMember ? "Login" : "Register"}
        </button>
        <p>
          {isMember ? "Need to register?" : "Already a member?"}
          <button type="button" onClick={toggleMember}>
            {isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vh;
    height: 100%;
    margin-top: 5rem;
  }
`;

export default Register;
