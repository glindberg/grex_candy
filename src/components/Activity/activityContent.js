import React, { Component } from "react";
import { withFirebase } from "firebase";
import { AuthUserContext } from "../Session";

const Activities = withFirebase(ActivitesBase);
const ActivityContent = () => (
  <AuthUserContext>
    <div>
      <ul>
        {activities.map(activity => (
          <ActivityItem key={activity.uid} activity={activity} />
        ))}
      </ul>
    </div>
  </AuthUserContext>
);
export default ActivityContent;
