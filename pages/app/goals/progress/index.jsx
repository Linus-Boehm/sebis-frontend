import React from "react";
import { connect } from "react-redux";
import DefaultLayout from "~/components/layout/DefaultLayout";
import { fetchUsers } from "~/store/actions/users";
import {fetchGoalById} from "../../../../store/actions/goals";
import {fetchComments} from "../../../../store/actions/comments";
import CommentBox from "../../../../components/layout/Comment/CommentBox";
import ProgressInfoContainer from "../../../../components/goals/progress/ProgressInfoContainer";

class ProgressIndex extends React.Component {
    async componentDidMount() {
        await this.props.dispatch(fetchUsers());
        await this.props.dispatch(fetchGoalById(this.props.currentId));
        await this.props.dispatch(fetchComments(this.props.currentId));
    }

    static async getInitialProps({ query }) {
        return { currentId: query.id };
    }

    render() {
        const { selectedGoal } = this.props;

        return (
            <DefaultLayout forceAuth={true}>
                <div className="flex h-full">
                    <div className="column">
                        <div className="content">
                            <ProgressInfoContainer />
                        </div>
                    </div>

                    <div className="goal-info column is-one-third border-l-2 border-gray-200 .flex-shrink-0">
                        <CommentBox
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
    const { selectedGoal } = state.goals;

    return {
        selectedGoal: selectedGoal
    };
}

export default connect(mapStateToProps)(ProgressIndex);
