import { TableHeader } from "@@/src/types/types"

export const tableIncoming: TableHeader[] = [
    { label: "DATE", property: "transcInCreatedAt", sort: "created_at", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "AGG TRX ID", property: "aggregatorTransactionIDSubstring", cssRow: "whitespace-nowrap select-all", copy: "aggregatorTransactionID" },
    { label: "TRX ID", property: "transactionInUID", cssRow: "select-all", copy: "transactionInUID" },
    { label: "ACC Number", property: "merchantAccountNumber", cssHead: "text-center", cssRow: "text-center select-all", copy: "merchantAccountNumber" },
    { label: "Ref Code", property: "merchantRefCode", cssHead: "whitespace-nowrap" },
    { label: "Curr", property: "currencyCode", cssHead: "text-center", cssRow: "text-center" },
    { label: "Amount", property: "noTranscInAmount", sort: "amount", cssHead: "text-end", cssRow: "text-end font-bold" },
    { label: "NET", property: "transcInNetAmount", sort: "net_amount", cssHead: "text-end", cssRow: "text-end font-bold" },
    { label: "Fee", property: "transcInTotalFee", sort: "total_fee", cssHead: "text-end", cssRow: "text-end font-bold" },
    { label: "Status", property: "paymentStatus", status: 'coba' },
    { label: "Method", property: "paymentMethod" },
]

export const tableDial: TableHeader[] = [
    { label: "CODE", property: "code", sort: "code", copy:"code", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "DIAL", property: "dial_code", sort: "dial_code", copy:"dial_code", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "NAME", property: "name", sort: "name", copy:"name", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
]

export const displayListNumber = [
    { value :10, label:10 },
    { value :20, label:20 },
    { value :30, label:30 },
    { value :40, label:40 },
    { value :50, label:50 },
    { value :60, label:60 },
    { value :70, label:70 }
  ]