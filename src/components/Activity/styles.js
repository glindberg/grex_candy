import styled from "styled-components";

export const Act = styled.div`
  background: #3e5151; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #decba4,
    #3e5151
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #decba4,
    rgb(207, 226, 199)
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  margin: 2px;
  /* font-size: 2rem; */
  color: black;
  padding: 10px;
  /* -webkit-box-shadow: 5px 5px 15px 5px green;
  box-shadow: 5px 5px 15px 5px grey;
  text-shadow: 2px 2px 2px black; */
  border-radius: 2px;
  border: 1px solid grey;
  text-align: left;
`;

export const ActPage = styled.div`
  text-align: center;
  background: linear-gradient(rgb(207, 226, 199), rgb(118, 135, 110));
  h1 {
    margin: 0;
    color: black;
    /* text-shadow: 3px 3px 3px black; */
  }
`;

export const ActName = styled.strong`
  font-size: 1.8rem;
  text-align: left;
`;

export const Created = styled.p`
  font-size: 0.5rem;
  color: black;
  text-align: right;
`;

// CREATE ACTIVITY

export const Creating = styled.div`
  /* background: rgb(226, 237, 218); */
  display: table;
  width: 100%;
  h1 {
    margin-top: 0;
    padding-top: 0.6em;
    text-align: center;
  }
`;

export const Form = styled.div`
  width: 80%;
  margin: 0.7em;

  input {
    padding: 0.5em;
  }
  textarea {
    padding: 0.5em;
    width: 100%;
  }
  select {
    height: 2.5em;
  }
  @media (min-width: 600px) {
    width: 60%;
  }
`;

export const Label = styled.div``;

export const MapSize = styled.div`
  width: 95%;
  margin: auto;
  @media (min-width: 600px) {
    width: 70%;
  }
`;
