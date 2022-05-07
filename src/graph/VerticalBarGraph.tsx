import { useCallback } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList } from "recharts";
import FileSaver from "file-saver";
import { useCurrentPng } from "recharts-to-png";
import { GraphProps } from "./interface";
import { Button } from "antd";
import { LoadingOutlined, DownloadOutlined } from '@ant-design/icons';

const VerticalBarGraph = ({graphData, legend, onBarClick}: GraphProps) => {
  const [getComposedPng, { ref, isLoading }] = useCurrentPng();
  
  const handleComposedDownload = useCallback(async () => {
    const png = await getComposedPng();
    if (png)  FileSaver.saveAs(png, "composed-chart.png");
  }, [getComposedPng]);

  return (
    <div>
      <div style={{direction: "ltr"}}>
        <ResponsiveContainer width="100%" height={graphData.length * 100}>
          <BarChart data={graphData} ref={ref} layout={"vertical"}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis reversed={true} type={"number"} dataKey={undefined} />
            <YAxis orientation="right" type={"category"} dataKey={"name"} />
            {legend.map(([key, item]: any) => {
              return (
                <Bar key={key} dataKey={key} onClick={onBarClick} cursor="pointer" fill={item.color}>
                  <LabelList dataKey={key} />
                </Bar>
              );
            })}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <Button disabled={isLoading} icon={isLoading ? <LoadingOutlined /> : <DownloadOutlined />} onClick={handleComposedDownload}>שמור כתמונה</Button>
      </div>
    </div>
  );
};

export default VerticalBarGraph;