import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WhitePlusImage } from "../../assets";
import "../../shared/styles/ni-button.scss";
import "../../shared/styles/ni-text-field.scss";
import { RootState } from "../../store/store";
import ActivityForm from "../activities/components/ActivityForm";
import { Activity, ActivityName, clear, loadActivities, selectActivities, selectActivityById } from "../activities/store";
import { changeDialogState } from "../store/actions";
import "./history-page.scss";
import ShowBonus from "./ShowBonus";
import ShowHireAndSalary from "./ShowHireAndSalary";
import ShowInternship from "./ShowInternship";
import ShowSimiliarComponents from "./ShowSimiliarComponents";
import ShowTest from "./ShowTest";



function HistoryPage() {
  const dispatch = useDispatch();

  const person = useSelector((state: RootState) => state.person);
  const activities: Activity[] = useSelector((state: RootState) => selectActivities(state));
  const activ = {} as Activity;
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    dispatch(loadActivities(person.id));
  }, [dispatch, person.id]);

  useEffect(() => {
    return function cleanup() {
      dispatch(clear());
    }
  }, [dispatch]);

  const handleClickOpen = () => {
    dispatch(changeDialogState());
  };

  const showDate = (date: any) => {
    const activityDate = new Date(date);
    let formattedDate = "";
    let formattedMonth = "";
    if (date) {
      formattedDate = activityDate.getDate().toString();
      formattedMonth = monthNames[activityDate.getMonth()];
    }
    return (
      <div className="history-page__day">
        <div className="history-page__day--date">{formattedDate}</div>
        <div className="history-page__day--date">{formattedMonth}</div>
      </div>
    )
  }

  return (
    <div className="history-page">
      <div className="history-page__content">
        <div className="history-page__side-line"><span className="history-page__dot"></span></div>

        <div className="history-page__action">
          <button
            className="ni-button ni-button__circle ni-button__circle--large ni-button__circle--primary"
            onClick={() => setIsFormOpen(true)}
          >
            <img alt="" src={WhitePlusImage}></img>
          </button>
          <ActivityForm
            fullName={person.fullName}
            open={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            activity={{} as Activity}
          />
        </div>
        {activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((activity, index) => {
          return (
            <div className="history-page__activity" key={index}>
              {showDate(activity.date)}
              {activity.name === ActivityName.INTERNSHIP ? <ShowInternship activity={selectActivityById(activities, activity.id)} fullName={person.fullName} />
                : activity.name === ActivityName.SALARY ? <ShowHireAndSalary activity={selectActivityById(activities, activity.id)} fullName={person.fullName} />
                  : activity.name === ActivityName.TEST ? <ShowTest activity={selectActivityById(activities, activity.id)} fullName={person.fullName} />
                    : activity.name === ActivityName.BONUS ? <ShowBonus activity={selectActivityById(activities, activity.id)} fullName={person.fullName} />
                      : activity.name === ActivityName.HIRE ? <ShowHireAndSalary activity={selectActivityById(activities, activity.id)} fullName={person.fullName} />
                        : <ShowSimiliarComponents activity={selectActivityById(activities, activity.id)} fullName={person.fullName} />
              }
            </div>
          );
        })}

        <div className="history-page__bottom-container"></div>

      </div>
    </div>
  );
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default HistoryPage;
