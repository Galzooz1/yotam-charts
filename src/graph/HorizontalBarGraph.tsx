import { useCallback } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList } from "recharts";
import FileSaver from "file-saver";
import { useCurrentPng } from "recharts-to-png";
import { GraphProps } from "./interface";
import { Button } from "antd";
import { LoadingOutlined, DownloadOutlined } from '@ant-design/icons';

const HorizontalBarGraph = ({graphData, legend, onBarClick, height}: GraphProps) => {
  const [getComposedPng, { ref, isLoading }] = useCurrentPng();
  
  const handleComposedDownload = useCallback(async () => {
    const png = await getComposedPng();
    if (png)  FileSaver.saveAs(png, "composed-chart.png");
  }, [getComposedPng]);

  return (
    <div>
      <div style={{direction: "ltr"}}>
        <ResponsiveContainer width="100%" height={height || 600}>
          <BarChart data={graphData} ref={ref} layout={"horizontal"}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis reversed={true} type={"category"} dataKey={"name"} />
            <YAxis orientation="right" type={"number"} dataKey={undefined} />
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

export default HorizontalBarGraph;