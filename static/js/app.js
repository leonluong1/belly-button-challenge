
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function init() {
    d3.json(url).then(function(data) {
        console.log(data);
        let ids = data.names;
        let selector = d3.select("#selDataset");
        console.log(ids);
        ids.forEach((id) => {selector.append("option").attr("value", id).text();})
        createBarchart("940", data.samples);
        createBubble("940", data.samples);
    })
}

function getSample(selected, samples) {
    for (i in samples)
        if (samples[i].id === selected)
            return samples[i]
}

function createBarchart(selected, samples) {
    let sample = getSample(selected, samples);

    let otu_ids = [];
    sample.otu_ids.slice(0,10).forEach((num) => {otu_ids.push("OTU " + num);});
    data = [{
        x: sample.sample_values.slice(0,10).reverse(),
        y: otu_ids.reverse(),
        text: sample.otu_labels.slice(0,10),
        type: "bar",
        orientation: "h"
    }]

    Plotly.newPlot("bar", data);
}

function updateBarchart(selected) {
    let sample = getSample(selected, samples);
    let otu_ids = [];
    sample.otu_ids.slice(0,10).forEach((num) => {otu_ids.push("OTU " + num);});
    Plotly.restyle("bar", "x", sample.sample_values.slice(0,10).reverse());
}

function createBubble(selected, samples) {
    let sample = getSample(selected, samples);
    data = [{
        x: sample.otu_ids,
        y: sample.sample_values,
        text: sample.otu_labels,
        mode: 'markers',
        marker: {
            size: sample.sample_values,
            color: sample.otu_ids
          }
    }]
    
    let layout = {
        xaxis: {
            title: "OTU ID"
        }
    }
    Plotly.newPlot("bubble", data, layout);
}

function optionChanged(value) {
    console.log(value);
    updateBarchart(value);
}

init();

