
import React from "react";
import LoadingIcon from "mdi-react/LoadingIcon";

class BaseModal extends React.Component {

    componentDidMount(){
        document.addEventListener("keydown", this.onEsc, false);
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.onEsc, false);
    }
    onEsc = (e) => {
        if(event.keyCode === 27) {
            this.props.onCloseModal(e)
        }
    }
    render() {
        const loadingSpinner = (
            <span className="pr-1">
                <LoadingIcon className="spinner" size="1em"/>
            </span>
        )
        const cClass = 'modal '
            + (this.props.className ? this.props.className : '')
            + (this.props.active ? 'is-active' : '');
        return (
            <div className={cClass}>
                <div className="modal-background"></div>
                {this.props.children}
                <button className="modal-close is-large" aria-label="close" onClick={this.props.onCloseModal}></button>

                {/*language=CSS*/
                }
                <style jsx global>{`

                `}</style>
            </div>


        )

    }

}

export default BaseModal;
