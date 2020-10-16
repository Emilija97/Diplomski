import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftArrow from "../../assets/images/left-arrow.png";
import RightArrow from "../../assets/images/right-arrow.png";
import ButtonToggle from "../../shared/button-toggle/ButtonToggle";
import "../../shared/styles/ni-button.scss";
import { RootState } from "../../store/store";
import GraphComponent from "./GraphComponent";
import "./performance.scss";
import { loadReportsInit } from "../../reports/store/actions";
import { Report } from "../../reports/store/report-state";
import { selectReports, selectReportsByYear } from "../../reports/store/selectors";

function PerformancePage() {
  const [year, setYear] = useState(new Date().getFullYear());
  const yearsMap = new Map<string, string>();
  yearsMap.set("currentYear", "Year");
  yearsMap.set("previousYear", "Previous years");
  const [selectedYear, setSelectedYear] = useState("currentYear");

  const dispatch = useDispatch();
  const person = useSelector((state: RootState) => state.person);
  const reports: Report[] = useSelector((state: RootState) => selectReportsByYear(state));

  useEffect(() => {
    if (person.id)
      dispatch(loadReportsInit(person.id as string, year));
  }, [dispatch, person, year]);

  const nextYear = () => {
    if (year < (new Date().getFullYear() - 1)) {
      setYear(year + 1);
    }
  };

  const selectedYearChange = (yearValue: string) => {
    setSelectedYear(yearValue);
    if (yearValue === "currentYear")
      setYear(new Date().getFullYear());
    else setYear(new Date().getFullYear() - 1);
  }

  return (
    <div className="performance">
      <p className="performance__title">Billable hours</p>

      <ButtonToggle
        buttonToggleMap={yearsMap}
        initState={selectedYear}
        onSelectClick={selectedYearChange}
      />

      {selectedYear === "currentYear" ? ("") : (
        <div className="performance__chose-year">
          <button
            className="ni-button ni-button__text ni-button__text--transparent"
            onClick={() => {
              setYear(year - 1);
            }}
          >
            <img alt="" src={LeftArrow}></img>
          </button>

          <label>{year}</label>

          <button
            className="ni-button ni-button__text ni-button__text--transparent"
            onClick={() => nextYear()}
          >
            <img alt="" src={RightArrow}></img>
          </button>
        </div>
      )}

      {reports.length === 0 ? "" : <GraphComponent year={year} />}

      <p className="performance__title">Reports for {year}</p>

      <div className="performance__months-report">
        <div className="performance__months-report-header">
          <p className="performance__months-report-header-text">MONTH</p>
          <p className="performance__months-report-header-text">NORM</p>
          <p className="performance__months-report-header-text">HOURS</p>
        </div>
        {reports.map(report => {
          return (
            <div className="performance__months-report-item" key={report.month}>
              <p className=" performance__months-report-text performance__months-report-text--first-column">
                {report.month}
              </p>

              <p className="performance__months-report-text">{report.norm}</p>

              <p className="performance__months-report-text">{report.hours}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PerformancePage;
