const configLocal = JSON.parse(open('../config/config.local.json'))

export function pegarBaseURL(){
     return __ENV.BAS_URL || configLocal.baseUrl
}