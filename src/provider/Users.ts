import {Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { ApiService } from "./api-service";

@Injectable()
export class Users {

    constructor(
        private storage: Storage,
        private api: ApiService,
    ) {

    }
    /**
     * 获取用户的登录TOKEN
     */
    token(): Promise<any> {
        return new Promise((resolve) => {
            this.storage.get('agent.token').then( val => {
                console.log(val);
                // resolve('aed672e8bbe94206995a78dc6cd6ed1b'); // 后台wmarshx用户的Token aed672e8bbe94206995a78dc6cd6ed1b
                // resolve('999ea21a1ce04e0497c4f0f69d2ed5d9'); // 本地测试
                resolve(val)
            } );
        });
    }

    login(agent) {
        return new Promise((resolve, reject) => {
            this.api.POST('agent/login', agent, '登录中...')
                .then(res => {
                    if (res && res['data']) {
                        let token = res['data']['token'];
                        this.storage.set('agent.token', token)
                            .then(() => {
                                resolve(true);
                            });
                    } else {
                        reject('不正确的结果');
                    }
                })
                .catch(error => reject(error));
        });
        
    }

    /**
     * 保存用户登录TOKEN
     * @param token 
     */
    saveToken(token: string): Promise<any> {
        return this.storage.set('token', token);
    }

    bindAuth(code: string, provider: string, rid): Promise<any> {
        return this.api.POST('u/auth_bind', { code: code, provider: provider, rid });
    }

    GetAuthUrl(url): Promise<any> {
        return this.api.GET('u/auth', { url: url });
    }

    GetUserProfile() {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                this.api.GET('agent/me', { token: token })
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
            .catch(error => {});
            // 
        });
    }

    logout(): Promise<any> {
        return this.storage.remove('agent.token');
    }

    GetTrades(pageNo: number, pageSize: number = 20) {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                const flag = pageNo === 1;
                this.api.GET('user/trades', { token: token, page: pageNo, size: pageSize }, '正在加载', flag)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
            .catch(error => {});
            // 
        });
    }
}