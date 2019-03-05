import styled from "styled-components";

export const LandingP = styled.div`
  background: linear-gradient(rgb(207, 226, 199), rgb(118, 135, 110));
  color: rgb(248, 249, 247);
  height: 100vh;
  margin-top: 0;
  margin-bottom: 0;
  line-height: 1.4;
`;

export const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 70%;
  align-content: center;
  margin: auto;

  h1 {
    margin-top: 1.7em;
    @media (max-width: 400px) {
      font-size: 1.8em;
    }
  }

  @media (max-width: 350px) {
    max-width: 80%;
    font-size: 0.8em;
  }
`;

export const CloseBtn = styled.button`
  position: absolute;
  right: 2em;
  width: 5em;
`;
