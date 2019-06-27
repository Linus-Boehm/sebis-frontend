
import React from "react";
import BaseButton from "./BaseButton";
import TrashCanOutlineIcon from "mdi-react/TrashCanOutlineIcon";
import EyeOutlineIcon from "mdi-react/EyeOutlineIcon";


class ShowButton extends React.Component {


    render() {
        const props = {...this.props, type: 'is-info'}
        return (
            <BaseButton {...props}>
                <EyeOutlineIcon size="1em"/>
                {this.props.children}
            </BaseButton>
        );
    }

}

export default ShowButton;
