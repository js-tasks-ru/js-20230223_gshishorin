export default class ColumnChart {
  chartHeight = 50;

  constructor({
    data = [],
    label = "",
    value = 0,
    link = "",
    formatHeading = (data) => data,
  } = {}) {
    this.data = data;
    this.label = label;
    this.value = formatHeading(value);
    this.link = link;

    this.render();
  }

  get template() {
    return `
      <div class="column-chart" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
            Total ${this.label}
            ${this.getLink()}
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">${
            this.value
          }</div>
          <div data-element="body" class="column-chart__chart">
            ${this.getColumnElements()}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.template;
    this.element = wrapper.firstElementChild;
    if (!this.data.length) {
      this.element.classList.add("column-chart_loading");
    }
  }

  getLink() {
    return this.link
      ? `<a class="column-chart__link" href="${this.link}">View all</a>`
      : "";
  }

  getColumnElements() {
    if (this.data.length > 0) {
      const columnBody = [];
      const columnProps = this.getColumnProps(this.data);
      for (let prop of columnProps) {
        columnBody.push(
          `<div style="--value: ${prop.value}" data-tooltip="${prop.percent}"></div>`
        );
      }
      return columnBody.join("");
    }
  }

  getColumnProps(data) {
    const maxValue = Math.max(...data);
    const scale = 50 / maxValue;

    return data.map((item) => {
      return {
        percent: ((item / maxValue) * 100).toFixed(0) + "%",
        value: String(Math.floor(item * scale)),
      };
    });
  }

  update(data) {
    if (this.data.length) {
      this.data = data;
    }
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
  }
}
