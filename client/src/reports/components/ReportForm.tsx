import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import 'date-fns';
import React from "react";
import AddReport from "./AddReport";

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