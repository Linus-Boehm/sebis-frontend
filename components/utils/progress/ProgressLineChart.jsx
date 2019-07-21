import React from "react";
import {CartesianGrid, ResponsiveContainer, ReferenceLine, Area, AreaChart, XAxis, YAxis} from "recharts";
import {take, map} from "lodash";
import moment from "moment";
import ProgressChartPopOver from "./ProgressChartPopOver";
import ChartDot from "./ChartDot";

class ProgressLineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPopoverIndex: -1,
      cx: 0,
      cy: 0
    };
  }

  calculateProgress() {
    //TODO switch duration between
    const progress = this.props.progress ? this.props.progress : [];

    const maxPoints = this.props.maxPoints ? this.props.maxPoints : 8;
    return take(progress, maxPoints)
  }

  mapProgressToChartData(progress) {
    const accumulated = !!this.props.accumulated;
    let lastVal = 0;
    return map(progress, (point) => {
      let temp = parseFloat(point.value) + lastVal;
      if (accumulated) {
        lastVal = temp;
      }
      return {name: moment(point.date).format("DD.M.YY"), v: temp, vState: point.is_reviewed}
    })
  }

  closePopover = () => {
    this.props.closePopover();
  };

  handleClick = (e, data, progress) => {
    let {cx, cy, index} = data
    if (this.props.onSelect) {
      this.props.onSelect(e, {progress: progress[index], index})
    }
    this.setState({
      ...this.state,
      currentPopoverIndex: index,
      cx,
      cy
    });
    this.props.openPopover();
  };

  render() {
    const cClass = 'goal-progress-chart relative w-full'
      + ' '
      + (this.props.className ? this.props.className : '');
    let progress = this.calculateProgress();
    return (
      <div className={cClass}>
        <ResponsiveContainer width="99%">
          <AreaChart data={this.mapProgressToChartData(progress)}
                     margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
            <defs>
              <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3392FF" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3392FF" stopOpacity={0.01}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey="name"/>
            <YAxis/>
            {!!this.props.accumulated && this.props.maxProgress && (
              <ReferenceLine y={this.props.maxProgress} label="Max" stroke="red" strokeDasharray="3 3"/>)}
            <Area isAnimationActive={false} fillOpacity={1} fill="url(#color1)" type={!!this.props.accumulated ? "monotone" : "linear"}
                  dataKey="v" stroke="#3392FF" dot={<ChartDot onClick={(e, index) => {
              this.handleClick(e, index, progress)
            }} selectedIndex={this.props.showPopover ? this.state.currentPopoverIndex : -1} progress={progress}/>}/>

          </AreaChart>
        </ResponsiveContainer>
        {this.props.showPopover && <ProgressChartPopOver style={{'top': this.state.cy, 'left': this.state.cx}}
                                                         activeindex={this.state.currentPopoverIndex}
                                                         progress={progress} onClose={this.closePopover}/>}
        <div className="progress-chart-legend">
          <svg width="73px" height="45px" viewBox="0 0 73 45" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="Mockups" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Goal-Progress-Review" transform="translate(-820.000000, -540.000000)">
                <g id="Big-Chart-Card" transform="translate(249.000000, 474.000000)">
                  <g id="chart" transform="translate(34.000000, 56.000000)">
                    <g id="legend" transform="translate(538.000000, 8.000000)">
                      <text id="Reviewed" fill="#3794FC" fontFamily="HelveticaNeue, Helvetica Neue" fontSize="10"
                            fontWeight="normal">
                        <tspan x="19" y="10">Reviewed</tspan>
                      </text>
                      <g id="Group-7" transform="translate(0.000000, 33.000000)" stroke="#3A96FD">
                        <circle id="Oval-Copy" fill="#FFFFFF" cx="6.5" cy="6.5" r="6.5"></circle>
                        <circle id="Oval" fill="#3A96FD" cx="6.5" cy="6.5" r="2.5"></circle>
                      </g>
                      <text id="Unreviewed" fill="#3794FC" fontFamily="HelveticaNeue, Helvetica Neue" fontSize="10"
                            fontWeight="normal">
                        <tspan x="19" y="27">Unreviewed</tspan>
                      </text>
                      <circle id="Oval" stroke="#3794FC" strokeWidth="3" fill="#3794FC" cx="5.5" cy="7.5"
                              r="4"></circle>
                      <ellipse id="Oval" stroke="#3794FC" strokeWidth="2" fill="#FFFFFF" cx="6" cy="22.8402987" rx="3"
                               ry="2.84029872"></ellipse>
                      <text id="Selected" fill="#3794FC" fontFamily="HelveticaNeue, Helvetica Neue" fontSize="10"
                            fontWeight="normal">
                        <tspan x="19" y="44">Selected</tspan>
                      </text>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>

        {/*language=CSS*/
        }
        <style jsx global>{`
            .goal-progress-chart {
                min-height: 20rem;
                height: 20rem;
            }

            .progress-chart-legend {
                position: absolute;
                right: 4%;
                bottom: 15%;
            }
        `}</style>
      </div>
    )
  }
}

export default ProgressLineChart;
