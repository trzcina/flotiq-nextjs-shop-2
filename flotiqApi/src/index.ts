/* tslint:disable */
/* eslint-disable */
/* Flotiq customised */
export * from './runtime';
export * from './apis/index';
export * from './models/index';

import * as runtime from './runtime';
import * as Api from './apis/index';

const hydrateMiddleware =  async ctx => {
    
    if(ctx.init.method == 'GET'){

      if(ctx.url.indexOf('?') >0){
        ctx.url = ctx.url + '&hydrate=1';
      } else{
        ctx.url = ctx.url + '?hydrate=1';
      }

    }

    return {
        ...ctx,
        init: {
            ...ctx.init,
        }
    }
};

export class FlotiqApi {
    public MediaInternalAPI : Api.MediaInternalAPI;
    public ProductAPI : Api.ProductAPI;
    public TagInternalAPI : Api.TagInternalAPI;

    constructor(key){
        const configParameters: runtime.ConfigurationParameters = {
            apiKey: key
        };
        const configuration = new runtime.Configuration(configParameters);
        this.MediaInternalAPI = new Api.MediaInternalAPI(configuration);
        this.MediaInternalAPI = this.MediaInternalAPI.withPreMiddleware( hydrateMiddleware );
        this.ProductAPI = new Api.ProductAPI(configuration);
        this.ProductAPI = this.ProductAPI.withPreMiddleware( hydrateMiddleware );
        this.TagInternalAPI = new Api.TagInternalAPI(configuration);
        this.TagInternalAPI = this.TagInternalAPI.withPreMiddleware( hydrateMiddleware );
    }
}