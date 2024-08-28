export interface OptionsClient {
    body ?: string | any,
    method?: string,
    headers?: {[key: string]: any}
}

export interface ResponseData {
    success: boolean,
    message: string,
    status: number | string,
    data: any
}