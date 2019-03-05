import styled from "styled-components";

export const Act = styled.div`
  color: black;
  padding: 8px;
  border-radius: 2px;
  border-bottom: 1px solid grey;
  text-align: left;
  font-size: 1.5rem;
`;

export const ActPage = styled.div`
  text-align: center;
  height: calc(100vh - 60px);
  h1 {
    margin: 0;
    color: black;
  }
`;

export const ActName = styled.h1`
  font-size: 1.7rem;
  text-align: left;
`;

export const ActInfo = styled.p`
  font-size: 1.2rem;
`;

export const Created = styled.p`
  font-size: 0.7rem;
  color: black;
  text-align: right;
  margin: 0;
`;

// CREATE ACTIVITY

export const Creating = styled.div`
  display: flex;
  margin-bottom: 20px;

  div {
    margin: auto;
  }
  h2 {
    margin-top: 0;
    padding-top: 0.6em;
    text-align: center;
  }
  input {
    margin-left: 5px;
    border: none;
    border-bottom: 1px solid grey;
    position: absolute;
    right: 5%;
    padding-left: 5px;
    height: 1.3em;
    width: 110px;
    @media (min-width: 600px) {
      right: 19%;
      width: 140px;
    }
  }

  select {
    width: 123px;
    right: 5%;
    height: 2.4em;
    margin-left: 1em;
    position: absolute;
    @media (min-width: 600px) {
      right: 19%;
      width: 150px;
    }
  }

  textarea {
    width: calc(100% - 6px);
    padding-left: 5px;
    margin-top: 10px;
  }
`;

export const OtherInput = styled.input`
  margin-top: 10px;
`;

export const Div = styled.div`
  margin: auto;
  width: 95%;
  font-size: 0.9em;
  @media (max-width: 350px) {
    font-size: 0.7em;
  }
`;

export const Form = styled.div`
  /* width: 80%; */
  padding-top: 1em;

  input {
    padding: 0.5em;
  }
  textarea {
    padding: 0.5em;
    /* width: 100%; */
  }
  select {
    /* height: 2.5em; */
  }
  @media (min-width: 600px) {
    /* width: 60%; */
  }
`;

export const FormSize = styled.form`
  width: 100%;
  margin-top: 10px;
  bottom: 0;
  padding-bottom: 10px;
`;

export const Label = styled.div``;

export const MapSize = styled.div`
  /* width: 95%; */
  margin: auto;
  @media (min-width: 600px) {
    /* width: 70%; */
  }
`;

export const ActivityDiv = styled.div`
  display: flex;
  margin: auto;
  font-size: 0.8em;
  background: rgb(247, 245, 237);
`;

export const ShowActivity = styled.ul`
  list-style: none;

  padding-left: 0;
  width: 100%;
`;

export const ActivityLi = styled.div`
  text-align: left;
  margin-bottom: 20px;
  @media (min-width: 500px) {
    width: 50%;
  }
`;

export const ActivityBig = styled.li`
  font-size: 1.5em;
  margin-bottom: 0.5em;
  text-align: center;
  font-weight: 600;
`;

export const ButtonDivs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const ButtonClosing = styled.button`
  border: none;
  font-size: 0.9em;
  border-radius: 5px;
  margin: 5px;
  background: none;
  position: absolute;
  right: 0;
  a {
    color: black;
  }
`;

export const ButtonsAct = styled.button`
  border: none;
  color: white;
  font-size: 0.9em;
  border-radius: 5px;
  padding-right: 10px;
  margin: 10px;
  background: rgb(83, 109, 122);
  a {
    text-decoration: none;
    color: white;
  }
`;
