import styled from "styled-components";
import { Telegram } from "styled-icons/boxicons-logos/Telegram";
import { Edit } from "styled-icons/boxicons-solid/Edit";
import { Key2 } from "styled-icons/icomoon/Key2";
import { UserDetail } from "styled-icons/boxicons-solid/UserDetail";
import { DirectionsRun } from "styled-icons/material/DirectionsRun";
import { KeyboardArrowUp } from "styled-icons/material/KeyboardArrowUp";
import { KeyboardArrowDown } from "styled-icons/material/KeyboardArrowDown";
import { Close } from "styled-icons/material/Close";
import { Plus } from "styled-icons/fa-solid/Plus";
import { Chat } from "styled-icons/material/Chat";
import { Trashcan } from "styled-icons/octicons/Trashcan";
import { LeftArrowCircle } from "styled-icons/boxicons-regular/LeftArrowCircle";
import { DoorOpen } from "styled-icons/fa-solid/DoorOpen";
import { User } from "styled-icons/fa-regular/User";

export const Tele = styled(Telegram)`
  height: 2em;
  width: 2em;
`;

export const Edi = styled(Edit)`
  height: 2em;
  width: 2em;
  padding: 5px;
`;

export const Key = styled(Key2)`
  height: 2em;
  width: 2em;
  padding: 5px;
`;

export const UserD = styled(UserDetail)`
  height: 2em;
  width: 2em;
`;

export const ArrowUp = styled(KeyboardArrowUp)`
  font-size: 40px;
  animation: shadow-pulse 1s 5;
  @keyframes shadow-pulse {
    0% {
    }
    100% {
      -moz-transform: translate(0px, -10px);
      -webkit-transform: translate(0px, -10px);
      -o-transform: translate(0px, -10px);
      -ms-transform: translate(0px, -10px);
      transform: translate(0px, -10px);
    }
  }
`;
export const ArrowDown = styled(KeyboardArrowDown)`
  height: 2em;
  color: white;
  background: rgb(83, 109, 122);
`;

export const Run = styled(DirectionsRun)`
  height: 1.5em;
  width: 2em;
  padding: 2px;
`;

export const CloseAct = styled(Close)`
  height: 1.5em;
  width: 2em;
  padding: 2px;
`;

export const NewActivity = styled(Plus)`
  height: 2.2em;
  margin-right: 5px;
`;

export const ChatIcon = styled(Chat)`
  height: 1.5em;
  width: 2em;
  padding: 2px;
`;

export const Trash = styled(Trashcan)`
  height: 1.5em;
  width: 2em;
  padding: 2px;
`;

export const Tie = styled(LeftArrowCircle)`
  height: 2em;
  width: 2em;
`;

export const ByeBye = styled(DoorOpen)`
  height: 1em;
  width: 1em;
`;
export const UserP = styled(User)`
  height: 1em;
  width: 1em;
  margin-left: 5px;
`;
