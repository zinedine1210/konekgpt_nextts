import axios from "axios";
import cbor from 'cbor';
import { OptionsClient } from "../types/apitypes";

const client = async (urlSuffix: string, options: OptionsClient, abortSignal: AbortSignal) => {
  try {
    const baseUrl = process.env.PUBLIC_API_URL
    
    const defaultHeaders = {
      'Accept': 'application/cbor',
      'Content-Type': 'application/cbor'
    }

    const config = {
      method: options.method || 'get',
      headers: {
        ...defaultHeaders,
        ...options.headers
      },
      responseType: 'arraybuffer',
      signal: abortSignal,
      ...(options?.body && { data: options?.body })
    }
    
    const response = await axios(`${baseUrl}${urlSuffix}`, config)
    response.data = cbor.decode(response.data)

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
