import TextField from "@material-ui/core/TextField";
import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import FormAction from "../shared/form-action/FormAction";
import "../shared/styles/ni-text-field.scss";
import "./add-report.scss";
import { addReport, updateReport } from "./store/actions";
import { Report } from "./store/report-state";

interface Props {
    onClose: () => void;
    report: any;
    personId: string;
    year: number;
    month: string;
}

function AddReport(props: Props) {

    const dispatch = useDispatch();
    const [norm, setNorm] = useState(props.report !== undefined ? props.report.norm as string : "");
    const [hours, setHours] = useState(props.report !== undefined ? props.report.hours as string : "");

    const onChangeNorm = (event: ChangeEvent<HTMLInputElement>) => {
        setNorm(event.target.value);
    }

    const onChangeHours = (event: ChangeEvent<HTMLInputElement>) => {
        setHours(event.target.value);
    }

    const onAcceptClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const report: Report = {
            id: props.report === undefined ? "" : props.report.id,
            personId: props.personId,
            year: props.year,
            month: props.month,
            norm: (norm as unknown as number),
            hours: (hours as unknown as number)
        }

        props.report === undefined ? dispatch(addReport(report)) : dispatch(updateReport(report));
        props.onClose();
    }

    return (
        <div className="add-report">
            <TextField className="ni-text-field" label="Norm"
                type="number" value={norm} onChange={onChangeNorm}
            />
            <TextField className="ni-text-field" label="Worked hours"
                type="number" value={hours} onChange={onChangeHours}
            />
            <div className="add-report__form-action">
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

export default AddReport;