import styled from "styled-components";

export const Act = styled.div`
  /* background: #abbaab; fallback for old browsers */
  /* background: -webkit-linear-gradient(
    to bottom,
    #ffffff,
    #abbaab
  );  */
  /* Chrome 10-25, Safari 5.1-6 */
  /* background: linear-gradient(
    to bottom,
    #ffffff,
    #abbaab
  );  */
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  /* margin: 2px; */
  /* font-size: 2rem; */
  background: rgb(247, 245, 237);
  color: black;
  padding: 8px;
  /* -webkit-box-shadow: 5px 5px 15px 5px green;
  box-shadow: 5px 5px 15px 5px grey;
  text-shadow: 2px 2px 2px black; */
  border-radius: 2px;
  border-bottom: 1px solid grey;
  text-align: left;
  /* border: 1px solid black; */
  /* margin: 5px; */
  font-size: 1.5rem;
  /* padding: 20px; */
  /* border-radius: 10px; */
`;

export const ActPage = styled.div`
  text-align: center;
  height: calc(100vh - 60px);
  h1 {
    margin: 0;
    color: black;
    /* text-shadow: 3px 3px 3px black; */
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
  /* background: rgb(226, 237, 218); */
  display: flex;
  /* width: 100%; */
  margin-bottom: 20px;
  background: rgb(247, 245, 237);

  div {
    /* width: 80%; */
    margin: auto;
  }
  h1 {
    margin-top: 0;
    padding-top: 0.6em;
    text-align: center;
  }
  input {
    margin-left: 5px;
    border: none;
    border-bottom: 1px solid grey;
    position: absolute;
    right: 10%;
    padding-left: 5px;
    height: 1.3em;
    width: 100px;
  }

  select {
    width: 120px;
    /* position: fixed; */
    right: 10%;
    height: 2.4em;
    margin-left: 1em;
    position: absolute;
  }

  textarea {
    width: calc(100% - 6px);
    padding-left: 5px;
    margin-top: 10px;
  }
`;

export const Div = styled.div`
  margin: auto;
  width: 95%;
  font-size: 0.9em;
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
  /* width: 100%; */
  display: flex;
  margin: auto;
  font-size: 0.8em;
  background: rgb(247, 245, 237);
`;

export const ShowActivity = styled.ul`
  list-style: none;

  padding-left: 0;
  /* font-size: 0.8rem; */
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

// export const CloseActivity = styled.li`
//   display: flex;
//   margin: auto;
// `;

export const ButtonDivs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const ButtonClosing = styled.button`
  border: none;
  /* color: white; */
  font-size: 0.9em;
  border-radius: 5px;
  margin: 5px;
  background: none;
  /* padding-right: 10px;
  background: rgb(83, 109, 122); */
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
  /* background: #232526;  */
  /* fallback for old browsers */
  /* background: -webkit-linear-gradient(
    to top,
    #414345,
    #232526
  );  */
  /* Chrome 10-25, Safari 5.1-6 */
  /* background: linear-gradient(
    to top,
    #414345,
    #232526
  );  */
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  a {
    text-decoration: none;
    color: white;
  }
`;
