var myTemplateConfig = {
    colors: ["#979797", "#008fb5", "#f1c109"], // branches colors, 1 per column
    branch: {
        lineWidth: 8,
        spacingX: 20,
        showLabel: false, // display branch names on graph
    },
    commit: {
        spacingY: -45,
        dot: {
            size:12
        },
        message: {
            displayAuthor: true,
            displayBranch: true,
            displayHash: true,
            font: "normal 12pt Arial"
        },
        shouldDisplayTooltipsInCompactMode: false, // default = true
        tooltipHTMLFormatter: function (commit) {
            return "" + commit.sha1 + "" + ": " + commit.message;
        }
    }
}

function commit(branch, o, i, that) {
    var tag = '',
        color = "white",
        clickFunc = () => {}
    if (i == that.state.deployingNode && that.state.deploying == true) {
        color = that.state.deployNodeColor
        tag = "Deploy"
    } else if (i == that.state.nodeAt) {
        color = "#34a853"
        tag = "Running"
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
        lineWidth: 8,
        spacingX: 20,
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
    config: myTemplateConfig
}

export default myTemplate