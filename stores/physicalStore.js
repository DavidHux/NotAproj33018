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
        var json1 = filterStoppedNodes(json)
        array.push(json1)
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
        var json1 = filterStoppedTasks(json)
        array.push(json1)
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
        var json1 = filterTerminatedObjects(json)
        array.push(json1)
        callback(array)
    }
}

function filterStoppedTasks (objects) {
  let runningTasks = [];
  for(let i=0;i<objects.length;i++){
    let object = objects[i];
    if( object.DesiredState=="running") { //object.Status.State=="running" &&
      runningTasks.push(object);
    }
  }
  return runningTasks;
}

function filterStoppedNodes (objects) {
  let readyNodes = [];
  for(let i=0;i<objects.length;i++){
    let object = objects[i];
    if(object.Status.State==="ready") {
	    object.state = "ready";
    } else {
	object.state = "down"
    }
    object.name = object.Description.Hostname;
    object.name= object.name+" <br/>"+object.Spec.Role+
        " <br/>"+(object.Description.Resources.MemoryBytes/1000000000).toFixed(3)+"G free"+
        " <br/>"+(object.Spec.Labels);
    readyNodes.push(object);
  }
  readyNodes.sort(function (a, b) {
  if (a.Description.Hostname > b.Description.Hostname) {
    return 1;
  }
  if (a.Description.Hostname < b.Description.Hostname) {
    return -1;
  }
  // a must be equal to b
  return 0;
});
  return readyNodes;
}
function filterTerminatedObjects (objects) {
  return _.filter(objects,({State}) => State !== '"shutdown"');
}