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
      break
    case 'UPDATE_VERSION_SERVICE':
      versionStore.updateServiceHandler(action.o)
      versionStore.emitServiceChange()
      break
    default:
      // no op
  }
})

export default AppDispatcher