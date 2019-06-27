
import React from "react";

class ButtonGroup extends React.Component {


    render() {
        let i = 0;
        const buttons = this.props.children.map(button => {
                i++;
                return (
                    <p key={i} className="control">
                        {button}
                    </p>
                )
            }
        )
        const customClass = 'field is-grouped '
            + (this.props.className ? this.props.className : '')
        return (
            <div className={customClass}>
                {buttons}
                <style jsx >{`

                `}</style>
            </div>


        )

    }

}

export default ButtonGroup;
