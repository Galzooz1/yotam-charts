export interface IData {
    id:          number;
    nkObject:        number | null;
    type:        string;
    name:         string;
    barcode:        string;
    category:        string;
    amount:       number;
    returns:         number;
    total_money: number;
    visitTime:      number;
    city:         string[];
    agent:         string[];
    sub:         any[];
}

export interface IDataKeys {
    amount:       number;
    returns:         number;
    total_money: number;
    visitTime:      number;
}