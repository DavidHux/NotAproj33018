var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();
// var ListStore = require('../stores/ListStore');
import serviceStore from '../stores/serviceStore'
import versionStore from '../stores/versionStore'

AppDispatcher.register(function (action) {
  switch (action.actionType) {
    // case 'ADD_NEW_ITEM':
    //   ListStore.addNewItemHandler(action.text);
    //   ListStore.emitChange();
    //   break;
    case 'UPDATE_SERVICE_LIST':
      serviceStore.updateServiceListHandler(action.o)
      serviceStore.emitServiceChange()
    case 'UPDATE_COMMIT_LIST':
      versionStore.updateCommitListHandler(action.o)
      versionStore.emitCommitChange()
    default:
      // no op
  }
})

export default AppDispatcher