import React from "react";
import BaseButton from "./BaseButton";
import TrashCanOutlineIcon from "mdi-react/TrashCanOutlineIcon";

class DeleteButton extends React.Component {
  render() {
    const props = { ...this.props, type: "is-danger" };
    return (
      <BaseButton {...props}>
        <TrashCanOutlineIcon size="1em" />
        {this.props.children}
      </BaseButton>
    );
  }
}

export default DeleteButton;
