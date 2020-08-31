import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'date-fns';
import React from 'react';
import "../styles/date-picker.scss";

interface Props {
  selectedDate: Date | null;
  handleDateChange: (date: Date | null) => void;
  title: string;
}

function DatePickerComponent(props: Props) {

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        fullWidth
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        margin="normal"
        label={props.title}
        value={props.selectedDate}
        onChange={props.handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
}

export default DatePickerComponent;
