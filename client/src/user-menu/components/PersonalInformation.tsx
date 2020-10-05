import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getPerson } from '../../employee/store/actions';
import { NiHeader } from '../../shared';
import { RootState } from '../../store/store';
import "../styles/personal-info.scss";

function PersonalInformation() {

    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    const person = useSelector((state: RootState) => state.person);

    useEffect(() => {
        if (id !== undefined)
            dispatch(getPerson(id as string));
    }, [dispatch, id]);

    return (
        <div className="personal-info">
            <NiHeader backArrow={true} logo={false} title="Personal Information" menu={true} />

            <div className="personal-info__item">
                <label className="personal-info__item--title">Birth date:</label>
                <label className="personal-info__item--value">{person.birthDate}</label>
                <hr className="personal-info__item--underline"></hr>
            </div>
            <div className="personal-info__item">
                <label className="personal-info__item--title">Home address:</label>
                <label className="personal-info__item--value">{person.homeAddress}</label>
                <hr className="personal-info__item--underline"></hr>
            </div>
            <div className="personal-info__item">
                <label className="personal-info__item--title">Enrolment Date:</label>
                <label className="personal-info__item--value">{person.enrolmentDate}</label>
                <hr className="personal-info__item--underline"></hr>
            </div>
            <div className="personal-info__item">
                <label className="personal-info__item--title">Email:</label>
                <label className="personal-info__item--value">
                    {person.email}
                </label>
                <hr className="personal-info__item--underline"></hr>
            </div>
            <div className="personal-info__item">
                <label className="personal-info__item--title">Phone:</label>
                <label className="personal-info__item--value">{person.phone}</label>
                <hr className="personal-info__item--underline"></hr>
            </div>
        </div>
    )
}

export default PersonalInformation;