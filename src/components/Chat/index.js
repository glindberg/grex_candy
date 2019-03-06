import React, { Component } from "react";
import { compose } from "recompose";
import { AuthUserContext, withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import ShowUser from "../Profile/showOtherProfile";
import {
  Wrapper,
  ChatInputContainer,
  MessageContainer,
  Chat,
  MessageColor,
  SelfMessageColor,
  MessageFlex,
  H3,
  DeleteMessageAlign
} from "./styles";
import { TrashChat } from "../Styles/icons";
class MessagesBaseTwo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      loading: false,
      messages: null,
      limit: 5,
      showProfile: false
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
    this.props.firebase.activity().off();
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
            <H3>{activity.activityname}</H3>

            {loading && <div>Loading ...</div>}

            {showProfile && (
              <Wrapper onClick={this.hideProfile}>
                <div>
                  <ShowUser userId={showProfile} />
                </div>
              </Wrapper>
            )}
            <Chat>
              {messages && (
                <MessageContainer>
                  <MessageList
                    messages={messages.map(message => ({
                      ...message,
                      user: users
                        ? users[message.userId]
                        : { userId: message.userId }
                    }))}
                    onRemoveMessage={this.onRemoveMessage}
                    displayProfile={this.displayProfile}
                    activity={activity}
                  />
                </MessageContainer>
              )}

              {!messages && <div>There are no messages ...</div>}
              <ChatInputContainer>
                <form onSubmit={event => this.onCreateMessage(event, authUser)}>
                  <input
                    type="text"
                    value={text}
                    onChange={this.onChangeText}
                  />
                  <button type="submit">Send</button>
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
  onRemoveMessage,
  displayProfile,
  activity
}) => (
  <div>
    {messages.map(message => (
      <MessageItem
        key={message.uid}
        message={message}
        onRemoveMessage={onRemoveMessage}
        displayProfile={displayProfile}
        activity={activity}
      />
    ))}
  </div>
);

class MessageItem extends Component {
  render() {
    const { message, onRemoveMessage, displayProfile } = this.props;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <span>
              {message.userId === authUser.uid ? (
                <MessageFlex>
                  <SelfMessageColor>
                    <strong onClick={() => displayProfile(message.userId)}>
                      {message.user.username}
                    </strong>
                    <br />
                    <div>
                      {message.text}
                      <br />
                    </div>
                  </SelfMessageColor>
                  <DeleteMessageAlign>
                    {message.userId === authUser.uid ? (
                      <TrashChat onClick={() => onRemoveMessage(message.uid)} />
                    ) : null}
                  </DeleteMessageAlign>
                </MessageFlex>
              ) : (
                <MessageFlex>
                  <MessageColor>
                    <strong onClick={() => displayProfile(message.userId)}>
                      {message.user.username}
                    </strong>
                    <br />
                    <div>{message.text}</div>
                  </MessageColor>
                </MessageFlex>
              )}
            </span>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const MessagesTwo = withFirebase(MessagesBaseTwo);
const condition = authUser => !!authUser;

export default compose(withAuthorization(condition))(MessagesTwo);
