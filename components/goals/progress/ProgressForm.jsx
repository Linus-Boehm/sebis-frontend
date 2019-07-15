import * as React from "react";
import {DatePicker} from "react-datepicker";

class ProgressForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const {
      progress
    } = this.props;

    return <div>
      <DatePicker />
    </div>
  }
}
