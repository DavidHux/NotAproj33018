import EventEmitter from 'events'
import serviceStore from './serviceStore'

class VersionStore extends EventEmitter {
    constructor() {
        super(...arguments);
        this.commitList = null;
        this.currentVersion = null
        this.nodeAt = -1
        this.serviceName = '监控预警系统'
    }

    getCommitList() {
        // this.getCurrentCommits()
        return this.commitList
    }
    getCurrentServiceName() {
        return this.serviceName
    }

    
    getCurrentVersion(callback) {
        var that = this
        var url = serviceStore.getServiceUrl(this.serviceName)
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
                callback(-2)
                console.log('get current version failed', e)
            }
            // beforeSend: setHeader
        });

        function processData(json) {
            var image = json.app.container.docker.image
            var id = image.substring(image.lastIndexOf(":") + 1)
            // console.log('current version :', id)
            that.currentVersion = id
            callback(id)
        }
    }

    getCurrentCommits(callback) {
        var that = this
        var num = serviceStore.getServiceNum(this.serviceName)
        $.ajax({
            url: '/api/v4/projects/'+ num + '/repository/commits',
            type: 'GET',
            dataType: 'json',
            success: processData,
            error: function (e) {
                console.log(e);
            },
            beforeSend: setHeader
        });

        function setHeader(xhr) {
            xhr.setRequestHeader("PRIVATE-TOKEN", "czyDmRjcaEjmCVCHhZuy");
        }

        function processData(data){
            that.commitList = data
            callback(data)
        }
    }

    getCurrentNodeAt(){
        for (var i = 0; i < this.commitList.length; i++) {
            if (this.commitList[i].short_id == this.currentVersion) {
                return this.commitList.length - 1 - i
            }
        }
        return -1
    }
    changeVersion(versionID) {
        var num = serviceStore.getServiceNum(this.serviceName)
        var token = serviceStore.getServiceToken(this.serviceName)
        if(num == -1){
            console.log('unexpected error: change version service should not be null!!!', this.serviceName)
            return
        }
        $.ajax({
            url: 'https://git.njuics.cn/api/v4/projects/'+ num + '/trigger/pipeline',
            type: 'POST',
            data: {
                token: token,
                ref: "master",
                "variables[SKIP_BUILD]": "true",
                "variables[CI_COMMIT_SHA]": versionID
            },
            error: function (e) {
                console.log("change version failed", e)
            }
        }).done(function (msg) {
            console.log('change version success:', msg)
        });
    }

    emitMessage(msg){
        $.ajax({
            url: 'http://demo.njuics.cn/message',
            type: 'get',
            data: {
                message: "inap__" + msg
            },
            error: function (e) {
                console.log("emit message failed", e)
            }
        }).done(function (msg) {
            console.log('emit message success:', msg)
        });
    }


    updateCommitListHandler(o) {
        this.commitList = o
    }
    updateServiceHandler(o) {
        this.serviceName = o
    }

    emitServiceChange() {
        // console.log(a.length)
        this.emit('versionServiceChange');
    }

    addServiceChangeListener(callback) {
        this.on('versionServiceChange', callback);
    }

    removeServiceChangeListener(callback) {
        this.removeListener('versionServicechange', callback);
    }

    emitCommitChange() {
        this.emit('commitchange');
    }

    addCommitChangeListener(callback) {
        this.on('commitchange', callback);
    }

    removeCommitChangeListener(callback) {
        this.removeListener('commitchange', callback);
    }

}

var versionStore = new VersionStore()

export default versionStore