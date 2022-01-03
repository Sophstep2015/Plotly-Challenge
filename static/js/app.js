//Function/loop for metadata display for Demographic
function demographic(select){
    d3.json("samples.json").then((data) => {
       let mData = data.metadata;
       console.log(mData)
       let demo = mData.filter(selectObj => selectObj.id == select);
       let demoData = demo[0];
       //listener
       d3.select("#sample-metadata").html(""); 
       Object.entries(demoData).forEach(([key, value]) =>{
            d3.select("#sample-metadata")
            .append("h5").text(`${key}: ${value}`);
       });
   });
}
//Function/loop for Barchart
function barchart(drop)
{
    d3.json("samples.json").then((bdata) => {
        let chart = bdata.samples;
        let barchart = chart.filter(dropObj => dropObj.id == drop);
        let barchart1 = barchart[0];
        //set x and y variables from data for top 10 and descending 
        let y = barchart1.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
        let hovertext = barchart1.otu_labels;
        let x = barchart1.sample_values.slice(0, 10).reverse();
        //Hovertext or Tooltip top ten
        let tooltip = hovertext.slice(0, 10).reverse();
        let horizontalbar = {
            y: y,
            x: x,
            text: tooltip,
            type: "bar",
            orientation: "h"
        }
        Plotly.newPlot("bar", [horizontalbar]);
    });
}
// Bubble Chart function and loop
function bubbles(drop2)
{
    d3.json("samples.json").then((bdata2) => {
        let bchart = bdata2.samples;
        let bubblechart = bchart.filter(drop2Obj => drop2Obj.id == drop2);
        let bubblechart1 = bubblechart[0];  
        let bubbleChart = {
            y: bubblechart1.sample_values,
            x: bubblechart1.otu_ids,
            text: bubblechart1.otu_labels,
            mode:'markers',
            marker: {
                size: bubblechart1.sample_values,
                color: bubblechart1.otu_ids,
            }
        }
        let layout = {
            showlegend: false, 
            hovermode: 'closest' 
        };
        Plotly.newPlot('bubble', [bubbleChart], layout);
    });
}
//function loop for initial load
function initial_load()
{
    let drop = d3.select("#selDataset");
    d3.json("samples.json").then((data) => {
        let names = data.names; 
        console.log(names);
        names.forEach((select) => {
            drop.append("option")
                .text(select)
                .property("value", select);
        }); 
        let display = names[0];
        demographic(display);
        barchart(display)
        bubbles(display)
        console.log(display);
    });
}
//update page when drop down changes 
function optionChanged(change)
{
    demographic(change);
    barchart(change);
    bubbles(change);
}
initial_load();