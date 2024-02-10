import Chart from "chart.js/auto";

class ChartView {
  _parentElement = document.querySelector(".home__interior");
  _data;
  _chart;

  addHandlerUpdate(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();

      const form = e.target.closest(".home__chart__form");

      if (!form) return;

      const timePeriod = form.querySelector(".home__chart__form__select").value;

      handler(timePeriod);
    });
  }

  createChart(data) {
    this._data = data;

    this._chart = new Chart(document.getElementById("chart"), {
      type: "line",
      data: {
        labels: this._data.coinTimeStamps,
        datasets: [
          {
            data: this._data.coinPrices,
            label: `Prices for the last ${this._data.period}`,
            borderColor: "#15AF7C",
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }

  updateChart(data) {
    this._removeChartData();
    this._addChartData(data.coinTimeStamps, data.coinPrices);
  }

  _addChartData(labels, newData) {
    labels.forEach((l) => this._chart.data.labels.push(l));
    this._chart.data.datasets[0].data = newData;
    this._chart.update();
  }

  _removeChartData() {
    this._chart.data.labels.splice(0, this._chart.data.labels.length);
    this._chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
    this._chart.update();
  }
}

export default new ChartView();
