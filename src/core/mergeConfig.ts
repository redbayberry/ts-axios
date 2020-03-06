import { AxiosRequestConfig } from "../types";


//config1是默认配置，config2是自定义配置
export default function mergeConfig(
    config1:AxiosRequestConfig,
    config2:AxiosRequestConfig
):AxiosRequestConfig{
    if(!config2){
        config2={}
    }
    const config = Object.create(null);
    for(let key in config2){
        mergeField(key)
    }
    for(let key in config1){
        if(!config2[key]){//如果config2该项没有
            mergeField(key)
        }
    }
    function mergeField(key:string):void{
        const strat = strats[key]||defaultStrat;
        config[key] = strat(config1[key],config2![key])
    }
    return config;
}