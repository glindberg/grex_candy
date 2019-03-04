import styled from "styled-components";

export const Nav = styled.section`
  height: 60px;
  background: #093028; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #237a57,
    #093028
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #237a57,
    #093028
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  display: flex;
  /* justify-content: space-around; */

  h1 {
    a {
      text-decoration: none;
      color: white;
    }
    color: white;
    margin: auto;
  }
`;

export const NonAuth = styled.ul`
  list-style: none;
  display: flex;
  margin-top: 0;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 0;

  button {
    margin: 1em;
    font-size: 0.8em;
    padding: 0.65em;
    border-radius: 8%;
    width: 6em;
    margin-bottom: 2em;

    a {
      text-decoration: none;
      color: rgb(20, 61, 32);
    }
  }
`;
export const Ham = styled.section`
  /* Position and sizing of burger button */
  .bm-burger-button {
    position: absolute;
    width: 36px;
    height: 30px;
    left: 15px;
    top: 15px;
  }

  /* Color/shape of burger icon bars */
  .bm-burger-bars {
    background: white;
    border-radius: 10px;
  }

  /* Color/shape of burger icon bars on hover*/
  .bm-burger-bars-hover {
    background: #a90000;
  }

  /* Position and sizing of clickable cross button */
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }

  /* Color/shape of close button cross */
  .bm-cross {
    background: #bdc3c7;
  }

  /*
Sidebar wrapper styles
Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
*/
  .bm-menu-wrap {
    position: fixed;
    height: 100%;
  }

  /* General sidebar styles */
  .bm-menu {
    background: rgb(247, 245, 237);
    padding: 2.5em 1.5em 0;
    font-size: 1.15em;
    overflow-y: hidden !important;
  }

  /* Morph shape necessary with bubble or elastic */
  .bm-morph-shape {
    fill: #373a47;
  }

  /* Wrapper for item list */
  .bm-item-list {
    color: #b8b7ad;
    padding: 0.8em;
    text-align: center;
  }

  /* Individual item */
  .bm-item {
    display: inline-block;
    outline: none;
    padding: 0;
  }

  /* Styling of overlay */
  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }
  ul {
    list-style: none;
  }
  li {
    padding: 5px;
  }
  a {
    color: black;
    text-decoration: none;
  }
`;

export const CreateAct = styled.div`
  width: 85px;
  display: flex;
  position: absolute;
  right: 0;
  margin-top: 10px;
  a {
    color: white;
    text-decoration: none;
  }
  a:hover {
    color: #a90000;
  }
`;
export const Ini = styled.div`
  font-size: 2em;
`;
