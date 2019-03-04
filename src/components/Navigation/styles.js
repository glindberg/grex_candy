import styled from "styled-components";

export const Nav = styled.section`
  height: 60px;
  background: linear-gradient(rgb(207, 226, 199), rgb(118, 135, 110));
  display: flex;
  /* justify-content: space-around; */

  h1 {
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
  /* color: white; */
  margin-right: 0.4em;
  position: absolute;
  right: 0;
  top: 10px;
  font-size: 30px;
  a {
    color: rgb(247, 245, 237);
  }
  a:hover {
    color: #a90000;
  }
`;
