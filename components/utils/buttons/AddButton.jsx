
import React from "react";
import BaseButton from "./BaseButton";
import PlusIcon from "mdi-react/PlusIcon";


class AddButton extends React.Component {


    render() {
        const props = {...this.props, type: 'is-link'}
        return (
            <BaseButton {...props}>
                <PlusIcon size="1em"/>
                {this.props.children}
            </BaseButton>
        );
    }

}

export default AddButton;
