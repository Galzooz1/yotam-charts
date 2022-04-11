import React, { useCallback, useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { data, dataKeys } from './data';
import { IData, IDataKeys } from './interface';


interface ChartsProps {

};

const Charts: React.FC<ChartsProps> = () => {
    const [myData, setMyData] = useState<IData[]>(data);
    const [activeDataIndex, setActiveDataIndex] = useState<number>(0);
    const [activeKeysIndex, setActiveKeysIndex] = useState<number>(0);
    const [keys, setKeys] = useState<any>({
        key: [
            'total_money',
            'amount',
            'returns',
            'visitTime',
        ],
        keyStatus: {
            total_money: true,
            amount: true,
            returns: true,
            visitTime: true,
        },
        groupColors:{
            total_money: '#0088FE',
            amount: '#00C49F',
            returns: '#FFBB28',
            visitTime: '#FF8042',
        }

    });

    const activeItem: IData = data[activeDataIndex];
    const activeKey: IDataKeys | string = dataKeys[activeKeysIndex];

    const handleClick = useCallback(
        (entry: any, keysIndex: number, dataIndex: number) => {
            setActiveDataIndex(dataIndex)
            setActiveKeysIndex(keysIndex);
        },
        [setActiveKeysIndex]
    );

    const changeGraph = (e: any) => {
        let buttonData: any = e;
        let tempData: any = data;
        let changeKeys: any = { ...keys };
        console.log(changeKeys)
        if (changeKeys.keyStatus[buttonData]) {
            changeKeys.keyStatus[buttonData] = false;
            changeKeys.key.splice(changeKeys.key.indexOf(buttonData), 1)
        } else {
            changeKeys.keyStatus[buttonData] = true;
            changeKeys.key.push(buttonData);
        }
        console.log(changeKeys)
        setKeys(changeKeys);
    }

    return (
        <div>
            <p>Click each rectangle </p>
            <ResponsiveContainer width="100%" height={600}>
                <BarChart data={myData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    {keys.key.map((item: any, dataIndex: any) => {
                        return (
                            <Bar key={item} dataKey={item}
                                 onClick={() => handleClick(item, dataIndex, dataIndex)}
                                 cursor="pointer"
                                 fill={keys.groupColors[item]}
                            />

                        )
                    })}
                </BarChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", justifyContent: "space-evenly", width: "50%", margin: "12px auto" }}>
                {dataKeys.map((item: any) => {
                    return (
                        <div onClick={() => changeGraph(item)} style={{ margin: "0 4px", borderBottom: `${keys.groupColors[item]} 1px solid`, color:`${keys.groupColors[item]}`}} key={item}>{item}</div>
                    )
                })}
            </div>
            <p className="content">{`Amount of "${activeItem.name}": ${activeKey}`}</p>
        </div>
    )
}

export default Charts;