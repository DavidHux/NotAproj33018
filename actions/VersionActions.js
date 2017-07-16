import AppDispatcher from '../dispatcher/AppDispatcher'

var VersionActions = {

    updateService: function (o) {
        AppDispatcher.dispatch({
            actionType: 'UPDATE_VERSION_SERVICE',
            o: o
        });
    }

};

export default VersionActions