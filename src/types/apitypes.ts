export interface OptionsClient {
    body ?: string,
    method: string,
    headers: {[key: string]: any}
}

export interface ResponseData {
    success: boolean,
    message: string,
    status: number | string,
    data: any
}