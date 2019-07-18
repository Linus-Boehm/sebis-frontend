import React from "react";
import BaseButton from "./BaseButton";
import PlusIcon from "mdi-react/PlusIcon";


class SingupButton extends React.Component {


  render() {
    const props = { ...this.props, type: 'is-link' }
    return (
      <BaseButton {...props}>
        {this.props.children}
      </BaseButton>
    );
  }

}

export default SingupButton;
