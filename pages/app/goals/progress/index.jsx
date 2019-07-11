import React from "react";
import { connect } from "react-redux";
import DefaultLayout from "~/components/layout/DefaultLayout";
import { fetchUsers } from "~/store/actions/users";
import {fetchGoalById} from "../../../../store/actions/goals";

class ProgressIndex extends React.Component {
    async componentDidMount() {
        await this.props.dispatch(fetchUsers());
        await this.props.dispatch(fetchGoalById(this.props.currentId));
    }

    static async getInitialProps({ query }) {
        return { currentId: query.id };
    }

    render() {
        return (
            <DefaultLayout forceAuth={true}>
                <div className="content">
                    <h2 className="has-text-grey-darker">
                        Progress for goal: {this.props.selectedGoal.title}
                    </h2>
                    
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
