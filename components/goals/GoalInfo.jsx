import React from "react";
import CommentBox from "../utils/comment/CommentBox";
import { FaTrashAlt, FaTimes } from "react-icons/fa";
import TextareaAutosize from "react-autosize-textarea";
import ConfirmModal from "../utils/modal/ConfirmModal";
import GoalItem from "./list/GoalItem";
import GoalAvatar from "../utils/user/GoalAvatar";
import SubGoalList from "./list/SubGoalList";
import EditButton from "../utils/buttons/EditButton";
import ActiveLink from "../layout/ActiveLink";
import { GOAL_TYPE } from "../../store/types/goal";
import AgreementItem from "../agreements/list/AgreementItem";
import GoalProgress from "./progress/GoalProgress";
import { getMaximumProgress } from "../../services/Goal/GoalProgressService";
import { connect } from "react-redux";

class GoalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editEnabled: false,
      isDeleteModalVisible: false
    };
  }

  handleDelete = e => {
    e.preventDefault();

    this.props.onDeleteGoal();
  };

  onSelectGoal = id => {
    this.props.onSelectGoal(id);
  };

  setDeleteModalVisibility = (isDeleteModalVisible = false) => {
    this.setState({ isDeleteModalVisible });
  };

  onChangeAndSave = async changes => {
    await this.onChange(changes);
    await this.props.onUpdateGoal();
  };

  onChange = async changes => {
    await this.props.onChangeInput(changes);
  };

  getAgreementById(agreement) {
    if (this.props.agreements[ agreement ] != null) {
      return this.props.agreements[ agreement ];
    }
    return null;
  }

  getWeightInDollars = () => {
    if (
      !!this.props.selectedAgreement.bonus &&
      !!this.props.selectedGoal.oa_weight
    ) {
      return Math.floor(
        (this.props.selectedGoal.oa_weight / 100) *
        this.props.selectedAgreement.bonus
      );
    }

    return "0";
  };

  render() {
    const { selectedGoal, onClose, editModeDisabled } = this.props;

    const { title, description, oa_weight, parent_goal } = selectedGoal;

    const agreement =
      selectedGoal.related_model === "ObjectiveAgreement" &&
      this.getAgreementById(selectedGoal.related_to);

    const agreement_mode = this.props.agreementMode === true;

    return (
      <div className="w-1/3 border-l-2 border-gray-200 flex goalinfo ml-2 ">
        <div className="flex-1 h-full goal-info py-2 px-6">
          <div className="content">
            <div className="goal-detail-header flex">
              <div className="people justify-start flex-1">
                <GoalAvatar className="m-1" selectedGoal={selectedGoal}/>
              </div>

              <div className="justify-end actions flex items-center">
                <button
                  className="button is-danger ml-2"
                  title={"Delete Goal"}
                  disabled={editModeDisabled ||
                  (!parent_goal && agreement && agreement.assignee_confirmed && agreement.reviewer_confirmed)}
                  onClick={() => {
                    this.setDeleteModalVisibility(true);
                  }}
                >
                  <FaTrashAlt/>
                </button>
                <ConfirmModal
                  title="Confirm Delete"
                  active={this.state.isDeleteModalVisible}
                  confirmButtonType="is-danger"
                  confirmButtonText="Delete"
                  onCloseModal={() => {
                    this.setDeleteModalVisibility(false);
                  }}
                  onConfirm={this.handleDelete}
                >
                  Are you sure you want to delete Goal <strong className={"break-all"}>{title}</strong>?
                </ConfirmModal>

                <button
                  className="ml-3 text-gray-600 is-size-12 cursor-pointer p-2"
                  onClick={onClose}
                >
                  <FaTimes size={24}/>
                </button>
              </div>
            </div>

            <div className="pt-2">
              <div className="field">
                <p className="control">
                  <TextareaAutosize
                    disabled={editModeDisabled}
                    className="input goal-title editable-input-and-show-value"
                    name="title"
                    placeholder="Enter a title"
                    value={title ? title : ""}
                    onKeyDown={e => e.keyCode !== 13}
                    onKeyUp={e =>
                      (e.target.value = e.target.value.replace(/[\r\n\v]+/g, " "))
                    }
                    onBlur={this.props.onUpdateGoal}
                    onChange={e =>
                      this.onChange({ [ e.target.name ]: e.target.value })
                    }
                  />
                </p>
              </div>
            </div>
            <div className="pt-2">
              <TextareaAutosize
                disabled={editModeDisabled}
                rows={3}
                className="input editable-input-and-show-value"
                name="description"
                placeholder="Add description..."
                onBlur={this.props.onUpdateGoal}
                onChange={e => this.onChange({ [ e.target.name ]: e.target.value })}
                value={description ? description : ""}
              />
            </div>

            <SubGoalList parentGoal={selectedGoal} {...this.props} />

            {agreement && (
              <div>
                <h3 className="goal-info-subheader">Linked to</h3>
                <AgreementItem
                  size_class={""}
                  key={agreement._id}
                  agreement={agreement}
                  reviewer={this.props.reviewer}
                  assignee={this.props.assignee}
                />
              </div>
            )}

            {agreement_mode && (
              <div>
                <h3 className="goal-info-subheader">
                  <label htmlFor={"goal_weight_" + selectedGoal._id}>
                    Weight of Total Bonus
                  </label>
                </h3>
                <div className="flex">
                  <div className="flex-1 goal-weight-input control has-icons-right">
                    <input
                      id={"goal_weight_" + selectedGoal._id}
                      className="input editable-input-and-show-value text-right"
                      disabled={editModeDisabled}
                      type="number"
                      max="100"
                      min="0"
                      step="10"
                      name="oa_weight"
                      placeholder={"Percentage"}
                      onBlur={this.props.onUpdateGoal}
                      onChange={e =>
                        this.onChange({
                          [ e.target.name ]:
                            e.target.value > 100 ? 100 : e.target.value
                        })
                      }
                      value={(oa_weight || oa_weight === 0 ? oa_weight : "")}
                    />
                    <span className="text-black icon is-middle is-right">%</span>
                  </div>
                  <div className="flex-1 goal-weight text-right font-bold">
                    = {this.getWeightInDollars()} $
                  </div>
                </div>
              </div>
            )}

            {selectedGoal.parent_goal && (
              <div>
                <h3 className="goal-info-subheader">Contributing to</h3>
                <GoalItem
                  goal={this.props.allGoals[ selectedGoal.parent_goal ]}
                  onSelect={this.onSelectGoal}
                />
              </div>
            )}

            <h3 className="goal-info-subheader">Progress</h3>
            {selectedGoal.progress_type &&
            getMaximumProgress(selectedGoal) !== 0 ? (
              <div className="flex w-full justify-between px-1">
                <GoalProgress className="mt-0 flex-grow mr-4" goal={selectedGoal}/>
                <ActiveLink href={"/app/goals/progress?id=" + selectedGoal._id}>
                  <EditButton className="is-small h-auto">
                    <span className="pl-1">Edit Progress</span>
                  </EditButton>
                </ActiveLink>
              </div>
            ) : (
              <div>
                <p>Define progress type to start.</p>
                <div className="select">
                  <select
                    name={"progress_type"}
                    onChange={e =>
                      this.onChangeAndSave({
                        [ e.target.name ]: e.target.value
                      })
                    }
                  >
                    <option value={""}>Please select</option>
                    <option value={GOAL_TYPE.QUALITATIVE}>
                      Qualitative Goal (Smileys)
                    </option>
                    <option value={GOAL_TYPE.COUNT}>Numeric Goal</option>
                    <option value={GOAL_TYPE.BOOLEAN}>
                      Goal to reach (Done or Not Done)
                    </option>
                  </select>
                </div>
                <div className="pt-2">
                  {selectedGoal.progress_type === GOAL_TYPE.COUNT && (
                    <label className="control font-bold">
                      Maximum Progress
                      <input
                        className="input"
                        name={"maximum_progress"}
                        type="number"
                        placeholder="Maximum Progress"
                        onBlur={e =>
                          this.onChangeAndSave({
                            [ e.target.name ]: e.target.value
                          })
                        }
                      />
                    </label>
                  )}
                </div>
              </div>
            )}
            <CommentBox relatedTo={selectedGoal._id}/>
          </div>
        </div>
        {/*language=CSS*/
        }
        <style jsx global>{`
            .goalinfo {
                min-height: 100%;
                height: 100%;
                background: white;
                position: static;

            }

            @media screen and (max-width: 1023px) {
                .goalinfo {
                    position: absolute;
                    z-index: 51;
                    width: 100%;

                    display: block;
                    animation-duration: .5s;
                    animation-name: slidein;
                    animation-fill-mode: forwards;
                    border: none !important;
                    margin: 0 !important;
                }
            }

            @keyframes slidein {
                from {
                    right: -300px;
                }
                to {
                    right: 0;
                }
            }
        `}</style>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { related_to } = state.goals.selectedGoal;

  let { reviewer, assignee } = state.agreements.agreements[ related_to ] || {};
  reviewer = state.users.userList[ reviewer ];
  assignee = state.users.userList[ assignee ];
  return {
    assignee,
    reviewer
  };
}

export default connect(mapStateToProps)(GoalInfo);
