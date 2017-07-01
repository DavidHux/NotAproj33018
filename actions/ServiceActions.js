import AppDispatcher from '../dispatcher/AppDispatcher'

var ServiceActions = {

    updateService: function (o) {
        AppDispatcher.dispatch({
            actionType: 'UPDATE_SERVICE_LIST',
            o: o
        });
    }

};

export default ServiceActions