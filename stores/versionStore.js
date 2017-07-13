import EventEmitter from 'events'

class VersionStore extends EventEmitter {
    constructor() {
        super(...arguments);
        this.commitList = null;
        this.currentVersion = null
        this.nodeAt = -1
    }

    getCommitList() {
        return this.commitList
    }

    updateCommitListHandler(o) {
        this.commitList = o
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

    getCurrentVersion(callback) {
        var that = this
        $.ajax({
            url: '/v2/apps/nap/ityphoon',
            type: 'GET',
            dataType: 'json',
            success: processData,
            error: function (e) {
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
        $.ajax({
            url: '/api/v4/projects/431/repository/commits',
            type: 'GET',
            dataType: 'json',
            success: processData,
            error: function (e) {
                console.log(e), alert('get commits boo!');
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
        $.ajax({
            url: 'https://git.njuics.cn/api/v4/projects/431/trigger/pipeline',
            type: 'POST',
            data: {
                token: "b6554b434c272d3077952ccdd2a134",
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
            url: 'https://penal.njuics.cn/',
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

}

var versionStore = new VersionStore()

export default versionStore