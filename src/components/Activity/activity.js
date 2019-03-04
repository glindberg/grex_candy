import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import ActivityContent from "../Activity/activityContent";
import { Act } from "./styles";
import { Time } from "./activityContent";

import LocationPage from "../Map/location";

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
    console.log("close activity");
  };
  handleActivityClick = activity => {
    this.setState({ activity });
    console.log("open activity");
    console.log(this.state);
  };

  render() {
    const { activities, loading, activity } = this.state;
    return (
      <div>
        <LocationPage
          activity={this.state.activity}
          handleActivityClick={this.handleActivityClick}
          content={this.Activitycontent}
        />

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
      <br />
      <Time createdAt={activity.createdAt} />
    </span>
  </Act>
);

export default Activities;

export { ActivityItem, ActivityList, ActivityContent };
