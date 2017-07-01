import EventEmitter from 'events'

class ServiceStore extends EventEmitter {
    constructor() {
        super(...arguments);
        this.serviceList = null;
        this.warehouseList = null;
    }

    // getAll() {
    //     return this.items;
    // }
    getServiceList(){
        return this.serviceList
    }
    getServiceNameList(){
        return this.serviceList.nodes
    }

    getWarehouseList() {
        return this.warehouseList
    }

    updateServiceListHandler(o) {
        this.serviceList = o
    }

    updateWarehouseListHandler(o) {
        this.warehouseList = o
    }

    emitServiceChange() {
        this.emit('servicechange');
    }

    addServiceChangeListener(callback) {
        this.on('servicechange', callback);
    }

    removeServiceChangeListener(callback) {
        this.removeListener('servicechange', callback);
    }

}
 
var serviceStore = new ServiceStore()

export default serviceStore