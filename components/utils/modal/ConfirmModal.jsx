import React from "react";
import TrashCanOutlineIcon from "mdi-react/TrashCanOutlineIcon";
import BaseModal from "./BaseModal";


class ConfirmModal extends React.Component {


    closeModal = (e) => {
        e.preventDefault()
        this.props.onCloseModal(e)
    }
    render() {
        const props = {...this.props, type: 'is-danger'};
        const confirmButtonClass = "button "+ (this.props.confirmButtonType?this.props.confirmButtonType:'is-success')
        const confirmButtonText = this.props.confirmButtonText?this.props.confirmButtonText:"OK"
        return (
            <BaseModal {...props}>
                <div className="modal-card">
                    {this.props.title &&
                        <header className="modal-card-head">
                            <p className="modal-card-title">{this.props.title}</p>
                            <button className="delete" aria-label="close" onClick={this.closeModal}></button>
                        </header>
                    }
                    <section className="modal-card-body is-clipped">

                    {this.props.children}
                    </section>
                    <footer className="modal-card-foot">
                        <button className={confirmButtonClass} onClick={this.props.onConfirm}>{confirmButtonText}</button>
                        <button className="button" onClick={this.closeModal}>Cancel</button>
                    </footer>
                </div>
            </BaseModal>
        );
    }

}

export default ConfirmModal;
