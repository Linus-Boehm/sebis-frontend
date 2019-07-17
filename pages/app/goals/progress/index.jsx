import React from "react";
import {connect} from "react-redux";
import DefaultLayout from "~/components/layout/DefaultLayout";
import {fetchUsers} from "~/store/actions/users";
import {fetchGoalById} from "../../../../store/actions/goals";
import {fetchComments} from "../../../../store/actions/comments";
import CommentBox from "../../../../components/utils/comment/CommentBox";
import ProgressInfoContainer from "../../../../components/goals/progress/ProgressInfoContainer";

class ProgressIndex extends React.Component {
    async componentDidMount() {
        await Promise.all([
            this.props.dispatch(fetchUsers()),
            this.props.dispatch(fetchGoalById(this.props.currentId)),
            this.props.dispatch(fetchComments(this.props.currentId))
        ])
    }

    static async getInitialProps({query}) {
        return {currentId: query.id};
    }

    render() {
        const {selectedGoal} = this.props;

        return (
            <DefaultLayout forceAuth={true}>
                <div className="is-flex-fullhd">
                    <div className="column">
                        <div className="section">
                            <div className="content">
                                <ProgressInfoContainer/>
                            </div>
                        </div>
                    </div>

                    <div className="goal-info column is-full is-full-mobile is-one-quarter-fullhd xl:border-l-2 border-gray-200 section">
                        <CommentBox
                            feedTitle="Goal Feed"
                            relatedTo={selectedGoal._id}
                            {...this.props}
                        />
                    </div>
                </div>
            </DefaultLayout>
        );
    }
}

function mapStateToProps(state) {
    const {selectedGoal} = state.goals;

    return {
        selectedGoal: selectedGoal
    };
}

export default connect(mapStateToProps)(ProgressIndex);
