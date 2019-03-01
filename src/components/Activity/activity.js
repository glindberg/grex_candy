import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import ActivityContent, {
  Time,
  ActivityChar
} from "../Activity/activityContent";
import { AuthUserContext, withAuthorization } from "../Session";
import { Act, ActName, Created } from "./styles";

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
    <ActName>
      <ActivityChar activityname={activity.activityname} />
    </ActName>
    <p>
      {activity.activity} {activity.dateforact}, {activity.actlengthstart} -{" "}
      {activity.actlengthend}
    </p>
    <Created>
      <Time createdAt={activity.createdAt} />
    </Created>
  </Act>
);

const Activities = withFirebase(ActivitesBase);

export default Activities;
