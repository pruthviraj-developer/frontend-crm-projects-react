export default interface MipMskuTableProps {
    tableData : tableDataType,
    accordian?: boolean,
    accordianCount?: number
}

export type tableDataType = Array<Array<string|number|null>>