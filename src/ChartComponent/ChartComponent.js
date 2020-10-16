import React, { useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js';

function ChartComponent(){
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

    function createChart(){
        var ctx=document.getElementById("myChart").getContext("2d");
        var pieChart=new Chart(ctx,{
            type:"pie",
            data:dataSource
        });
    };

    useEffect(()=>{
        axios.get('http://localhost:3001/budget')
        .then(function(res){
            for(var i=0;i<res.data.myBudget.length;i++){
                dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
                dataSource.labels[i]=res.data.myBudget[i].title;
            }
            createChart();
        })
    })
    return(
        <div> </div>
        );   
}

export default ChartComponent;