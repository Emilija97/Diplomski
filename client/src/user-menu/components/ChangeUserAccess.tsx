import TextField from "@material-ui/core/TextField";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserType } from "../../auth/store";
import { getPerson } from "../../employee/store/actions";
import { Person } from "../../employee/store/person-state";
import ButtonToggle from "../../shared/button-toggle/ButtonToggle";
import FormAction from "../../shared/form-action/FormAction";
import "../../shared/styles/ni-text-field.scss";
import { RootState } from "../../store/store";
import { updateUserType } from "../store";
import { accessMap } from "../store/access-map";
import "../styles/change-access.scss";

interface Props {
    onClose: () => void;
    personId: string;
    type: number;
}

function ChangeUserAccess(props: Props) {

    const dispatch = useDispatch();
    const [selectedType, setSelectedType] = useState(props.type ? props.type : UserType.GUEST);
    const person = useSelector((state: RootState) => state.person);

    useEffect(() => {
        dispatch(getPerson(props.personId))
    }, [dispatch, props.personId])

    const onAcceptClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const user: Person = {
            ...person, type: selectedType
        };

        dispatch(updateUserType(user));
        props.onClose();
    }

    const selectedTypeChanged = (typeValue: number) => {
        setSelectedType(typeValue);
    }

    return (
        <div className="change-access">
            <div className="change-access__access">
                <ButtonToggle
                    buttonToggleMap={accessMap}
                    initState={selectedType}
                    onSelectClick={selectedTypeChanged}
                    access={true}
                />
            </div>
            <div className="change-access__form-action">
                <FormAction
                    mode={false}
                    rejectBtnTitle="Cancel"
                    acceptBtnTitle="Save"
                    onAcceptClick={onAcceptClick}
                    onRejectClick={props.onClose}
                />
            </div>
        </div>
    );
}

export default ChangeUserAccess;