import * as d3 from 'd3';
import React, { useEffect } from 'react';
import axios from 'axios';
//import Chart from 'chart.js';


function D3Component(){
    var dataSource={
        datasets: [
            {
                data: [],
                backgroundColor:[
                    'blue',
                    'green',
                    'red',
                    '#2d545e',
                    "#9df9ef",
                    "#edf756",
                    "gray",
                    "brown",
                    "pink"
                ]
            }
        ],
        labels: []
    };

 /*   function createChart(){
        var ctx=document.getElementById("myChart").getContext("2d");
        var pieChart=new Chart(ctx,{
            type:"pie",
            data:dataSource
        });
    };*/

    useEffect(()=>{
        axios.get('http://localhost:3001/budget')
        .then(function(res){
            for(var i=0;i<res.data.myBudget.length;i++){
                dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
                dataSource.labels[i]=res.data.myBudget[i].title;
            }
    
            var data_budget = [];
    var labels = [];
    var color;

    function getBudget1() {
      axios.get("http://localhost:3001/budget").then(function (res) {
        for (var i = 0; i < res.data.myBudget.length; i++) {
          data_budget.push(res.data.myBudget[i].budget);
          labels.push(res.data.myBudget[i].title);
        }
        color = d3.scale
          .ordinal()
          .domain(labels)
          .range([
            "#ff1d58",
            "#494D5F",
            "#fff685",
            "#00DDFF",
            "#0049B7",
            "#f75990",
            "#ff8c00",
            "#8458B3",
            "#d0743c"
          ]);
        function gend3Data() {
          var labels = color.domain();
          var i = 0;
          return labels.map(function (label) {
            return { label: label, value: data_budget[i++] };
          });
        }
        d3jsChart(gend3Data());
      });
    }
    getBudget1();
    var svg = d3.select("#chart").append("svg").append("g");

    svg.append("g").attr("class", "slices");
    svg.append("g").attr("class", "labels");
    svg.append("g").attr("class", "lines");

    var width = 960,
      height = 450,
      radius = Math.min(width, height) / 2;

    var pie = d3.layout
      .pie()
      .sort(null)
      .value(function (d) {
        return d.value;
      });

    var arc = d3.svg
      .arc()
      .outerRadius(radius * 0.8)
      .innerRadius(radius * 0.4);

    var outerArc = d3.svg
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var key = function (d) {
      return d.data.label;
    };
   

    function d3jsChart(data) {
      var slice = svg
        .select(".slices")
        .selectAll("path.slice")
        .data(pie(data), key);

      slice
        .enter()
        .insert("path")
        .style("fill", function (d) {
          return color(d.data.label);
        })
        .attr("class", "slice");

      slice
        .transition()
        .duration(1000)
        .attrTween("d", function (d) {
          this._current = this._current || d;
          var interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return function (t) {
            return arc(interpolate(t));
          };
        });

      slice.exit().remove();

      /* ------- TEXT LABELS -------*/

      var text = svg.select(".labels").selectAll("text").data(pie(data), key);

      text
        .enter()
        .append("text")
        .attr("dy", ".35em")
        .text(function (d) {
          return d.data.label;
        });

      function midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
      }

      text
        .transition()
        .duration(1000)
        .attrTween("transform", function (d) {
          this._current = this._current || d;
          var interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return function (t) {
            var d2 = interpolate(t);
            var pos = outerArc.centroid(d2);
            pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
            return "translate(" + pos + ")";
          };
        })
        .styleTween("text-anchor", function (d) {
          this._current = this._current || d;
          var interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return function (t) {
            var d2 = interpolate(t);
            return midAngle(d2) < Math.PI ? "start" : "end";
          };
        });

      text.exit().remove();

      /* ------- SLICE TO TEXT POLYLINES -------*/

      var polyline = svg
        .select(".lines")
        .selectAll("polyline")
        .data(pie(data), key);

      polyline.enter().append("polyline");

      polyline
        .transition()
        .duration(1000)
        .attrTween("points", function (d) {
          this._current = this._current || d;
          var interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return function (t) {
            var d2 = interpolate(t);
            var pos = outerArc.centroid(d2);
            pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
            return [arc.centroid(d2), outerArc.centroid(d2), pos];
          };
        });

      polyline.exit().remove();
    };    
    })

    })
    return(
        <div> </div>
        );   
}

export default D3Component;