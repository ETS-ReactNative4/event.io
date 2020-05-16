import Geolocation, {
  GeolocationResponse
} from '@react-native-community/geolocation'

export async function getPosition(): Promise<GeolocationResponse> {
  return new Promise((res, rej) => {
    Geolocation.getCurrentPosition(res, rej)
  })
}
