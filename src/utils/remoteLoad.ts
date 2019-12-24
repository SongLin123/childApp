/*
 * @Author: your name
 * @Date: 2019-12-19 10:54:39
 * @LastEditTime : 2019-12-19 10:56:07
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tiger-prawn-mobile-mbhand\src\utils\remoteLoad.ts
 */
export default function remoteLoad(url: string, hasCallback?: () => void) {
    return createScript(url)
    /**
     * 创建script
     * @param url
     * @returns {Promise}
     */
    function createScript(url: string) {
        let scriptElement = document.createElement('script')
        document.body.appendChild(scriptElement)
        let promise = new Promise((resolve, reject) => {
            scriptElement.addEventListener('load', e => {
                removeScript(scriptElement)
                if (!hasCallback) {
                    resolve(e)
                }
            }, false)

            scriptElement.addEventListener('error', e => {
                removeScript(scriptElement)
                reject(e)
            }, false)

            if (hasCallback) {
                (window as any).____callback____ = function () {
                    resolve();
                    (window as any).____callback____ = null
                }
            }
        })

        if (hasCallback) {
            url += '&callback=____callback____'
        }

        scriptElement.src = url

        return promise
    }

    /**
     * 移除script标签
     * @param scriptElement script dom
     */
    function removeScript(scriptElement: HTMLElement) {
        document.body.removeChild(scriptElement)
    }
}
