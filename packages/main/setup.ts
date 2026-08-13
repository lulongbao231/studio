import { getUserDataPath, makeFolder } from "eez-studio-shared/util-electron";
import { EXTENSIONS_FOLDER_NAME } from "eez-studio-shared/conf";
import { loadExtensions } from "eez-studio-shared/extensions/extensions";

// 主进程启动后初始化：准备用户扩展目录并加载内置扩展。
export async function setup() {
    const extensionsFolderPath = getUserDataPath(EXTENSIONS_FOLDER_NAME);
    await makeFolder(extensionsFolderPath);

    loadExtensions([]);
}
