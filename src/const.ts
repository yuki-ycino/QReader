import Constants from "expo-constants"

export const CLIENT_ID = Constants.manifest.extra ? Constants.manifest.extra.clientId : ""
export const CLIENT_SECRET = Constants.manifest.extra ? Constants.manifest.extra.clientSecret : ""

export const LOGIN_URL = `https://qiita.com/api/v2/oauth/authorize?client_id=${CLIENT_ID}&scope=read_qiita+write_qiita_team&state=`
