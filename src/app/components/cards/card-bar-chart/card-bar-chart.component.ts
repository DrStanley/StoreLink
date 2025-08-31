import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-card-bar-chart",
  templateUrl: "./card-bar-chart.component.html",
})
export class CardBarChartComponent implements OnInit, AfterViewInit {
  constructor() { }

  ngOnInit() { }
  ngAfterViewInit() {
    let config = {
      type: "bar",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: "#ed64a6",
            borderColor: "#ed64a6",
            data: [30, 78, 56, 34, 100, 45, 13],
            fill: false,
            barThickness: 8,
          },
          {
            label: new Date().getFullYear() - 1,
            fill: false,
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: [27, 68, 86, 74, 10, 4, 87],
            barThickness: 8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Orders Chart",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          x: {
            beginAtZero: true,
            display: false,
            title: {
              display: true,
              text: "Month",
              color: "white"
            },
            grid: {
              borderDash: [2],
              borderDashOffset: 2,
              color: "rgba(33, 37, 41, 0.3)",
              zeroLineColor: "rgba(33, 37, 41, 0.3)", // v2 option, replaced below
              zeroLineBorderDash: [2],               // v2 option, removed
              zeroLineBorderDashOffset: [2]          // v2 option, removed
            }
          },
          y: {
            beginAtZero: true,
            display: true,
            title: {
              display: false,
              text: "Value",
              color: "white"
            },
            grid: {
              borderDash: [2],
              borderDashOffset: 2,
              drawBorder: false,
              color: "rgba(33, 37, 41, 0.2)",
              zeroLineColor: "rgba(33, 37, 41, 0.15)", // v2 option, replaced below
              zeroLineBorderDash: [2],                // v2 option, removed
              zeroLineBorderDashOffset: [2]           // v2 option, removed
            }
          }
        },
      },
    } as any;
    let ctx: any = document.getElementById("bar-chart");
    ctx = ctx.getContext("2d");
    new Chart(ctx, config);
  }
}
