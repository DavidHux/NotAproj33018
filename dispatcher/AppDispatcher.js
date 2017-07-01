var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();
var ListStore = require('../stores/ListStore');
import serviceStore from '../stores/serviceStore'

AppDispatcher.register(function (action) {
  switch(action.actionType) {
    case 'ADD_NEW_ITEM':
      ListStore.addNewItemHandler(action.text);
      ListStore.emitChange();
      break;
    case 'UPDATE_SERVICE_LIST':
      serviceStore.updateServiceListHandler(action.o)
      serviceStore.emitServiceChange()
    default:
      // no op
  }
})

export default AppDispatcher
