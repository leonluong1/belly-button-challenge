
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function init() {
    d3.json(url).then(function(data) {
        console.log(data);
        let ids = data.names;
        let selector = d3.select("#selDataset");
        ids.forEach((id) => {selector.append("option").attr("value", id).text(id);})
        createBarchart("940", data.samples);
        createBubble("940", data.samples);
        createInfo("940", data.metadata);
        createGauge("940", data.metadata);
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
        text: sample.otu_labels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h",
        marker: {
            color: "maroon"
        }
    }]

    Plotly.newPlot("bar", data);
}

function updateBarchart(selected, samples) {
    console.log(selected);
    let sample = getSample(selected, samples);
    let otu_ids = [];
    
    sample.otu_ids.slice(0,10)
    sample.otu_ids.slice(0,10).forEach((num) => {otu_ids.push("OTU " + num);});
    Plotly.restyle("bar", "x", [sample.sample_values.slice(0,10).reverse()]);
    Plotly.restyle("bar", "y", [otu_ids.reverse()]);
    Plotly.restyle("bar", "text", [sample.otu_labels.slice(0,10).reverse()]);
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

function updateBubble(selected, samples) {
    let sample = getSample(selected, samples);
    console.log(sample);
    Plotly.restyle("bubble", "x", [sample.otu_ids]);
    Plotly.restyle("bubble", "marker.color", [sample.otu_ids]);
    Plotly.restyle("bubble", "y", [sample.sample_values]);
    Plotly.restyle("bubble", "marker.size", [sample.sample_values]);
    Plotly.restyle("bubble", "text", [sample.otu_labels]);

}

function createInfo(selected, metadata) {
    let meta = getSample(parseInt(selected), metadata);
    let panel = d3.select(".panel-body");
    panel.append("div").attr("id", "id").text("id: " + meta.id);
    panel.append("div").attr("id", "ethnicity").text("ethnicity: " + meta.ethnicity);
    panel.append("div").attr("id", "gender").text("gender: " + meta.gender);
    panel.append("div").attr("id", "age").text("age: " + meta.age);
    panel.append("div").attr("id", "location").text("location: " + meta.location);
    panel.append("div").attr("id", "bbtype").text("bbtype: " + meta.bbtype);
    panel.append("div").attr("id", "wfreq").text("wfreq: " + meta.wfreq);
}

function updateInfo(selected, metadata) {
    let meta = getSample(parseInt(selected), metadata);
    let panel = d3.select(".panel-body");
    panel.select("#id").text("id: " + meta.id);
    panel.select("#ethnicity").text("ethnicity: " + meta.ethnicity);
    panel.select("#gender").text("gender: " + meta.gender);
    panel.select("#age").text("age: " + meta.age);
    panel.select("#location").text("location: " + meta.location);
    panel.select("#bbtype").text("bbtype: " + meta.bbtype);
    panel.select("#wfreq").text("wfreq: " + meta.wfreq);

}

function createGauge(selected, metadata) {
    let meta = getSample(parseInt(selected), metadata);
    let wfreq = meta.wfreq;
    let data = [{
        value: wfreq,
        type: "indicator",
        mode: "gauge+number",
        title: {text: "Belly Button Washing Frequency"},
        
        gauge: {
            axis: {range: [0, 9], tickwidth: 2, tickcolor: "darkblue"},
            steps: [
                {range: [0, 1]},
                {range: [1, 2]},
                {range: [2, 3]},
                {range: [3, 4]},
                {range: [4, 5]},
                {range: [5, 6]},
                {range: [6, 7]},
                {range: [7, 8]},
                {range: [8, 9]}
            ],
            bar: {color: "purple"},
            bgcolor: "gray",
            bordercolor: "lavender",
            borderwidth: 7
            
        }
    }]

    Plotly.newPlot("gauge", data);
}

function updateGauge(selected, metadata) {
    let meta = getSample(parseInt(selected), metadata);
    let wfreq = meta.wfreq;
    Plotly.restyle("gauge", "value", wfreq);
}

function optionChanged(value) {
    let str_value = value.toString();
    d3.json(url).then(function(data) {
        updateBarchart(value, data.samples);
        updateBubble(str_value, data.samples);
        updateInfo(str_value, data.metadata);
        updateGauge(str_value, data.metadata);
    })
}

init();

