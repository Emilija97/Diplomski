import React, { ChangeEvent, createRef, useEffect, useState } from 'react';
import "../styles/user-card.scss";
import { MarkedImage } from '../../assets';
import ReportForm from './ReportForm';
import { selectReport } from '../store/selectors';
import { Report } from '../store/report-state';
import { fromEvent, interval, Subject } from 'rxjs';
import Observable from 'rxjs/Observable';
import { debounce, debounceTime, distinctUntilChanged, flatMap, map, mergeAll, throttleTime } from 'rxjs/operators';
import { useDispatch } from 'react-redux';
import { addReport, updateReport } from "../store/actions";
import TextField from '@material-ui/core/TextField';
import { normMap } from '../store/month-name';

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
    onPress?: HammerListener;
    onClick?: HammerListener;
}

function UserCard(props: UserCardProps) {
    const dispatch = useDispatch();
    const [hours, setHours] = useState(props.report === undefined ? "" : props.report.hours as string);
    const [typingTimeout, setTypingTimeout] = useState(0);

    useEffect(() => {
        if (props.report === undefined) {
            setHours("");
        } else {
            setHours(props.report.hours as string);
        }
    }, [props.report, props.month]);

    const onAcceptHandle = (value: string) => {
        const report: Report = {
            id: props.report === undefined ? "" : props.report.id,
            personId: props.personId,
            year: props.year,
            month: props.month,
            norm: normMap.get(props.month) as number,
            hours: (value as unknown as number)
        }

        props.report === undefined ? dispatch(addReport(report)) : dispatch(updateReport(report));
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        if (typingTimeout) clearTimeout(typingTimeout);
        setHours(event.target.value);
        setTypingTimeout(setTimeout(() => onAcceptHandle(event.target.value), 1000) as unknown as number)
    }

    return (
        <div
            className={"user-card " + props.className + (props.selected ? " user-card--selected" : "")}>
            <div className="user-card__image-container">
                <img className="user-card__image" alt="" src={`http://localhost:5000/uploads/${props.image}`} />
                <img className="user-card__overlay-image" hidden={!props.selected} alt="" src={MarkedImage} />
            </div>
            <div className="user-card__info">
                <div className="user-card__data">
                    <div className="user-card__name">{props.fullName}</div>
                    <div className="user-card__position">{props.position}</div>
                </div>
                <input className="user-card__hours" type="number" value={hours} onChange={onChange} />
            </div>
        </div>
    );
}

export default UserCard;