import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

import { compose } from "recompose";

import { AuthUserContext, withAuthorization } from "../Session";

import { withFirebase } from "../Firebase";

const ShowActivities = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <p>ShowActivities</p>
        <Activities />
      </div>
    )}
  </AuthUserContext.Consumer>
);

// TESTAR ATT VISA ACTIVITIES
class ActivitiesBase extends Component {
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
    const { users } = this.props;
    const { activities, loading } = this.state;
    return (
      <div>
        {loading && <div>Loading activities...</div>}

        {activities && (
          <ActivityList
            activities={activities.map(activity => ({
              ...activity,

              user: users
                ? users[activity.members]
                : { userId: activity.userId }
            }))}
          />
        )}

        {!activities && <div>There are no activities ...</div>}
      </div>
    );
  }
}

const ActivityList = ({ activities }) => {
  return (
    <ul>
      {activities.map(activity => (
        <ActivityItem key={activity.uid} activity={activity} />
      ))}{" "}
    </ul>
  );
};

const ActivityItem = ({ activity }) => (
  <AuthUserContext.Consumer>
    {authUser => (
      <li>
        <Link to={ROUTES.ACTIVITY}>
          <strong>{activity.members}</strong> <br /> {activity.activity} -{" "}
          {activity.otheractivity}
          <br />
          {activity.actlengthstart} - {activity.actlengthend}
        </Link>
      </li>
    )}
  </AuthUserContext.Consumer>
);

// END

// TEST 2

// class ActivitiesBase extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       activity: "",
//       loading: false,
//       activities: []
//     };
//   }

//   componentDidMount() {
//     this.onListenForActivities();
//   }

//   onListenForActivities = () => {
//     this.setState({ loading: true });

//     this.props.firebase

//       .activities()

//       .orderByChild("createdAt")

//       .limitToLast(this.state.limit)

//       .on("value", snapshot => {
//         const activityObject = snapshot.val();

//         if (activityObject) {
//           const activityList = Object.keys(activityObject).map(key => ({
//             ...activityObject[key],

//             uid: key
//           }));

//           this.setState({
//             activities: activityList,

//             loading: false
//           });
//         } else {
//           this.setState({ activities: null, loading: false });
//         }
//       });
//   };

//   componentWillUnmount() {
//     this.props.firebase.activities().off();
//   }

//   onChangeText = event => {
//     this.setState({ text: event.target.value });
//   };

//   // FLYTTA??
//   onCreateActivity = (event, authUser) => {
//     this.props.firebase.activities().push({
//       text: this.state.text,

//       userId: authUser.uid,

//       createdAt: this.props.firebase.serverValue.TIMESTAMP
//     });

//     this.setState({ text: "" });

//     event.preventDefault();
//   };

//   // onEditMessage = (message, text) => {
//   //   this.props.firebase.message(message.uid).set({
//   //     ...message,

//   //     text,

//   //     editedAt: this.props.firebase.serverValue.TIMESTAMP
//   //   });
//   // };

//   // onRemoveMessage = uid => {
//   //   this.props.firebase.message(uid).remove();
//   // };

//   // onNextPage = () => {
//   //   this.setState(
//   //     state => ({ limit: state.limit + 5 }),

//   //     this.onListenForMessages
//   //   );
//   // };

//   render() {
//     const { users } = this.props;

//     const { activities, loading } = this.state;

//     return (
//       <AuthUserContext.Consumer>
//         {authUser => (
//           <div>
//             {!loading && activities && (
//               <button type="button" onClick={this.onNextPage}>
//                 More
//               </button>
//             )}

//             {loading && <div>Loading ...</div>}

//             {activities && (
//               <ActivityList
//                 activities={activities.map(activity => ({
//                   ...activity,

//                   user: users
//                     ? users[activity.userId]
//                     : { userId: activity.userId }
//                 }))}
//                 // onEditMessage={this.onEditMessage}
//                 // onRemoveMessage={this.onRemoveMessage}
//               />
//             )}

//             {!activities && <div>There are no activities ...</div>}

//             {/*
//             <form onSubmit={event => this.onCreateMessage(event, authUser)}>
//               <input type="text" value={text} onChange={this.onChangeText} />

//               <button type="submit">Send</button>
//             </form>
//             */}
//           </div>
//         )}
//       </AuthUserContext.Consumer>
//     );
//   }
// }

// const ActivityList = ({
//   activities,

//   onEditMessage,

//   onRemoveMessage
// }) => (
//   <ul>
//     {activities.map(activity => (
//       <ActivityItem
//         key={activity.uid}
//         message={activity}
//         /*
//         onEditMessage={onEditMessage}
//         onRemoveMessage={onRemoveMessage}
//         */
//       />
//     ))}
//   </ul>
// );

// class ActivityItem extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       editMode: false,

//       editText: this.props.activity.text
//     };
//   }

//   onToggleEditMode = () => {
//     this.setState(state => ({
//       editMode: !state.editMode,

//       editText: this.props.activity.text
//     }));
//   };

//   onChangeEditText = event => {
//     this.setState({ editText: event.target.value });
//   };

//   onSaveEditText = () => {
//     this.props.onEditActivity(this.props.activity, this.state.editText);

//     this.setState({ editMode: false });
//   };

//   render() {
//     const { activity, onRemoveActivity } = this.props;

//     const { editMode, editText } = this.state;

//     return (
//       <li>
//         {editMode ? (
//           <input
//             type="text"
//             value={editText}
//             onChange={this.onChangeEditText}
//           />
//         ) : (
//           <span>
//             <strong>{activity.user.username || activity.user.userId}</strong>{" "}
//             {activity.text} {activity.editedAt && <span>(Edited)</span>}
//           </span>
//         )}

//         {editMode ? (
//           <span>
//             <button onClick={this.onSaveEditText}>Save</button>

//             <button onClick={this.onToggleEditMode}>Reset</button>
//           </span>
//         ) : (
//           <button onClick={this.onToggleEditMode}>Edit</button>
//         )}

//         {!editMode && (
//           <button type="button" onClick={() => onRemoveActivity(activity.uid)}>
//             Delete
//           </button>
//         )}
//       </li>
//     );
//   }
// }

const Activities = withFirebase(ActivitiesBase);

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition)
)(Activities);

export { ShowActivities, ActivitiesBase, Activities, ActivityList };
