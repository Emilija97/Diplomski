import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import 'date-fns';
import React from "react";
import ChangeUserAccess from "./ChangeUserAccess";


interface Props {
    fullName: string;
    personId: string;
    open: boolean;
    type: number;
    onClose: () => void;
}

function UserAccessForm(props: Props) {

    return (
        <div className="user-access-form">
            <Dialog
                open={props.open}
                aria-labelledby="draggable-dialog-title"
                className="ni-dialog"
            >
                <DialogTitle id="draggable-dialog-title" className="user-access-form__title">{props.fullName}</DialogTitle>
                <DialogContent>
                    <ChangeUserAccess onClose={props.onClose} personId={props.personId} type={props.type}/>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UserAccessForm;