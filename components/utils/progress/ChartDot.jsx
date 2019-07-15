import React from "react";
import {CartesianGrid, ReferenceLine, Line, LineChart, XAxis, YAxis} from "recharts";
import {take, map} from "lodash";
import moment from "moment";


class ProgressLineChart extends React.Component {

    calculateProgress() {
        const progress = this.props.progress ? this.props.progress : [];
        const cumulated = !!this.props.cumulated;
        const maxPoints = this.props.maxPoints ? this.props.maxPoints : 8;
        let values = take(progress, maxPoints)

        let lastVal = 0;
        return  map(values, (point) => {
            let temp = parseFloat(point.value) + lastVal;
            if (cumulated) {
                lastVal = temp;
            }
            return {name: moment(point.date).format("DD.M.YY"), v: temp}
        })

    }
    handleClick = (data, index) => {
        this.setState({
            activeIndex: index,
        });
        console.log("Click Chart ",index)
        console.log(data);
    }
    render() {

        const buttonClass = 'goal-progress-chart'
            + ' '
            + (this.props.className ? this.props.className : '')
        return (
            <div className={buttonClass}>
                <LineChart width={400} height={400} data={this.calculateProgress()}
                           margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
                    <Line type="monotone" dataKey="v" stroke="#8884d8" dot={{ stroke: 'red', strokeWidth: 2 }} onClick={this.handleClick}/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    {!!this.props.cumulated && this.props.maxProgress && (<ReferenceLine y={this.props.maxProgress} label="Max" stroke="red" strokeDasharray="3 3" />)}

                    <XAxis dataKey="name"/>
                    <YAxis/>

                </LineChart>

                {/*language=CSS*/
                }
                <style jsx global>{`

                `}</style>
            </div>


        )

    }

}

export default ProgressLineChart;
