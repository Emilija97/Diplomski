import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { ListItem, NiHeader } from "../shared";
import LeftArrow from "../assets/images/left-arrow.png";
import RightArrow from "../assets/images/right-arrow.png";
import ButtonToggle from "../shared/button-toggle/ButtonToggle";
import { monthsMap } from "./store/month-name";
import "../shared/styles/ni-button.scss";
import "./reports.scss";
import { RootState } from "../store/store";
import { addUsersInit, clear, getHiredUsers, incrementPage, selectUserByStatus, selectUsers, User } from "../people/store";
import UserCard from "./UserCard";
import { ActivityName } from "../employee/activities/store";
import { clearReports, getReports } from "./store/actions";
import { Report } from "./store/report-state";
import { selectReport, selectReports } from "./store/selectors";

function Reports() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [year, setYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState("january");

    const { page, selectedTab, limit } = useSelector((state: RootState) => state.people);

    const users: User[] = useSelector(
        (state: RootState) => selectUsers(state)
    );
    const reports: Report[] = useSelector((state: RootState) => selectReports(state));

    useEffect(() => {
        dispatch(getHiredUsers(year, monthsMap.get(selectedMonth) as string, ActivityName.HIRE));
        dispatch(getReports(year, monthsMap.get(selectedMonth) as string));
    }, [dispatch, page, year, selectedMonth]);

    useEffect(() => {
        return function cleanup() {
            dispatch(clearReports());
        }
    }, [dispatch]);

    const nextYear = () => {
        if (year < new Date().getFullYear()) {
            setYear(year + 1);
        }
    };

    const selectedMonthChange = (monthValue: string) => {
        setSelectedMonth(monthValue);
    }

    // const handleUserPress = (userId: string) => {

    //     selectedUsersIds.includes(userId) ?
    //         setSelectedUsersIds(selectedUsersIds.filter(id => id !== userId)) :
    //         setSelectedUsersIds([...selectedUsersIds, userId]);
    // };

    const handleSeeMoreClick = () => {
        dispatch(incrementPage());
    }
    // const handleCardClick = (id: string) => {
    //     setIsFormOpen(true);
    //     return (
    //         <ReportForm fullName={"Emilija"}
    //             open={isFormOpen}
    //             onClose={() => setIsFormOpen(false)} />
    //     )
    // }

    // const closeForm = () => {
    //     setIsFormOpen(false);
    // }
    return (
        <div className="reports">
            <NiHeader backArrow={true} logo={false} title="Reports" menu={true} />

            <div className="reports__chose-year">
                <button
                    className="ni-button ni-button__text ni-button__text--transparent"
                    onClick={() => {
                        setYear(year - 1);
                    }}
                >
                    <img alt="" src={LeftArrow}></img>
                </button>

                <label>{year}</label>

                <button
                    className="ni-button ni-button__text ni-button__text--transparent"
                    onClick={() => nextYear()}
                >
                    <img alt="" src={RightArrow}></img>
                </button>
            </div>

            <div className="reports__months">
                <ButtonToggle
                    buttonToggleMap={monthsMap}
                    initState={selectedMonth}
                    onSelectClick={selectedMonthChange}
                />
            </div>

            <p className="reports__title">Billable hours</p>

            <div className="reports__users">
                {users.length === 0 ?
                    (<div className="reports__no-users-message">There are no users in this category.</div>) :
                    users.map(user => {
                        return (
                            <UserCard
                                key={user.id}
                                personId={user.id}
                                month={monthsMap.get(selectedMonth) as string}
                                year={year}
                                className="reports__user"
                                image={user.imageSrc}
                                fullName={user.fullName}
                                position={user.position}
                                report={selectReport(reports, user.id)}
                            />
                        );
                    })}
            </div>
            <div className="reports__link">
                <div hidden={users.length < limit} onClick={handleSeeMoreClick}>See more</div>
            </div>
        </div>
    );
}

export default Reports;