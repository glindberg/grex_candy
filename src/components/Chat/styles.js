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
export const H3 = styled.h3`
  color: white;
  background: rgb(83, 109, 122);
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 8px 0px;
  /* position: absolute; */
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
  display: flex;
  flex-flow: column wrap;
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
export const ChatSend = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 37px;
  margin: 0;
  padding: 0;
`;
export const MessageContainer = styled.div`
  margin-bottom: 6%;
  left: 0;
  padding: 0;
`;
export const DeleteMessageAlign = styled.div`
  font-size: 16px;
  position: absolute;
  right: 0;
`;
export const MessageFlex = styled.div`
  display: flex;
  flex-flow: column;
`;

export const MessageColor = styled.div`
  align-self: flex-start;
  justify-content: flex-start;
  opacity: 0.5;
  margin-left: 2%;
  margin-right: 10%;
  div {
    background: lightgray;
    color: black;
    border-radius: 15px;
    padding: 5px 10px;
  }
`;
export const SelfMessageColor = styled.div`
  align-self: flex-end;
  justify-content: flex-end;
  opacity: 0.5;
  margin-right: 10%;
  margin-left: 30%;
  div {
    background-color: lightgreen;
    color: black;
    border-radius: 15px;
    padding: 5px 10px;
  }
`;
