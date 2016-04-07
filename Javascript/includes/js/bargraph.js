var script = document.createElement('script');
script.src = 'http://d3js.org/d3.v3.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('body')[0].appendChild(script);

var margin = {top: 100, right: 20, bottom: 30, left: 100},
width = 1024 - margin.left - margin.right,
height = 600 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
  .rangeRoundBands([0, width], .40);

var y = d3.scale.linear()
  .range([height, 0]);

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left");

var svg = d3.select('body').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id","bar")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function barGraph(jsonFile,title){
  d3.select("#stack").remove();
  if(title=='AGGREGATED COMMERCIAL CROP VS YEAR'){
    svg.selectAll('svg > g > *').remove();
    svg.append("text")
      .attr("transform", "translate(200,-50)")
      .style("font-size","20px")
      .text(title);

    d3.json(jsonFile, function(error, data) {
      if (error) throw error;
      x.domain(data.map(function(d) {
        return d.Year; }));
      y.domain([0, d3.max(data, function(d) {
        return d.Production; })]);

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
          .style("text-anchor", "start")
          .attr("font-size","10px")
          .attr("transform","rotate(-6)translate(-15,10)");

      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .style("font-size","16px")
          .text("Production(in mn Ton)");

      svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.Year); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.Production); })
        .attr("height", function(d) { return height - y(d.Production); });
      });
  }else if(title=='FOODGRAIN CROP VS PRODUCTION'){
        svg.selectAll('svg > g > *').remove();
        svg.append("text")
          .attr("transform", "translate(200,-50)")
          .style("font-size","20px")
          .text(title);

        d3.json(jsonFile, function(error, data) {
          if (error) throw error;
          data.sort(function(a,b){return b.Production - a.Production;});
          x.domain(data.map(function(d) {
            return d.Particulars; }));
            y.domain([0, d3.max(data, function(d) {
              return d.Production; })]);

              svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis)
              .selectAll("text")
              .style("text-anchor", "start")
              .attr("font-size","10px")
              .attr("transform","rotate(-6)translate(-15,10)");

              svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
              .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .style("font-size","16px")
              .text("Production(in mn Ton)");

              svg.selectAll(".bar")
              .data(data)
              .enter().append("rect")
              .attr("class", "bar")
              .attr("x", function(d) { return x(d.Particulars); })
              .attr("width", x.rangeBand())
              .attr("y", function(d) { return y(d.Production); })
              .attr("height", function(d) { return height - y(d.Production); });
            });
    }
    else if(title=='OILSEED PRODUCTION VS YEAR'){
          svg.selectAll('svg > g > *').remove();

          svg.append("text")
            .attr("transform", "translate(200,-50)")
            .style("font-size","20px")
            .text(title);

          d3.json(jsonFile, function(error, data) {
            if (error) throw error;
            data.sort(function(a,b){return b.Production - a.Production;});
            x.domain(data.map(function(d) {
              return d.Particulars; }));
              y.domain([0, d3.max(data, function(d) {
                return d.Production; })]);

                svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor", "start")
                .attr("font-size","11px")
                .attr("transform","rotate(-5)translate(-60,5)");

                svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .style("font-size","16px")
                .text("Production(in mn Ton)");

                svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return x(d.Particulars); })
                .attr("width", x.rangeBand())
                .attr("y", function(d) { return y(d.Production); })
                .attr("height", function(d) { return height - y(d.Production); });
              });

    }
  }
  function type(d) {
    d.Production = +d.Production;
    return d;
  }
