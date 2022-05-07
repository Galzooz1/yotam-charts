import { useEffect, useState } from "react";
import { data as mockData, mockLegend } from "./data";
import {Button, Modal, Select} from 'antd';
import { GraphTypes, IData, Legends } from "./interface";
import ModalGraph from "../modal";
import HorizontalBarGraph from "./HorizontalBarGraph";
import VerticalBarGraph from "./VerticalBarGraph";
import LegendRow from "./LegendRow";
import _ from 'lodash';
import { ShrinkOutlined, ExpandAltOutlined } from '@ant-design/icons';
import "./index.css";

const Index = () => {
  const [data, setData] = useState<IData[]>(mockData);
  const [subData, setSubData] = useState([]);
  const [subLegend, setSubLegend] = useState({});
  const [graphType, setGraphType] = useState<GraphTypes> ("bars");
  const [legend, setLegend] = useState<Legends>({});
  const [fullscreenModal, setFullscreenModal] = useState(false);
  
  // צריך לטעון את המידע לכאן
  const loadData = async () => {
    setLegend(mockLegend);
    setData(mockData);
  }

  // Load the data when the component is first loaded
  useEffect(() => {
    loadData()
  }, [])

  // When clicking on a legend item, toggle item visibility on graph
  const toggleVisible = (key: string) => {
    let changeLegend: any = { ...legend };
    changeLegend[key].visible = !changeLegend[key].visible;
    setLegend(changeLegend);
  }

  // When clicking on a bar, open the modal with a graph of the customers
  const openSubGraph = (e: any) => {
    setSubData(e.sub);
    setSubLegend(_.cloneDeep(mockLegend));
  }

  // When clicking on a legend item in the modal, toggle item visibility on graph
  const toggleSubGraphVisible = (key: string) => {
    let changeLegend: any = { ...subLegend };
    changeLegend[key].visible = !changeLegend[key].visible;
    setSubLegend(changeLegend);
  }

  const ToggleFullScreen = <Button icon={fullscreenModal ? <ShrinkOutlined /> : <ExpandAltOutlined />} onClick={() => setFullscreenModal(!fullscreenModal)}/>;

  const filteredLegend = Object.entries(legend).filter(([key, item]: any) => item.visible);

  return (
    <div className="container">
      <div className="graphContainer">
        <div>
          <h2>התפלגות מוצרים</h2>
        </div>
        <div>
        <Select value={graphType} onChange={(value) => setGraphType(value as GraphTypes)}>
          <Select.Option value="bars">גרף עומד</Select.Option>
          <Select.Option value="bars-rotated">גרף שוכב</Select.Option>
        </Select>
        </div>
      </div>
      {graphType === "bars" ? (
        <HorizontalBarGraph graphData={data} legend={filteredLegend} onBarClick={openSubGraph} />
      ) : (
        <VerticalBarGraph graphData={data} legend={filteredLegend} onBarClick={openSubGraph} />
      )}
      <LegendRow legend={legend} onItemClick={toggleVisible} />
      <Modal title={"מידע על לקוחות"} visible={!!subData.length} onCancel={() => setSubData([])} closeIcon={<></>} okButtonProps={{style: {display: 'none'}}} cancelText="סגור" width={fullscreenModal ? '100%' : undefined}>
        <ModalGraph data={subData} legend={subLegend} onLegendItemClick={toggleSubGraphVisible} controlRow={ToggleFullScreen} />
      </Modal>
    </div>
  );
};

export default Index;
