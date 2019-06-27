
import React from "react";
import LoadingIcon from "mdi-react/LoadingIcon";

class BaseButton extends React.Component {


    render() {
        const loadingSpinner = (
            <span className="pr-1">
                <LoadingIcon className="spinner" size="1em"/>
            </span>
        )
        const buttonClass = 'button '
            + (this.props.type ? this.props.type : 'is-primary')
            + ' '
            + (this.props.className ? this.props.className : '')
        return (
            <button className={buttonClass} disabled={this.props.disabled || false} onClick={this.props.onClick}>
                {this.props.loading && loadingSpinner}
                {this.props.children}
                {/*language=CSS*/
                }
                <style jsx global>{`
                    .spinner {
                        animation: rotator 800ms linear infinite;
                    }

                    @keyframes rotator {
                        0% {
                            transform: rotate(0deg);
                        }
                        100% {
                            transform: rotate(360deg);
                        }
                    }
                `}</style>
            </button>


        )

    }

}

export default BaseButton;
