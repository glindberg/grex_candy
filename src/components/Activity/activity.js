import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import ActivityContent from "../Activity/activityContent";
import { Act } from "./styles";

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
        this.setState({
          activities: null,
          loading: false
        });
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

  removeActivity = () => {
    console.log(this.state.activity);
    const a = this.state.activity;
    const newActivities = this.state.activities.filter(activity => {
      return activity !== a;
    });
    this.setState({
      activities: [...newActivities],
      activity: null
    });
    /* this.props.firebase.activity(this.state.activity.uid).remove(); */
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
            removeActivity={this.removeActivity}
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
  <div>
    {activities.map(activity => (
      <ActivityItem
        handleActivityClick={handleActivityClick}
        key={activity.uid}
        activity={activity}
      />
    ))}
  </div>
);

const ActivityItem = ({ activity, handleActivityClick }) => (
  <Act onClick={() => handleActivityClick(activity)}>
    <span>
      <strong>{activity.activity}</strong>
    </span>
  </Act>
);

export default Activities;

export { ActivityItem };
