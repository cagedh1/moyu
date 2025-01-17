import { ApidocDetail } from "@@/global";
import { ApidocMockState, ApidocMockMapInfo } from "@@/store"
import { uniqueByKey } from "@/helper/index"
import config from "@/../config/config"
import { store } from "../index";
// import { apidocCache } from "@/cache/apidoc";
// import { router } from "@/router/index"

const mock = {
    namespaced: true,
    state: {
        mockServerPort: config.renderConfig.mock.port,
        urlMap: [],
    },
    mutations: {
        //改变mock映射
        changeMockUrlMap(state: ApidocMockState, payload: ApidocMockMapInfo[]): void {
            state.urlMap = uniqueByKey(state.urlMap.concat(payload), "id")
        },
        //新增一条mock映射
        addMockUrl(state: ApidocMockState, payload: ApidocMockMapInfo): void {
            state.urlMap.push(payload);
        },
        //改变当前mock映射
        changeCurrentMockUrl(state: ApidocMockState, payload: { id: string, apidoc: ApidocDetail }): void {
            const index = state.urlMap.findIndex(v => v.id === payload.id);
            if (index !== -1) {
                state.urlMap[index] = {
                    id: payload.apidoc._id,
                    projectId: payload.apidoc.projectId,
                    url: payload.apidoc.item.url.path,
                    method: payload.apidoc.item.method
                }
            } else {
                state.urlMap.push({
                    id: payload.apidoc._id,
                    projectId: payload.apidoc.projectId,
                    url: payload.apidoc.item.url.path,
                    method: payload.apidoc.item.method
                });
            }
        },
        //改变mock端口
        changeMockServerPort(state: ApidocMockState, port: number): void {
            store.commit("apidoc/apidoc/changeApidocHost", `http://${config.renderConfig.mock.ip}:${port}`);
            // console.log(router.currentRoute.value)
            // apidocCache.setPreviousServer(router.currentRoute.value.query.id as string, `http://${config.renderConfig.mock.ip}:${port}`);
            state.mockServerPort = port;
        },
    },
}

export { mock }
