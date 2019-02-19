import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import Chat from "../Chat/index";
import ActivityContent from "../Activity/activityContent";

class ActivitesBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: null,
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
  hideActivity = () => {
    this.setState({ activity: null });
  };
  handleActivityClick = activity => {
    this.setState({ activity });
  };

  render() {
    const { activities, loading, activity } = this.state;
    return (
      <div>
        {loading && <div>Loading activities...</div>}

        {activity ? (
          <ActivityContent
            activity={activity}
            hideActivity={this.hideActivity}
          />
        ) : activities ? (
          <ActivityList
            handleActivityClick={this.handleActivityClick}
            activities={activities}
          />
        ) : (
          <div>There are no activities ...</div>
        )}
      </div>
    );
  }
}

const Activities = withFirebase(ActivitesBase);

const ActivityList = ({ activities, handleActivityClick }) => (
  <ul>
    {activities.map(activity => (
      <ActivityItem
        handleActivityClick={handleActivityClick}
        key={activity.uid}
        activity={activity}
      />
    ))}
  </ul>
);

const ActivityItem = ({ activity, handleActivityClick }) => (
  <li>
    {/* <button onClick={this.props.activityOnClick()}>*/}
    <button>
      <span onClick={() => handleActivityClick(activity)}>
        <strong>{activity.activity}</strong>
      </span>
    </button>
    {/*<br /> {activity.activity} - {activity.otheractivity}*/}
    <br />
    {/*{activity.actlengthstart} - {activity.actlengthend}*/}
    {/* <Chat /> */}
  </li>
);

export default Activities;
