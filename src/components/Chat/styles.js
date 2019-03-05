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
  /* background: rgba(128, 128, 128, 0.452); */
  margin-top: 0px;
`;

export const ArrowUpChat = styled.button`
  color: black;
`;

export const CloseChatContainer = styled.button`
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
export const Chat = styled.div`
  height: fixed calc(100vh-20px);
`;
export const ChatInputContainer = styled.div`
  /* position: relative; */
  /* width: 100%; */

  input {
    width: 100%;
    margin: 0;
    padding: 0;
  }
  button {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 20px;
    margin: 0;
    padding: 0;
  }
`;

// export const ChatInput = styled.div`
//   position: absolute;
//   bottom: 0;
//   width: 100%;
// `;
// export const SendButton = styled.div`
//   position: absolute;
//   bottom: 0;
//   right: 0;
//   width: 20px;
// `;
export const MessageContainer = styled.div`
  /* border: 1px solid red; */
  margin-bottom: 30px;
`;
