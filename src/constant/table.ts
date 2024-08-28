import { TableHeader } from "@@/src/types/types"
import { trainingColorStatus } from "./status"

export const tableDial: TableHeader[] = [
    { label: "CODE", property: "code", sort: "code", copy:"code", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "DIAL", property: "dial_code", sort: "dial_code", copy:"dial_code", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "NAME", property: "name", sort: "name", copy:"name", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
]


export const tableTraining: TableHeader[] = [
    { label: "Knowledge Name", property: "name", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Description", property: "description", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Type", property: "type_training_name", status: trainingColorStatus, cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Prompt", property: "prompt", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "User ID", property: "user_id", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
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