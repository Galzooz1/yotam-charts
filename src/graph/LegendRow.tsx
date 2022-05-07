import { Legends } from "./interface";

interface LegendRowProps {
  legend: Legends;
  onItemClick: (key: string) => void
}

const LegendRow = ({legend, onItemClick}: LegendRowProps) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%", margin: "12px auto", }}>
      {Object.entries(legend).map(([key, item]: any) => (
        <div onClick={() => onItemClick(key)} style={{ margin: "0 15px", display: "flex", alignItems: "center", cursor: 'pointer' }} key={key}>
          <div style={{ width: "15px", height: "15px", marginLeft: "4px", backgroundColor: item.color, }} />
          {item.name}
        </div>
      ))}
    </div>
  )
}

export default LegendRow;