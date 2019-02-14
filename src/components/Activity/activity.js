import React, { Component } from "react";
import { withFirebase } from "../Firebase";

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

export default Activities;
