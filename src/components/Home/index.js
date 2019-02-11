import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

import { compose } from "recompose";

import { AuthUserContext, withAuthorization } from "../Session";

import { withFirebase } from "../Firebase";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null
    };
  }

  componentDidMount() {
    this.props.firebase.users().on("value", snapshot => {
      this.setState({
        users: snapshot.val()
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>

        <p>The Home Page is accessible by every signed in user.</p>

        <p>
          <button>
            <Link to={ROUTES.CREATE_ACTIVITY}>Create Activity</Link>
          </button>
        </p>

        <Link to={ROUTES.ACTIVITY}>
          <Activities />
        </Link>

        <Messages users={this.state.users} />
      </div>
    );
  }
}

class MessagesBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",

      loading: false,

      messages: [],

      limit: 5
    };
  }

  componentDidMount() {
    this.onListenForMessages();
  }

  onListenForMessages = () => {
    this.setState({ loading: true });

    this.props.firebase

      .messages()

      .orderByChild("createdAt")

      .limitToLast(this.state.limit)

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
  }

  onChangeText = event => {
    this.setState({ text: event.target.value });
  };

  onCreateMessage = (event, authUser) => {
    this.props.firebase.messages().push({
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
    this.props.firebase.message(uid).remove();
  };

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),

      this.onListenForMessages
    );
  };

  render() {
    const { users } = this.props;

    const { text, messages, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {!loading && messages && (
              <button type="button" onClick={this.onNextPage}>
                More
              </button>
            )}

            {loading && <div>Loading ...</div>}

            {messages && (
              <MessageList
                messages={messages.map(message => ({
                  ...message,

                  user: users
                    ? users[message.userId]
                    : { userId: message.userId }
                }))}
                onEditMessage={this.onEditMessage}
                onRemoveMessage={this.onRemoveMessage}
              />
            )}

            {!messages && <div>There are no messages ...</div>}

            <form onSubmit={event => this.onCreateMessage(event, authUser)}>
              <input type="text" value={text} onChange={this.onChangeText} />

              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const MessageList = ({
  messages,

  onEditMessage,

  onRemoveMessage
}) => (
  <ul>
    {messages.map(message => (
      <MessageItem
        key={message.uid}
        message={message}
        onEditMessage={onEditMessage}
        onRemoveMessage={onRemoveMessage}
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
    const { message, onRemoveMessage } = this.props;

    const { editMode, editText } = this.state;

    return (
      <li>
        {editMode ? (
          <input
            type="text"
            value={editText}
            onChange={this.onChangeEditText}
          />
        ) : (
          <span>
            <strong>{message.user.username || message.user.userId}</strong>{" "}
            {message.text} {message.editedAt && <span>(Edited)</span>}
          </span>
        )}

        {editMode ? (
          <span>
            <button onClick={this.onSaveEditText}>Save</button>

            <button onClick={this.onToggleEditMode}>Reset</button>
          </span>
        ) : (
          <button onClick={this.onToggleEditMode}>Edit</button>
        )}

        {!editMode && (
          <button type="button" onClick={() => onRemoveMessage(message.uid)}>
            Delete
          </button>
        )}
      </li>
    );
  }
}

const Messages = withFirebase(MessagesBase);

// TESTAR ATT VISA ACTIVITIES
class ActivitesBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: "",

      loading: false,
      activities: []
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.activities().on("value", snapshot => {
      const activityObject = snapshot.val();
      if (activityObject) {
        // convert messages list from snapshot
        const activityList = Object.keys(activityObject).map(key => ({
          ...activityObject[key],
          uid: key
        }));
        this.setState({
          activities: activityList,
          loading: false
        });
      } else {
        this.setState({ activities: null, loading: false });
      }
    });
  }
  componentWillUnmount() {
    this.props.firebase.activities().off();
  }
  render() {
    const { activities, loading } = this.state;
    return (
      <div>
        {loading && <div>Loading activities...</div>}
        {activities ? (
          <ActivityList activities={activities} />
        ) : (
          <div>There are no activities ...</div>
        )}
      </div>
    );
  }
}

const Activities = withFirebase(ActivitesBase);

const ActivityList = ({ activities }) => (
  <ul>
    {activities.map(activity => (
      <ActivityItem key={activity.uid} activity={activity} />
    ))}{" "}
  </ul>
);

const ActivityItem = ({ activity }) => (
  <li>
    <strong>{activity.userId}</strong> <br /> {activity.activity} -{" "}
    {activity.otheractivity}
    <br />
    {activity.actlengthstart} - {activity.actlengthend}
  </li>
);

// END

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition)
)(HomePage);

export { ActivitesBase, Activities, ActivityList };
