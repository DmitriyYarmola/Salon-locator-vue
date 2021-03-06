import axios from 'axios'
import { checkExpireDate, getFromLocalStorage, removeAuthData } from '@Components/Lib'
import { getFromSessionStorage } from '@Lib/SessionStorage'

export const createInstance = (refreshToken, googleMaps) => {
    const token = getFromLocalStorage('token') || getFromSessionStorage('token')
    const expirationDate =
        getFromLocalStorage('expiration') || getFromSessionStorage('expiration')
    const isRemember =
        getFromLocalStorage('isRemember') || getFromSessionStorage('isRemember')
    let verifyToken
    if (expirationDate && checkExpireDate(expirationDate)) {
        verifyToken =
            getFromLocalStorage('refreshToken') || getFromSessionStorage('refreshToken')
    } else verifyToken = token
    let headers = {}
    if (refreshToken) headers = { Authorization: `Bearer ${refreshToken}` }
    else if (token && !googleMaps)
        headers = {
            Authorization: `Bearer ${verifyToken}`,
            'Content-Type': 'application/json',
        }

    const instance = axios.create({
        baseURL: googleMaps
            ? 'https://maps.googleapis.com/maps/api/geocode/'
            : process.env.BASE_URL || 'https://api.salonlocator.stage.redentu.com',
        headers,
    })

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            console.log(document.location.pathname)
            if (error.response.status === 401 && document.location.pathname !== '/auth/login') {
                removeAuthData(isRemember).then(() => {
                    document.location.reload()
                    throw error
                })
            }
        }
    )

    return instance
}
