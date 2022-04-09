import React, { useCallback, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { data, dataKeys } from './data';
import { IData, IDataKeys } from './interface';


interface ChartsProps {

};

const Charts: React.FC<ChartsProps> = () => {
    const [activeDataIndex, setActiveDataIndex] = useState<number>(0);
    const [activeKeysIndex, setActiveKeysIndex] = useState<number>(0);
    const activeItem: IData = data[activeDataIndex];
    const activeKey: IDataKeys | string = dataKeys[activeKeysIndex];
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
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
        }
    });

    const handleClick = useCallback(
        (entry: any, keysIndex: number, dataIndex: number) => {
            setActiveDataIndex(dataIndex)
            setActiveKeysIndex(keysIndex);
        },
        [setActiveKeysIndex]
    );

    const changeGraph = (e: any) => {
        let changeKeys: any = keys;
        for (let key in changeKeys.keyStatus) {
            if (e.value === key) {
                if (changeKeys.keyStatus[key]) {
                    changeKeys.keyStatus[key] = false;
                    changeKeys.key.splice(changeKeys.key.indexOf(0), 1);
                } else {
                    changeKeys.keyStatus[key] = true;
                    changeKeys.key.push(0);
                }
            }
        }
        console.log(changeKeys)
        setKeys(changeKeys);
    }

    return (
        <div>
            <p>Click each rectangle </p>
            <ResponsiveContainer width="100%" height={600}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend onClick={changeGraph} />
                    {dataKeys.map((item, dataIndex) => {
                        return (
                            <Bar key={item} dataKey={item}>
                                {keys.key.map((entry: any, keysIndex: number) => {
                                    return (
                                        <Cell
                                            onClick={() => handleClick(entry, keysIndex, dataIndex)}
                                            cursor="pointer"
                                            fill={keysIndex === activeKeysIndex && dataIndex === activeDataIndex ? "#8884d8" : colors[keysIndex]}
                                            key={`cell-${keysIndex}`}
                                        />
                                    )
                                })}
                            </Bar>
                        )
                    })}
                </BarChart>
            </ResponsiveContainer>
            <p className="content">{`Amount of "${activeItem.name}": ${activeKey}`}</p>
        </div>
    )
}

export default Charts;