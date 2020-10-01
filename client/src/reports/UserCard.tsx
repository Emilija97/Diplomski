import React, { createRef, useEffect, useState } from 'react';
import "./user-card.scss";
import { MarkedImage } from '../assets';
import ReportForm from './ReportForm';
import { monthsMap } from './store/month-name';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { selectReport } from './store/selectors';
import { Report } from './store/report-state';

export interface UserCardProps {
    image: string,
    month: string,
    year: number,
    personId: string,
    fullName: string,
    position: string,
    className?: string,
    selected?: boolean,
    report: any;
}

function UserCard(props: UserCardProps) {
    const cardRef = createRef<HTMLDivElement>();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const dispatch = useDispatch();
    // const report = useSelector((state: RootState) => state.reports);
    // const report = useSelector((state: RootState) => selectReport(state, props.personId as string));



    // useEffect(() => {
    //     return function cleanup() {
    //         dispatch(clearReports());
    //     }
    // }, [dispatch]);
    // useEffect(() => {
    //     const hammer = new Hammer(cardRef.current as HTMLDivElement);
    //     hammer.set({ domEvents: true });
    //     if (props.onPress) hammer.on("press", props.onPress);
    //     if (props.onClick) hammer.on("tap", (event) => {
    //         event.srcEvent.stopImmediatePropagation();
    //         props.onClick && props.onClick(event);
    //     });
    //     return () => {
    //         hammer.off("press");
    //         hammer.off("tap");
    //     }
    // }, [cardRef, props.onPress, props.onClick]);

    return (
        <div ref={cardRef}
            className={"user-card " + props.className}>
            <div className="user-card__image-container">
                <img className="user-card__image" alt="" src={`http://localhost:5000/uploads/${props.image}`} />
                <img className="user-card__overlay-image" hidden={!props.selected} alt="" src={MarkedImage} />
            </div>
            <ReportForm fullName={props.fullName} report={props.report}
                year={props.year} month={props.month} personId={props.personId}
                open={isFormOpen}
                onClose={() => setIsFormOpen(false)} />
            <div className="user-card__info" onClick={() => setIsFormOpen(true)}>
                <div className="user-card__data">
                    <div className="user-card__name">{props.fullName}</div>
                    <div className="user-card__position">{props.position}</div>
                </div>
                <div className="user-card__hours">{props.report ? props.report.hours : ""}</div>
            </div>
        </div>
    );
}

export default UserCard;