import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import ActivityContent, {
  Time,
  ActivityChar
} from "../Activity/activityContent";
import { Act, ActName, Created, ActInfo } from "./styles";
import { ArrowUp, ArrowDown } from "../Styles/icons";
import LocationPage from "../Map/location";
import MessagesTwo from "../Chat";

class ActivitesBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: null,
      loading: false,
      activities: [],
      showMap: true,
      hideActivity: false,
      showChat: false
    };
  }
  componentDidMount() {
    this.setState({
      loading: true
    });
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
  hideActivityToggle = () => {
    this.setState(prevState => ({ hideActivity: !prevState.hideActivity }));
  };
  displayMap() {
    this.setState({ showMap: false });
  }

  hideMap() {
    this.setState({ showMap: true });
    console.log("hej");
  }
  displayChat = () => {
    this.hideMap();
    this.setState({ showChat: true });
  };
  hideChat = () => {
    this.setState({ showChat: false });
  };

  removeActivity = () => {
    const a = this.state.activity;
    const newActivities = this.state.activities.filter(activity => {
      return activity !== a;
    });
    this.setState({
      activities: [...newActivities],
      activity: null
    });
    this.props.firebase.activity(this.state.activity.uid).remove();
  };
  render() {
    const {
      activities,
      loading,
      activity,
      showMap,
      hideActivity,
      showChat
    } = this.state;
    return (
      <div>
        {showMap && (
          <div>
            <LocationPage
              activities={activities}
              handleActivityClick={this.handleActivityClick}
            />
            <ArrowUp onClick={() => this.displayMap()} />
          </div>
        )}
        {!showMap && (
          <div>
            <span>Display map</span>
            <ArrowDown onClick={() => this.hideMap()} />
          </div>
        )}
        {loading && <div>Loading activities...</div>}
        {activity ? (
          <ActivityContent
            map={this.showMap}
            activity={activity}
            hideActivity={this.hideActivity}
            removeActivity={this.removeActivity}
            hideActivityToggle={this.hideActivityToggle}
          />
        ) : activities && !hideActivity ? (
          <ActivityList
            handleActivityClick={this.handleActivityClick}
            activities={activities}
          />
        ) : (
          <div>There are no activities ...</div>
        )}
        {showChat && (
          <div>
            <MessagesTwo activity={activity} users={this.state.users} />
            <button
              onClick={() => {
                this.hideChat();
              }}
            >
              Hide Chat
            </button>
          </div>
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
    <ActInfo>
      {activity.activity} {activity.dateforact}, {activity.actlengthstart} -{" "}
      {activity.actlengthend}
    </ActInfo>
    <Created>
      <Time createdAt={activity.createdAt} />
    </Created>
  </Act>
);
const Activities = withFirebase(ActivitesBase);
export default Activities;
export { ActivityItem, ActivityList, ActivityContent };
