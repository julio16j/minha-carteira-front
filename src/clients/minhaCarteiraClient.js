import CreateAxiosInstance from "./config/axiosFactoryConfig"
const MinhaCarteiraClientInstance = CreateAxiosInstance(process.env.MINHA_CARTEIRA_BASE_URL)
export default MinhaCarteiraClientInstance
