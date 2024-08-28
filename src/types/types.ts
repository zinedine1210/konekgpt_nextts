export interface MenusList {
    description: string
    feature: string
    flag: string
    icon: string
    id: string
    name: string
    parent: string
    route: string
    show: boolean
    sortnumber: number
}

export interface StateType<T> {
    isLoading: boolean,
    headers: TableHeader[],
    filter: any[],
    page: number,
    display: number,
    range: {[key: string]: any},
    columns: {[key: string]: any},
    data: T[],
    allData: T[],
    totalCount: number,
    payload: null,
    groupBy: string
    onGet: (refresh?: boolean) => void,
    bulk?: DropdownOptions[]
}

export interface TableHeader {
    label: string
    property: string
    sort?: string
    cssRow?: string
    copy?: string
    cssHead?: string
    status?: any | {[key: string]: string}
}

export interface DialList {
    code: string
    dial_code: string
    name: string
}


export interface DropdownOptions {
    name: string
    icon: string
    action: (id: number | string, index: number) => void
}