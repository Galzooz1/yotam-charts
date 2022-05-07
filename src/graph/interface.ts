interface Sub {
  id: number,
  nkObject: number | null,
  type: string,
  name: string,
  barcode: string,
  amount: number,
  returns: number,
  total_money: number,
  visitTime: number,
  sub: any[]
}

export interface IData {
  id: number;
  nkObject: number | null;
  type: string;
  name: string;
  barcode: string;
  category: string;
  amount: number;
  returns: number;
  total_money: number;
  visitTime: number;
  city: string[];
  agent: string[];
  sub: Sub[];
}


export interface Legends {
  [key: string]: Legend
}

export interface Legend {
  name: string;
  color: string;
  visible: boolean;
}

export interface GraphProps {
  graphData: IData[];
  legend: [key: string, data:Legend][];
  onBarClick: (e: any) => void;
  height?: number | string;
}

export type GraphTypes = "bars" | "bars-rotated";