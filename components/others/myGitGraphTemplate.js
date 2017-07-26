var myTemplateConfig = {
    colors: ["#000000", "#008fb5", "#f1c109"], // branches colors, 1 per column
    branch: {
        lineWidth: 8,
        spacingX: 50,
        showLabel: false, // display branch names on graph
    },
    commit: {
        spacingY: -45,
        // spacingX: -10,        
        
        dot: {
            size:12
        },
        message: {
            displayAuthor: true,
            displayBranch: true,
            displayHash: true,
            font: "10pt Arial"
        },
        shouldDisplayTooltipsInCompactMode: false, // default = true
        tooltipHTMLFormatter: function (commit) {
            return "" + commit.sha1 + "" + ": " + commit.message;
        },
        tag: {
            spacingX : 0
        }
    }
}

function commit(branch, o, i, that) {
    var tag = '',
        color = "white",
        clickFunc = () => {}
    if (i == that.state.deployingNode && that.state.deploying == true) {
        color = that.state.deployNodeColor
        tag = "正在部署"
    } else if (i == that.state.nodeAt) {
        color = "#34a853"
        tag = "运行中"
    } else {
        if (i < that.state.nodeAt) {
            color = "#979797"
        } else {
            color = "#008fb5"
        }
        clickFunc = (commit) => {
            that.onNodeClick(commit)
        }
    }
    branch.commit({
        // x: 50,
        lineWidth: 8,
        // spacingX: 100,
        showLabel: true,
        dotColor: color,
        dotSize: 5,
        dotStrokeWidth: 10,
        sha1: o.short_id,
        message: o.title,
        author: o.author_name,
        tag: tag,
        tagColor: color,
        displayTagBox: false,
        onClick: clickFunc
    })
}
function merge(branch, branchin, o, i, that){
    var tag = '',
        color = "white",
        clickFunc = () => {}
    if (i == that.state.deployingNode && that.state.deploying == true) {
        color = that.state.deployNodeColor
        tag = "正在部署"
    } else if (i == that.state.nodeAt) {
        color = "#34a853"
        tag = "运行中"
    } else {
        if (i < that.state.nodeAt) {
            color = "#979797"
        } else {
            color = "#008fb5"
        }
        clickFunc = (commit) => {
            that.onNodeClick(commit)
        }
    }
    branchin.merge(branch, {
        // x: 50,
        lineWidth: 8,
        // spacingX: 100,
        showLabel: true,
        dotColor: color,
        dotSize: 5,
        dotStrokeWidth: 10,
        sha1: o.short_id,
        message: o.title,
        author: o.author_name,
        tag: tag,
        tagColor: color,
        displayTagBox: false,
        onClick: clickFunc
    })
}
var template = new GitGraph.Template(myTemplateConfig);

var myTemplate = {
    template: template,
    commit: commit,
    config: myTemplateConfig,
    merge: merge
}

export default myTemplate