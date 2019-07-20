import React from "react";


class ChartDot extends React.Component {
  renderSelected() {
    const {
      cx, cy, index, progress, selectedIndex
    } = this.props;
    return (
      <svg x={cx - 8} y={cy - 8} onClick={(e) => {
        this.props.onClick(e, {index, cx, cy})
      }} width="16px" height="16px" viewBox="0 0 15 15" version="1.1"
           xmlns="http://www.w3.org/2000/svg">
        <g id="Mockups" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Goal-Progress-Review" transform="translate(-632.000000, -560.000000)" stroke="#3A96FD">
            <g id="Big-Chart-Card" transform="translate(249.000000, 474.000000)">
              <g id="chart" transform="translate(34.000000, 56.000000)">
                <g id="figure" transform="translate(15.000000, 31.000000)">
                  <g id="Group-7" transform="translate(335.000000, 0.000000)">
                    <circle id="Oval-Copy" fill="#FFFFFF" cx="6.5" cy="6.5" r="6.5"></circle>
                    <circle id="Oval" fill="#3A96FD" cx="6.5" cy="6.5" r="2.5"></circle>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>)
  }

  renderUnreviewed() {
    const {
      cx, cy, index, progress, selectedIndex
    } = this.props;
    return (
      <svg x={cx - 5} y={cy - 5} onClick={(e) => {
        this.props.onClick(e, {index, cx, cy})
      }} width="10px" height="10px" viewBox="0 0 9 9" version="1.1"
           xmlns="http://www.w3.org/2000/svg">


        <g id="Mockups" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Goal-Progress-Review" transform="translate(-805.000000, -585.000000)" fill="#FFFFFF" stroke="#3794FC"
             strokeWidth="2">
            <g id="Big-Chart-Card" transform="translate(249.000000, 474.000000)">
              <g id="chart" transform="translate(34.000000, 56.000000)">
                <g id="figure" transform="translate(15.000000, 31.000000)">
                  <ellipse id="Oval" cx="511.654147" cy="28.121643" rx="3.16634256" ry="3"></ellipse>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>)
  }

  renderReviewed() {
    const {
      cx, cy, index, progress, selectedIndex
    } = this.props;
    return (
      <svg onClick={(e) => {
        this.props.onClick(e, {index, cx, cy})
      }} x={cx - 6} y={cy - 6} width="12px" height="12px" viewBox="0 0 11 11" version="1.1"
           xmlns="http://www.w3.org/2000/svg">

        <g id="Mockups" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Goal-Progress-Review" transform="translate(-550.000000, -584.000000)" fill="#3794FC"
             stroke="#3794FC" strokeWidth="3">
            <g id="Big-Chart-Card" transform="translate(249.000000, 474.000000)">
              <g id="chart" transform="translate(34.000000, 56.000000)">
                <g id="figure" transform="translate(15.000000, 31.000000)">
                  <circle id="Oval" cx="257.5" cy="28.5" r="4"></circle>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>)
  }

  renderPoint() {
    const {
      cx, cy, index, progress, selectedIndex
    } = this.props;
    if (index === selectedIndex) {
      return this.renderSelected()
    }
    if (progress[index].is_reviewed) {
      return this.renderReviewed()
    } else {
      return this.renderUnreviewed()
    }
  }

  render() {
    const {
      cx, cy, index, progress, selectedIndex
    } = this.props;
    return this.renderPoint(cx, cy, progress, selectedIndex, index)
  }

}

export default ChartDot;
