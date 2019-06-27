
import React from "react";
import BaseButton from "./BaseButton";
import TrashCanOutlineIcon from "mdi-react/TrashCanOutlineIcon";
import PencilOutlineIcon from "mdi-react/PencilOutlineIcon";


class EditButton extends React.Component {


    render() {
        const props = {...this.props, type: 'is-primary'}
        return (
            <BaseButton {...props}>
                <PencilOutlineIcon size="1em"/>
                {this.props.children}
            </BaseButton>
        );
    }

}

export default EditButton;
