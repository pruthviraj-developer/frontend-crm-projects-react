export interface FiltersOption {
    display: string;
    id?: string | number;
    currencyCode?: string;
    key?: string | number;
    value: string | number;
    first?: string;
    second?: string;
}

export interface Ilist {
    key:string,
    options: Array<FiltersOption>;
}

export interface IHsChips {
    objectsList:Array<any>
    updateRemovedFilters?:(a:any) => void;
}