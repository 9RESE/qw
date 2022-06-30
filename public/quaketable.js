/* write a table of earthquakes to map page */
function writeQuakeTable(quakes, tableId)
{
    var tab = '';
    var feat = quakes.features;

    for (var i = 0; i < feat.length; i++) {
        if (feat[i].geometry.coordinates[2] < 90 && feat[i].properties.mag >= 4.5 || 
            feat[i].geometry.coordinates[2] >= 90 && feat[i].properties.mag >= 4.0) {
            if (feat[i].geometry.coordinates[2] >= 90) {
                tab += '<tr style = "color:blue;">';
            } else if (feat[i].properties.mag >= 6.0) {
                tab += '<tr style = "color:red;">';
            } else {
                tab += '<tr style = "color:black;">';
            }
    
            date = moment.utc(feat[i].properties.time).format("YYYY-MM-DD HH:mm") + " UTC";
            tab += '<td style="width:26%"> ' + (date) + "</td>";
            tab += '<td style="width:8%"> ' + feat[i].properties.mag + "</td>";
            tab += '<td style="width:10%"> ' + feat[i].geometry.coordinates[2] + "</td>";
            tab += '<td style="width:34%"> ' + feat[i].properties.place + "</td>";
            tab += '<td style="width:11%"> ' + Math.round(feat[i].geometry.coordinates[0]  * 100) / 100 + "</td>";
            tab += '<td style="width:11%"> ' + Math.round(feat[i].geometry.coordinates[1]  * 100) / 100  + "</td>";
            tab += "</tr>";
        }   
    }

    $(tableId).append(tab);
}

/* get last 72 hours of quake data */
var quakeEnd = moment.utc();
var quakeStart = moment(quakeEnd).subtract(72, 'hours')
urlQuake = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=" + quakeStart.format() + "&endtime=" + quakeEnd.format() +"&minmagnitude=3.0"
$.getJSON(urlQuake, function(data) { 
    writeQuakeTable(data, "#quakeList")
 });



