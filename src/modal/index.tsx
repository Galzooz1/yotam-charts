import Modal from 'react-modal';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import React, {useCallback, useState} from "react";
import {data, dataKeys} from "../graph/data";
import {IData} from "../graph/interface";
import { useCurrentPng } from "recharts-to-png";
import FileSaver from "file-saver";


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        // marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: "60%",
        height: 400
    },
};

Modal.setAppElement('#root')

const ModalGraph = (props: any) => {
    const [myData, setMyData] = useState<IData[]>();
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

    const [getComposedPng, {ref: composedRef, isLoading }] = useCurrentPng();
    const handleComposedDownload = useCallback(async () => {
        const png = await getComposedPng();
        if (png) {
            FileSaver.saveAs(png, "composed-chart.png");
        }
    }, [getComposedPng]);

    function afterOpenModal() {
        setMyData(props.data);
    }


    return (
        console.log("modal", props.data),
        <Modal
            isOpen={props.isOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={props.closeModal}
            style={customStyles}
        >
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={myData} ref={composedRef}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    {/* <Tooltip /> */}
                    {keys.key.map((item: any, dataIndex: any) => {
                        return (
                            <Bar key={item} dataKey={item}
                                 cursor="pointer"
                                 fill={keys.groupColors[item]}
                            >
                                <LabelList dataKey={item} />
                            </Bar>

                        )
                    })}
                </BarChart>
            </ResponsiveContainer>

            <div style={{ display: "flex", justifyContent: "space-evenly", width: "50%", margin: "12px auto" }}>
                {dataKeys.map((item: any) => {
                    return (
                        <div onClick={() => props.changeGraph(item)} style={{ margin: "0 4px", display: "flex", alignItems: "center" }} key={item} >
                            <div style={{ width: "15px", height: "15px", marginRight: "4px", alignSelf: "flex-end", backgroundColor: keys.groupColors[item] }}></div>
                            {item}
                        </div>
                    )
                })}
            </div>

            <button disabled={isLoading} onClick={handleComposedDownload}>
                {isLoading ? (
                    <span className="download-button-content">
              <i className="gg-spinner" />
              <span className="download-button-text">
                <code>Downloading...</code>
              </span>
            </span>
                ) : (
                    <span className="download-button-content">
              <i className="gg-software-download" />
              <span className="download-button-text">
                <code>Download Composed Chart</code>
              </span>
            </span>
                )}
            </button>
        </Modal>
    );
};


export default ModalGraph;
