'use client'
import { useGlobalContext } from "@@/src/context/GlobalContext";
import { useCallback, useEffect } from "react"
import { tableTraining } from "@@/src/constant/table";
import { StateType } from "@@/src/types/types";
import Datatable from "../../components/Datatable/Datatable";
import { getTraining } from "@@/src/hooks/CollectionAPI";
import { TrainingType } from "./lib/types";
import { TrainingDataModel } from "./lib/model";

export default function TrainingPage() {
  const { state, setState } = useGlobalContext();
  const statename = 'training'
  

  const initialMount = useCallback(async () => {
    const result = await getTraining()
    const value: TrainingDataModel[] = TrainingDataModel.toDatatableResponse(result.data)
    // console.log(value[0])
    const total = value.length
    let defaultValue: StateType<TrainingType> = {
      isLoading: false,
      headers: tableTraining,
      filter: [],
      page: 1,
      display: 10,
      range: {},
      columns: [{ data:"created_at", dir:"desc" }],
      data: [],
      allData: [],
      totalCount: 0,
      payload: null,
      groupBy: "t_ie_ca",
      onGet: () => {
        
      },
      bulk: [
        {
          name: 'Delete',
          icon: 'ph:trash',
          action: (id, index) => {
            console.log(id, index)
          }
        }
      ]
    }
    setState({ ...state, [statename]: { ...defaultValue, data: value, totalCount: total }})
  }, [state, setState])

  useEffect(() => {
    if(!state?.[statename]){
      initialMount()
    }
  }, [initialMount, state])

  const dataState: StateType<TrainingType> | null = state?.[statename] ?? null

  return (
    <div className="w-full h-full p-5">
      <h1 className="font-bold text-xl">Training Data</h1>
      <p className="text-zinc-600">Input your file business here to create knowledge</p>

      <div className="py-10">
        {
          dataState && <Datatable statename={statename} />
        }
      </div>
    </div>
  )
}
