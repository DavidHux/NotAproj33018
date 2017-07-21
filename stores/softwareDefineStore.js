import EventEmitter from 'events'
import serviceStore from './serviceStore'

class SoftwareDefineStore extends EventEmitter {
    constructor() {
        super(...arguments);
        this.defines = []
    }

    getDefine(serviceName, callback){
        for(var i = 0;i < this.defines.length;i++){
            if(this.defines[i].name = serviceName){
                callback(this.defines[i].define)
            }
        }

        this.getNewDefine(serviceName, (value) =>{
            if(value == -1){
                console.log('err get new define should not be null')
                callback(-1)
            }
            this.defines.push({name: serviceName, define: value})
            callback(value)
        })
    }

    getNewDefine(serviceName, callback){
        var that = this
        var url = serviceStore.getServiceUrl(serviceName)
        if(url == -1){
            callback(-1)
            return
        }
        $.ajax({
            url: '/v2/apps/nap/' + url,
            type: 'GET',
            dataType: 'json',
            success: processData,
            error: function (e) {
                callback(-1)
                console.log('get new define failed', e)
            }
        });

        function processData(json) {
            var id, cpus, mem, disk, gpus, type, image, networkType, version,
                instances, backoffSeconds, backoffFactor, command, ipAddress
            id = json.app.id
            cpus = json.app.cpus
            mem = json.app.mem
            disk = json.app.disk
            gpus = json.app.gpus
            type = json.app.container.type
            image = json.app.container.docker.image
            networkType = json.app.container.docker.network
            version = json.app.version
            instances = json.app.instances
            backoffSeconds = json.app.backoffSeconds
            backoffFactor = json.app.backoffFactor
            command = json.app.cmd == null ? 'not configured' : json.app.cmd
            ipAddress = json.app.container.ipAddress == null ? 'null' : json.app.container.ipAddress
            var ff = [], f = [], f2 = []
            f.push(['id', id])
            f.push(['image', image])
            f.push(['cpus', cpus])
            f.push(['mem', mem])
            f.push(['disk', disk])
            f.push(['type', type])
            f.push(['image', image])
            f.push(['instances', instances])
            f.push(['backoff seconds', backoffSeconds])
            f.push(['backoff factor', backoffFactor])
            f.push(['command', command])
            f.push(['version', version])

            f2.push(['network type', networkType])
            f2.push(['ip address', ipAddress])
            
            ff.push(f)
            ff.push(f2)
            callback(ff)
        }
    }

}

var softwareDefineStore = new SoftwareDefineStore()

export default softwareDefineStore