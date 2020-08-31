import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { loadReportsInit } from "./store/actions";
import { Report } from "./store/report-state";
import { selectReports } from "./store/selectors";

interface Props {
  year: number;
}

function GraphComponent(props: Props) {

  const dispatch = useDispatch();
  const person = useSelector((state: RootState) => state.person);
  const reports: Report[] = useSelector((state: RootState) => selectReports(state));

  useEffect(() => {
    dispatch(loadReportsInit(person.id as string, props.year));
  }, [dispatch, person, props.year]);

  const getHighChartsOptions = () => {
    return {
      chart: {
        type: "spline"
      },
      title: {
        text: ""
      },
      xAxis: {
        categories: reports.map(report => report.month.substring(0, 3))
      },
      yAxis: {
        title: {
          text: ""
        },
        labels: {
          enabled: false
        },
        gridLineWidth: 0
      },
      tooltip: {
        shared: true,
        valueSuffix: " hours"
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        areaspline: {
          fillColor: {
            linearGradient: { x1: 1, y1: 1, x2: 0, y2: 0 },
            stops: [
              [0, "#C4C4C4"],
              [1, "#ffffff"]
            ]
          },
          marker: {
            radius: 2
          },
          lineWidth: 2,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          threshold: null
        }
      },
      series: [
        {
          color: "#C4C4C4",
          type: "areaspline",
          name: "Working norm",
          data: reports.map(report => report.norm)
        },
        {
          color: "#B22525",
          name: "Worked hours",
          data: reports.map(report => report.hours)
        }
      ]
    };
  }

  const options = getHighChartsOptions();

  return (
    <div className="graph-component">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}


export default GraphComponent;