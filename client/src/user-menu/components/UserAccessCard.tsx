import React, { createRef, useEffect, useState } from 'react';
import { MarkedImage } from '../../assets';
import UserAccessForm from './UserAccessForm';
import "../styles/access-card.scss";

export interface UserAccessCardProps {
    image: string,
    personId: string,
    fullName: string,
    position: string,
    className?: string,
    selected?: boolean,
    type: number
}

function UserAccessCard(props: UserAccessCardProps) {
    const cardRef = createRef<HTMLDivElement>();
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <div ref={cardRef}
            className={"access-card " + props.className}>
            <div className="access-card__image-container">
                <img className="access-card__image" alt="" src={`http://localhost:5000/uploads/${props.image}`} />
                <img className="access-card__overlay-image" hidden={!props.selected} alt="" src={MarkedImage} />
            </div>
            <UserAccessForm fullName={props.fullName}
                 personId={props.personId} type={props.type}
                open={isFormOpen}
                onClose={() => setIsFormOpen(false)} />
            <div className="access-card__info" onClick={() => setIsFormOpen(true)}>
                <div className="access-card__data">
                    <div className="access-card__name">{props.fullName}</div>
                    <div className="access-card__position">{props.position}</div>
                </div>
            </div>
        </div>
    );
}

export default UserAccessCard;