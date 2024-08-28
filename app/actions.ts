'use server'
 
import { cookies } from 'next/headers'
 
export async function deleteCookies(data: any) {
  cookies().delete('name')
}

export async function setCookies(name: string, data: string){
    cookies().set(name, data)
}