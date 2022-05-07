import { useState } from "react";
import { GraphTypes, IData, Legends } from "../graph/interface";
import HorizontalBarGraph from "../graph/HorizontalBarGraph";
import VerticalBarGraph from "../graph/VerticalBarGraph";
import LegendRow from "../graph/LegendRow";
import { Select } from "antd";

interface ModalGraphProps {
  data: IData[];
  legend: Legends;
  onLegendItemClick: (key: string) => void;
  controlRow?: any;
}

const ModalGraph = ({ data, legend, onLegendItemClick, controlRow }: ModalGraphProps) => {
  const [graphType, setGraphType] = useState<GraphTypes> ("bars");
  const filteredLegend = Object.entries(legend || {}).filter(([key, item]: any) => item.visible);

  return (<>
    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
      <Select value={graphType} onChange={(value) => setGraphType(value as GraphTypes)}>
          <Select.Option value="bars">גרף עומד</Select.Option>
          <Select.Option value="bars-rotated">גרף שוכב</Select.Option>
      </Select>
      {controlRow || null}
    </div>
    {graphType === "bars" ? (
      <HorizontalBarGraph graphData={data} legend={filteredLegend} onBarClick={(e:any) => {}} height={300} />
    ) : (
      <VerticalBarGraph graphData={data} legend={filteredLegend} onBarClick={(e:any) => {}} />
    )}
    <LegendRow legend={legend} onItemClick={onLegendItemClick} />
  </>);
};

export default ModalGraph;
