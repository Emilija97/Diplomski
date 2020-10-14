import React, { ChangeEvent, createRef, useEffect, useState } from 'react';
import "../styles/user-card.scss";
import { MarkedImage } from '../../assets';
import ReportForm from './ReportForm';
import { selectReport } from '../store/selectors';
import { Report } from '../store/report-state';
import { fromEvent, interval } from 'rxjs';
import { debounce, map } from 'rxjs/operators';
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
    report: Report;
    onPress?: HammerListener;
    onClick?: HammerListener;
}

function UserCard(props: UserCardProps) {
    const dispatch = useDispatch();
    const [hours, setHours] = useState("");

    useEffect(() => {
        if (props.report !== undefined)
            setHours(props.report.hours as unknown as string);
    }, [props.report]);

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        setHours(event.target.value);
        fromEvent(event.target, 'input')
            .pipe(
                debounce(() => interval(2000)),
                map(() => event.target.value as string)
            ).subscribe(value => {
                const report: Report = {
                    id: props.report === undefined ? "" : props.report.id,
                    personId: props.personId,
                    year: props.year,
                    month: props.month,
                    norm: normMap.get(props.month) as number,
                    hours: (value as unknown as number)
                }

                props.report === undefined ? dispatch(addReport(report)) : dispatch(updateReport(report));

            })
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
                <input className="user-card__hours" type="number" value={hours} onChange={e => handleInputChange(e)} />
            </div>
        </div>
    );
}

export default UserCard;