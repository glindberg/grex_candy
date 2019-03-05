import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import ActivityContent, {
  Time,
  ActivityChar
} from "../Activity/activityContent";
import {
  Act,
  ActName,
  Created,
  ActInfo,
  ButtonDivs,
  ArrowU,
  ArrowD,
  ChatClose
} from "./styles";
import { AuthUserContext } from "../Session";
import MessagesTwo from "../Chat";
import { ArrowUp, ArrowDown, ChatIcon, Trash, CloseX } from "../Styles/icons";
import LocationPage from "../Map/location";
import { Button } from "../Styles/button";

class ActivitesBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: null,
      loading: false,
      activities: [],
      hideActivity: false,
      users: null,
      showMap: true
    };
  }
  componentDidMount() {
    this.props.firebase.users().on("value", snapshot => {
      this.setState({
        loading: false,
        users: snapshot.val()
      });
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
    this.props.firebase.users().off();
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
  }
  displayChat = () => {
    this.setState({ showChat: true, showMap: false });
  };
  hideChat = () => {
    this.setState({ showChat: false, showMap: true });
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
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {showMap && (
              <div>
                <LocationPage
                  activities={activities}
                  handleActivityClick={this.handleActivityClick}
                />
                <ArrowU onClick={() => this.displayMap()}>
                  <ArrowUp />
                </ArrowU>
              </div>
            )}
            {!showMap && (
              <div>
                {!showChat && (
                  <ArrowD onClick={() => this.hideMap()}>
                    <ArrowDown />
                    <span>Show Map</span>
                  </ArrowD>
                )}
              </div>
            )}
            {loading && <div>Loading activities...</div>}
            {activity ? (
              <div>
                <div>
                  {!showChat && (
                    <div>
                      <ActivityContent
                        activity={activity}
                        hideActivity={this.hideActivity}
                        removeActivity={this.removeActivity}
                        hideActivityToggle={this.hideActivityToggle}
                      />
                      <ButtonDivs>
                        <Button
                          onClick={() => {
                            this.displayChat();
                          }}
                        >
                          <ChatIcon />
                          <span> | </span>Chat
                        </Button>

                        {activity.userId === authUser.uid ? (
                          <Button onClick={() => this.removeActivity()}>
                            <Trash />
                            <span> | </span>Delete
                          </Button>
                        ) : null}
                      </ButtonDivs>
                    </div>
                  )}
                </div>

                {showChat && (
                  <div>
                    <ChatClose>
                      <CloseX
                        onClick={() => {
                          this.hideChat();
                        }}
                      />
                    </ChatClose>
                    <MessagesTwo activity={activity} users={this.state.users} />
                  </div>
                )}
              </div>
            ) : activities && !hideActivity ? (
              <ActivityList
                handleActivityClick={this.handleActivityClick}
                activities={activities}
              />
            ) : (
              <div>There are no activities ...</div>
            )}
          </div>
        )}
      </AuthUserContext.Consumer>
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
