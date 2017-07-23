export function getAllNodes(array, callback) {
    $.ajax({
        url: '/nodes',
        type: 'GET',
        success: getData,
        error: function (e) {
            console.log('physical view: get nodes list failed', e)
        }
    })

    function getData(json) {
        array.push(json)
        callback(array)
    }
}
export function getAllTasks(array, callback) {
    $.ajax({
        url: '/tasks',
        type: 'GET',
        success: getData,
        error: function (e) {
            console.log('physical view: get tasks list failed', e)
        }
    })

    function getData(json) {
        array.push(json)
        callback(array)
    }
}
export function getAllServices(array, callback) {
    $.ajax({
        url: '/services',
        type: 'GET',
        success: getData,
        error: function (e) {
            console.log('physical view: get services list failed', e)
        }
    })

    function getData(json) {
        array.push(json)
        callback(array)
    }
}