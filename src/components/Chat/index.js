import React, { Component } from "react";
import { compose } from "recompose";
import { AuthUserContext, withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import ShowUser from "../Profile/showOtherProfile";
import {
  Wrapper,
  ChatInput,
  SendButton,
  ChatInputContainer,
  MessageContainer,
  Chat
} from "./styles";
import { Trash, ArrowUpChat, ChatSend } from "../Styles/icons";

class MessagesBaseTwo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      loading: false,
      messages: null,
      limit: 5,
      showProfile: false,
      showChat: false
    };
  }

  componentDidMount() {
    this.onListenForMessages();
  }

  onListenForMessages = () => {
    this.setState({ loading: true });

    this.props.firebase
      .activity(this.props.activity.uid)
      .child("chat")
      .on("value", snapshot => {
        const messageObject = snapshot.val();

        if (messageObject) {
          const messageList = Object.keys(messageObject).map(key => ({
            ...messageObject[key],
            uid: key
          }));
          // console.log("Messages found");
          this.setState({
            messages: messageList,
            loading: false
          });
        } else {
          this.setState({ messages: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  onChangeText = event => {
    this.setState({ text: event.target.value });
  };

  onCreateMessage = (event, authUser) => {
    this.props.firebase
      .activity(this.props.activity.uid)
      .child("chat")
      .push({
        text: this.state.text,
        userId: authUser.uid,
        createdAt: this.props.firebase.serverValue.TIMESTAMP
      });

    this.setState({ text: "" });

    event.preventDefault();
  };

  onEditMessage = (message, text) => {
    this.props.firebase.message(message.uid).set({
      ...message,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP
    });
  };

  onRemoveMessage = uid => {
    this.props.firebase
      .activity(this.props.activity.uid)
      .child("chat")
      .child(uid)
      .remove();
  };

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForMessages
    );
    console.log("onNextPage called");
  };
  displayProfile = userId => {
    this.setState({ showProfile: userId });
  };
  hideProfile = () => {
    this.setState({ showProfile: false });
  };
  hideChat = () => {
    this.setState({ showChat: false });
    console.log("Hide Chat");
  };

  render() {
    const { users, activity } = this.props;
    const { text, messages, loading, showProfile } = this.state;
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {!loading && messages && (
              <ArrowUpChat type="button" onClick={this.onNextPage} />
            )}

            <button type="button" onClick={this.onNextPage}>
              More
            </button>
            <Chat>
              {loading && <div>Loading ...</div>}

              {showProfile && (
                <Wrapper onClick={this.hideProfile}>
                  <div>
                    <ShowUser userId={showProfile} />
                  </div>
                </Wrapper>
              )}
              {/* <CloseChatContainer>
              <CloseX
                onClick={() => {
                  this.hideChat();
                }}
              />
            </CloseChatContainer> */}
              {messages && (
                <MessageContainer>
                  <MessageList
                    messages={messages.map(message => ({
                      ...message,
                      user: users
                        ? users[message.userId]
                        : { userId: message.userId }
                    }))}
                    onEditMessage={this.onEditMessage}
                    onRemoveMessage={this.onRemoveMessage}
                    displayProfile={this.displayProfile}
                    activity={activity}
                  />
                </MessageContainer>
              )}

              {!messages && <div>There are no messages ...</div>}
              <ChatInputContainer>
                <form onSubmit={event => this.onCreateMessage(event, authUser)}>
                  {/* <ChatInput> */}
                  <input
                    type="text"
                    value={text}
                    onChange={this.onChangeText}
                  />
                  {/* </ChatInput> */}
                  {/* <SendButton> */}
                  <ChatSend type="submit" />
                  {/* <button type="submit">Send</button> */}
                  {/* </SendButton> */}
                </form>
              </ChatInputContainer>
            </Chat>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const MessageList = ({
  messages,
  onEditMessage,
  onRemoveMessage,
  displayProfile,
  activity
}) => (
  <ul>
    {messages.map(message => (
      <MessageItem
        key={message.uid}
        message={message}
        onEditMessage={onEditMessage}
        onRemoveMessage={onRemoveMessage}
        displayProfile={displayProfile}
        activity={activity}
      />
    ))}
  </ul>
);

class MessageItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.message.text
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.message.text
    }));
  };

  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditMessage(this.props.message, this.state.editText);

    this.setState({ editMode: false });
  };

  render() {
    const { message, onRemoveMessage, displayProfile } = this.props;
    const { editMode, editText } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {editMode ? (
              <input
                type="text"
                value={editText}
                onChange={this.onChangeEditText}
              />
            ) : (
              <span>
                <strong onClick={() => displayProfile(message.userId)}>
                  {message.user.username || message.user.userId}
                </strong>
                {message.text} {message.editedAt && <span>Edited</span>}
              </span>
            )}

            {!editMode &&
              (message.userId === authUser.uid ? (
                <Trash onClick={() => onRemoveMessage(message.uid)} />
              ) : null)}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const MessagesTwo = withFirebase(MessagesBaseTwo);
const condition = authUser => !!authUser;

export default compose(withAuthorization(condition))(MessagesTwo);
