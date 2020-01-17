/*
 * @Author: your name
 * @Date: 2020-01-14 20:09:22
 * @LastEditTime : 2020-01-16 19:10:45
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \m-tigerprawn-special\src\utils\compress.ts
 */
import Axios from "axios";

export async function compress(files: File[]) {
    const promisArr = files.map(item => new Promise((resolve, reject) => {
        // const fd = new FormData();

        const img = new Image();
        img.src = URL.createObjectURL(item);
        img.onload = e => {
            const w = img.width;
            const h = img.height;
            const quality = .1;
            // 生成canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width=w;
            canvas.height=h;
            ctx!.drawImage(img, 0, 0, w, h);
            const data = canvas.toBlob((Blob)=>{
                new File([Blob!],"img.jpg",{
                    type:"image/jpeg"
                })
                resolve(Blob);
            },"image/jpeg", quality)
            
            // fd.set("base64", data!);
            // fd.set("fileName", item.name);
            // Axios.request({
            //     method: "post",
            //     url: "/safetycontrol/attachment/upload",
            //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            //     data: fd,
            // }).then(res => res.data).then(res => {
            //     if (res.statusCode === 200) {

            //         resolve(res.data as { path: string })
            //     } else {
            //         reject("上传失败" + res.message);
            //     }
            // })

        }
    })
    )
    try {
        return await Promise.all(promisArr) as Blob[];
    } catch (error) {
        return error
    }

}
