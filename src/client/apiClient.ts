import axios from "axios";
import { OptionsClient } from "../types/apitypes";

const client = async (urlSuffix: string, options: OptionsClient, abortSignal: AbortSignal) => {
  try {
    const baseUrl = process.env.PUBLIC_API_URL
    
    const defaultHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    const config = {
      method: options.method || 'get',
      headers: {
        ...defaultHeaders,
        ...options.headers
      },
      signal: abortSignal,
      ...(options?.body && { data: options?.body })
    }
    
    const response = await axios(`${baseUrl}${urlSuffix}`, config)
    if (response.status === 200) {
      return response.data
    }
    throw response
  } catch (error: any) {
    if(error.hasOwnProperty("code") && error.code == "ERR_CANCELED"){
        return {"status": -1, "data": "Timeout" }
    }
    return {
      success: false,
      data: null,
      status: 404,
      message: error.message
    }
  }
}

export default client
