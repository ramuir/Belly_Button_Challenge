

function demoBox(sample){

    d3.json("samples.json").then((data) => {
        console.log(data);
        var metadata = data.metadata;
        var array = metadata.filter(sampleObject => sampleObject.id == sample);
        var arrayItems = array[0];
        var dataBox = d3.select("#sample-metadata");
        dataBox.html("");
        Object.entries(arrayItems).forEach(([key,value]) => {
            dataBox.append("h6").text(`${key}:${value}`);

        });
    });

}

function init(){
    var selectData = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        var names = data.names;
        names.forEach((sample)=> {
            selectData.append("option").text(sample).property("value",sample);
        });

        var newData = names[0];
        demoBox(newData);   
        updateChart(newData)

    });
}


function onChange(newsample){
    demoBox(newsample);
    updateChart(newsample);
}

function updateChart(sample){

    d3.json("samples.json").then((data) => {
        var participants = data.samples;
        var array = participants.filter(sampleObject => sampleObject.id == sample);
        var results = array[0];
        var sampleValues = results.sample_values;
        var otuLabels = results.otu_labels;
        var sampleIDS = results.otu_ids;


        var trace1 = [{
            x: sampleValues.slice(0,10).reverse(),
            y: sampleIDS.slice(0,10).map(otu=> `OTU ${otu}`).reverse(),
            type:"bar",
            text: otuLabels.slice(0,10).reverse(),
            orientation: "h",

        }];

        var layout = {
            title: "Belly Button OTUs",
        } 
        
        Plotly.newPlot("bar", trace1, layout);
      



        
    
    });




}

init();