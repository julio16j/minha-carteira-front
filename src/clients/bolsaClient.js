import CreateAxiosInstance from "./config/axiosFactoryConfig"
const BolsaClientInstance = CreateAxiosInstance(process.env.BRAPI_BASE_URL)
export default BolsaClientInstance
