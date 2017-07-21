import EventEmitter from 'events'
import ServiceActions from '../actions/ServiceActions'
import versionStore from './versionStore'

class ServiceStore extends EventEmitter {
    constructor() {
        super(...arguments);
        this.serviceList = null;
        this.warehouseList = null;
        this.graphData = null;
    }

    // getAll() {
    //     return this.items;
    // }
    getServiceUrl(id){
        if (this.serviceList == null) {
            console.log('get url of service failed!')
            return -1
        }
        if(id == '监控预警系统'){
            return 'spring-typhoon'
        }
        for(var i=0;i < this.serviceList.nodes.length;i++){
            if(this.serviceList.nodes[i].label == id)
                return 'microservice-' + this.serviceList.nodes[i].id
        }
        console.log('get service url failed', id)
        return -1
    }
    getServiceNum(serviceName) {
        if (this.serviceList == null) {
            console.log('get num of service failed!')
            return 431
        }
        for(var i = 0;i < this.serviceList.nodes.length;i++){
            if(this.serviceList.nodes[i].label == serviceName){
                return this.serviceList.nodes[i].git_id //to be modified
            }
        }
        console.log('can not get num of service :', serviceName)
        return -1
    }
    getServiceToken(id){
        if (this.serviceList == null) {
            console.log('get token of service failed!')
            return -1
        }
        for(var i=0;i < this.serviceList.nodes.length;i++){
            if(this.serviceList.nodes[i].label == id)
                return this.serviceList.nodes[i].token
        }
        console.log('get service token failed', id)
        return -1
    }
    getServiceList() {
        return this.serviceList
    }
    getServiceNameList() {
        return this.serviceList.nodes
    }

    getWarehouseList() {
        return this.warehouseList
    }

    updateServiceListHandler(o) {
        if(this.serviceList == null){
            this.serviceList = o
            em.emit('firstgetservice')
        } else {
            this.serviceList = o            
        }
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
    requestServiceList(callback) {
        var that = this
        $.ajax({
            url: '/ssss',
            type: 'GET',
            success: getData,
            error: function (e) {
                console.log('get service list failed', e)
            }
            // beforeSend: setHeader
        })

        function getData(json) {
            if (json == null) {
                console.log('get service list null')
                return null
            }
            // console.log('json', json)
            var ret = json
            if((that.serviceList == null || that.serviceList.nodes.length == 0) && json.nodes.length != 0){
                em.emit('firstgetservice')
            }
            if (json.nodes.length == 0 && json.links.length == 0 && that.serviceList != null) {
                ret = that.serviceList
            }
            that.computeDifference(json, that.serviceList)
            // that.serviceList = ret
            ServiceActions.updateService(ret)
            callback(ret)
        }
    }
    computeDifference(now1, last1){
        if(now1 == null || last1 == null || now1.nodes.length == 0 || last1.nodes.length == 0){
            return
        }
        var now = now1.nodes, last = last1.nodes
        var added = '', mmed = ''
        l1:for(var i = 0;i < now.length;i++){
            for(var j = 0;j < last.length;j++){
                if(last[j].label == now[i].label){
                    continue l1
                }
            }
            added += now[i].label + ' '
        }
        l2:for(var i = 0;i < last.length;i++){
            for(var j = 0;j < now.length;j++){
                if(now[j].label == last[i].label){
                    continue l2
                }
            }
            mmed += last[i].label + ' '
        }
        if(added == '' && mmed == '') return
        var msg = '服务状态更新：'
        if(added != ''){
            msg += '新加入服务 ' + added + '。'
        }
        if(mmed != ''){
            msg += '服务 ' + mmed + '退出。'
        }
        versionStore.emitMessage(msg)
    }
}

var serviceStore = new ServiceStore()

export default serviceStore