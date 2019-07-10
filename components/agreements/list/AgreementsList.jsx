import React from 'react';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon'
import ChevronUpIcon from 'mdi-react/ChevronUpIcon'
import AgreementItem from "./AgreementItem";

class AgreementsList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    }
  }

  onClickHeader = () => {
    this.setState({ isOpen: !this.state.isOpen })
  };

  renderHeader = () => (
    <div
      className="flex p-3 pl-0 is-size-4 font-bold cursor-pointer select-none hover:text-black"
      onClick={this.onClickHeader}
    >
      <div className="flex items-center mr-1">
        {this.state.isOpen ? <ChevronDownIcon/> : <ChevronUpIcon/>}
      </div>
      <div>{this.props.title}</div>
    </div>
  );

  renderListItems = () => {
    const {
      agreements = []
    } = this.props;

    console.log(agreements)

    return agreements.map((element) => (
        <AgreementItem
          key={element._id}

          agreement={element}
        />
      )
    )
  };

  render() {
    return (
      <div className="flex flex-col w-full">
        <div className="flex justify-start">
          {this.renderHeader()}
        </div>
        <div>
          {this.state.isOpen && this.renderListItems()}
        </div>
      </div>
    )
  }
}

export default AgreementsList