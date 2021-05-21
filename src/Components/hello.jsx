import React, { Component } from "react";
import axios from "axios";
import { Table} from "antd";
import { Bar } from "@ant-design/charts";

export default class Hello extends Component {
  state = {
    countries: [],
    worldData: [],
    chartDatas: [],
  };

  componentDidMount() {
    this.getCoronaDetails();
  }

  getCoronaDetails = () => {
    axios
      .get(`https://coronavirus-19-api.herokuapp.com/countries`)
      .then((res) => {
        console.log(res);

        this.setState({
          countries: res.data,
          worldData: [res.data && res.data[0]],
          chartDatas: res.data && [
            {
              type: "Cases",
              value: res.data[0].cases,
            },
            {
              type: "Deaths",
              value: res.data[0].deaths,
            },
            {
              type: "Recovered",
              value: res.data[0].recovered,
            },
          ],
        });
      });
  };

  render() {
    const { countries, worldData, chartDatas } = this.state;

    var config = {
      data: chartDatas,
      xField: 'value',
      yField: 'type',
      barWidthRatio: 0.3,
      meta: {
        type: { alias: 'inner' },

      },
      interactions: [{ type: "element-selected" }, { type: "element-active" }],
    };
    const column = [
      {
        title: "COUNTRY",
        dataIndex: "country",
        key: "country",
      },
      {
        title: "CASES",
        dataIndex: "cases",
        key: "cases",
      },
      {
        title: "TODAY CASES",
        dataIndex: "todayCases",
        key: "todayCases",
      },
      {
        title: "DEATHS",
        dataIndex: "deaths",
        key: "deaths",
      },
      {
        title: "TODAY DEATHS",
        dataIndex: "todayDeaths",
        key: "todayDeaths",
      },
      {
        title: "RECOVERD",
        dataIndex: "recovered",
        key: "recovered",
      },
    ];
    const columnTotal = [
      {
        title: "CASES",
        dataIndex: "cases",
        key: "cases",
      },
      {
        title: "DEATHS",
        dataIndex: "deaths",
        key: "deaths",
      },
      {
        title: "RECOVERED",
        dataIndex: "recovered",
        key: "recovered",
      },
    ];

    return (

      <div style={{ padding: "10px" }}>
        <Table
          columns={columnTotal}
          dataSource={worldData}
          size="small"
          pagination={false}
        /> <br /><br />
        <Table columns={column} dataSource={countries} size="small" />
        <Bar {...config} />
      </div>

    );
  }
}
