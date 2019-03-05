import styled from "styled-components";

export const Button = styled.button`
  position: fixed;
  color: red;
  left: 78%;
  top: 95px;
  background: none;
  border: none;
`;

export const Wrapper = styled.div`
  text-align: center;
  position: fixed;
  z-index: 1000;
  width: 100%;
  top: 65px;
  height: 100vh;
  margin-top: 0px;
`;

export const ArrowUpChat = styled.button`
  color: black;
`;

export const CloseChatContainer = styled.button`
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

export const Chat = styled.div`
  height: calc(100vh - 60px);
`;
export const ChatInputContainer = styled.div`
  bottom: 0;

  input {
    position: fixed;
    bottom: 0;
    left: 0;
    width: calc(100% - 41px);
    margin: 0;
    padding: 0;
  }
  button {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 37px;
    margin: 0;
    padding: 0;
  }
`;

export const MessageContainer = styled.div`
  /* margin-bottom: 6%; */
  left: 0;
  padding: 0;
`;

export const MessageColor = styled.div`
  opacity: 0.5;
  /* max-width: 40%; */
  margin-left: 10px;

  div {
    padding: 5px;
    background-color: lightgreen;
    border-radius: 15px;
  }
`;
export const SelfMessageColor = styled.div`
  right: 0;
  opacity: 0.5;
  /* width: 40%; */
  margin-right: 0;
  padding: 10px;
  div {
    padding: 5px;
    background-color: red;
    border-radius: 15px;
  }
`;

export const TrashS = styled.div`
  right: 0;
  margin-right: 10px;
`;
