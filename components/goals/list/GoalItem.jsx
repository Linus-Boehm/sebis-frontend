import React from "react";
import Avatar from "react-avatar";
import GoalAvatar from "../../utils/user/GoalAvatar";

class GoalItem extends React.Component {
  highlightByFilter = (text, filter) => {
    if (filter === "" || filter === undefined) return <span>{text}</span>;

    const regex = new RegExp(filter, "ig");
    const parts = text.split(regex);
    const matches = text.match(regex);

    //console.log(JSON.stringify(matches) + ' ' + JSON.stringify(parts))

    return parts.map((part, i) => [
      <span key={"part1-" + i}>{part}</span>,
      matches && matches[ i ] && matches[ i ] !== "" ? (
        <span key={"part2-" + i} className="font-bold">
          {matches[ i ]}
        </span>
      ) : null
    ]);
  };

  render() {
    const { goal, isSubGoal, onSelect, isSelected, searchFilter } = this.props;

    const { title } = goal || {};

    return (
      <div
        className={`goal-item flex items-center bg-gray-200 hover:bg-gray-300 mb-2 p-2 cursor-pointer
         ${isSubGoal ? "ml-3" : ""}
         ${isSelected ? "is-selected bg-blue-300 hover:bg-blue-300" : ""}
        `}
        onClick={() => {
          onSelect(goal._id);
        }}
      >
        <div className="flex-grow pr-2 ml-3 max-w-full max-w-full select-none container-max break-all goal-text-item">
          {this.highlightByFilter(title, searchFilter)}
        </div>
        {goal.related_model === "ObjectiveAgreement" && !isSubGoal && (
          <span
            className="tag w-32 mr-4"
            style={{
              backgroundColor: "#4990F4",
              color: "#ffff",
              fontWeight: "bold"
            }}
          >
            Bonus: {goal.oa_weight || 0}%
          </span>
        )}
        <div className="pr-2">
          <GoalAvatar selectedGoal={goal} size={25} textSizeRatio={2}/>
        </div>
      </div>
    );
  }
}

export default GoalItem;
