import Geolocation from '@react-native-community/geolocation'

export async function getPosition() {
  return new Promise((res, rej) => {
    Geolocation.getCurrentPosition(res, rej)
  })
}
