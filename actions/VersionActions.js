import AppDispatcher from '../dispatcher/AppDispatcher'

var VersionActions = {

    updateCommit: function (o) {
        AppDispatcher.dispatch({
            actionType: 'UPDATE_COMMIT_LIST',
            o: o
        });
    }

};

export default VersionActions