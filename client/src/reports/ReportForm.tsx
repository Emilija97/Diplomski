import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import 'date-fns';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import AddReport from "./AddReport";
import { selectReport } from "./store/selectors";

interface Props {
    fullName: string;
    year: number;
    month: string;
    personId: string;
    open: boolean;
    onClose: () => void;
    report: any;
}

function ReportForm(props: Props) {
    // const dispatch = useDispatch();
    // const report = useSelector((state: RootState) => state.reports);
    // // const report = useSelector((state: RootState) => selectReport(state));

    // useEffect(() => {
    //     dispatch(getReport(props.personId, props.year, props.month));
    // }, [dispatch, props.personId, props.year, props.month]);

    return (
        <div className="activity-form">
            <Dialog
                open={props.open}
                aria-labelledby="draggable-dialog-title"
                className="ni-dialog"
            >
                <DialogTitle id="draggable-dialog-title" className="activity-form__title">{props.fullName}</DialogTitle>
                <DialogContent>
                    <AddReport onClose={props.onClose} report={props.report} personId={props.personId} year={props.year} month={props.month} />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ReportForm;