import React, {useCallback, useState} from 'react';
import './index.css';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ComposedChart,
    ResponsiveContainer,
    LabelList
} from 'recharts';
import {data, dataKeys} from './data';
import {IData, IDataKeys} from './interface';
import ModalGraph from '../modal';
import FileSaver from "file-saver";
import {useCurrentPng} from "recharts-to-png";


interface ChartsProps {

};

const Index: React.FC<ChartsProps> = () => {
    const [myData, setMyData] = useState<IData[]>(data);
    const [subData, setSubData] = useState([]);
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
        groupColors: {
            total_money: '#0088FE',
            amount: '#00C49F',
            returns: '#FFBB28',
            visitTime: '#FF8042',
        }

    });
    const [modalIsOpen, setIsOpen] = useState(false);


    const [getComposedPng, {ref: composedRef, isLoading}] = useCurrentPng();
    const handleComposedDownload = useCallback(async () => {
        const png = await getComposedPng();
        if (png) {
            FileSaver.saveAs(png, "composed-chart.png");
        }
    }, [getComposedPng]);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const createSubData = (e: any) => {
        let Data: any = [];
        const data = e.sub
        for (let i = 0; i < data.length; i++) {
            Data.push(data[i])
        }
        openModal();
        setSubData(Data);
    }

    const changeGraph = (e: any) => {
        let buttonData: any = e;
        let tempData: any = data;
        let changeKeys: any = {...keys};
        if (changeKeys.keyStatus[buttonData]) {
            changeKeys.keyStatus[buttonData] = false;
            changeKeys.key.splice(changeKeys.key.indexOf(buttonData), 1)
        } else {
            changeKeys.keyStatus[buttonData] = true;
            changeKeys.key.push(buttonData);
        }
        setKeys(changeKeys);
    }

    return (
        <div className='container'>
            <div className='graphContainer'>
                <div>
                    <h2>התפלגות מוצרים</h2>
                </div>
                <div className='downloadButtonContainer'>
                    <button className='downloadButton' disabled={isLoading} onClick={handleComposedDownload}>
                        {isLoading ? (
                            <span className="download-button-content">
                                    <i className="gg-spinner"/>
                                    <span className='loader'>
                                    </span>
                                 </span>
                        ) : (
                            <div className='regulardownloadbutton'>
                                <i />
                            </div>
                        )}
                    </button>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={600}>
                <BarChart data={myData} ref={composedRef}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    {/* <Tooltip /> */}
                    {keys.key.map((item: any, dataIndex: any) => {
                        return (
                            <Bar key={item} dataKey={item}
                                 onClick={(e) => createSubData(e)}
                                 cursor="pointer"
                                 fill={keys.groupColors[item]}
                            >
                                <LabelList dataKey={item}/>
                            </Bar>
                        )
                    })}
                </BarChart>
            </ResponsiveContainer>

            <div style={{display: "flex", justifyContent: "space-evenly", width: "50%", margin: "12px auto"}}>
                {dataKeys.map((item: any) => {
                    return (
                        <div onClick={() => changeGraph(item)}
                             style={{margin: "0 4px", display: "flex", alignItems: "center"}} key={item}>
                            <div style={{
                                width: "15px",
                                height: "15px",
                                marginRight: "4px",
                                alignSelf: "flex-end",
                                backgroundColor: keys.groupColors[item]
                            }}></div>
                            {item}
                        </div>
                    )
                })}
            </div>

            <ModalGraph isOpen={modalIsOpen} closeModal={closeModal} data={subData} changeGraph={changeGraph} />
        </div>
    )
}

export default Index;