// 多语言配置
const i18nConfig = {
    zh: {
        title: "Reactor Idle 游戏存档修改工具",
        subtitle: "本工具支持游戏存档的解析与修改。官方游戏链接：https://reactoridle.com/、汉化版：https://g8hh.github.io/reactoridle/",
        usageTitle: "📋 使用说明",
        usage1: "存档解析：上传或粘贴游戏存档文件，自动解析并显示游戏数值",
        usage2: "数值修改：在压缩功能区的数值框中修改金钱、科技、奖励时刻等数值",
        usage3: "存档压缩：修改完成后，点击「执行压缩」生成新的游戏存档",
        usage4: "保存使用：复制或下载压缩后的存档，在游戏中导入使用",
        decompressTitle: "🔍 存档解析",
        decompressPlaceholder: "请粘贴需要解压的Base64字符串，或上传文件自动填充...",
        decompressBtn: "执行解压",
        decompressLoading: "正在解压中，请稍候...",
        money: "💰 金钱",
        research: "🔬 科技",
        bonus: "🎁 奖励时刻",
        decompressResult: "请执行解压操作以查看JSON结果",
        copyDecompress: "一键复制解压结果",
        saveDecompress: "保存解压结果为文件",
        clearDecompress: "清空内容",
        compressTitle: "📦 存档制作区",
        syncBtn: "↔️ 同步解压结果",
        compressPlaceholder: "请粘贴需要压缩的字符串/JSON，或上传文件自动填充，也可点击上方按钮同步解压结果...",
        compressBtn: "执行压缩",
        compressLoading: "正在压缩中，请稍候...",
        copyCompress: "一键复制游戏存档",
        saveCompress: "下载压缩结果文件",
        clearCompress: "清空内容",
        footer: "本页面由 AI 工具辅助生成",
        copied: "已复制到剪贴板",
        js: {
            inputRequired: "请先输入或上传需要解压的内容！",
            decompressFailed: "解压失败：输入内容可能不是有效的Base64压缩字符串。",
            invalidArrayFormat: "非预期的数组格式！",
            decompressRequired: "请先执行解压操作以获取数据！",
            jsonParseError: "JSON格式错误，请检查输入内容！",
            invalidJsonFile: "文件内容不是有效的JSON格式",
            jsonParseSuccess: "JSON解析成功，数值已同步！",
            decompressSuccess: "解压成功！",
            compressSuccess: "压缩成功！",
            valueSaved: "数值已保存！",
            syncSuccess: "解压结果已同步！",
            copySuccess: "复制成功！",
            saveSuccess: "保存成功！",
            defaultResult: "请执行解压操作以查看JSON结果",
            compressParseError: "压缩数据失败",
            syncDecompressRequired: "请先执行解压操作以同步数据！",
            syncDecompressSuccess: "解压结果已同步！",
            compressInputRequired: "请先输入或上传需要压缩的内容！",
            compressFailed: "压缩失败。",
            compressUnknownType: "未知类型，无法压缩。",
            compressIndexNegative: "索引位置不能为负数！",
            saveFailed: "保存失败！",
            copyFailed: "复制失败！",
            fillCompressValuesFailed: "填充压缩数值失败！",
            updateJSONFailed: "更新JSON失败！"
        }
    },
    en: {
        title: "Reactor Idle Game Save Editor",
        subtitle: "This tool supports parsing and editing game save files. Official game: https://reactoridle.com/, Chinese version: https://g8hh.github.io/reactoridle/",
        usageTitle: "📋 Usage Guide",
        usage1: "Save Parsing: Upload or paste game save files to automatically parse and display game values",
        usage2: "Value Editing: Modify Money, Research, Bonus Ticks and other values in the compression area",
        usage3: "Save Compression: After editing, click 'Compress' to generate a new game save file",
        usage4: "Save & Use: Copy or download the compressed save file for import into the game",
        decompressTitle: "🔍 Save Parsing",
        decompressPlaceholder: "Paste game save string to decompress, or upload file to auto-fill...",
        decompressBtn: "Decompress",
        decompressLoading: "Decompressing, please wait...",
        money: "💰 Money",
        research: "🔬 Research",
        bonus: "🎁 Bonus Ticks",
        decompressResult: "Please decompress to view JSON result",
        copyDecompress: "One-Click Copy Result",
        saveDecompress: "Save as File",
        clearDecompress: "Clear Content",
        compressTitle: "📦 Save Creation",
        syncBtn: "↔️ Sync Decompressed Result",
        compressPlaceholder: "Paste string/JSON to compress, or upload file, or click above button to sync decompressed result...",
        compressBtn: "Compress",
        compressLoading: "Compressing, please wait...",
        copyCompress: "One-Click Copy Game Save",
        saveCompress: "Download Compressed File",
        clearCompress: "Clear Content",
        footer: "This page is AI-assisted",
        copied: "Copied to clipboard",
        js: {
            inputRequired: "Please input or upload content to decompress first!",
            decompressFailed: "Decompression failed: The input may not be a valid Base64 compressed string.",
            invalidArrayFormat: "Decompression result is not in the expected array format!",
            decompressRequired: "Please perform decompression first to get data!",
            jsonParseError: "JSON format error, please check the input content!",
            invalidJsonFile: "File content is not valid JSON format.",
            jsonParseSuccess: "JSON parsed successfully, values have been synchronized!",
            decompressSuccess: "Decompression successful!",
            compressSuccess: "Compression successful!",
            valueSaved: "Value saved successfully!",
            syncSuccess: "Decompression result synchronized!",
            copySuccess: "Copy successful!",
            saveSuccess: "Save successful!",
            defaultResult: "Please perform decompression to view JSON result",
            compressParseError: "Compression data failed",
            syncDecompressRequired: "Please perform decompression first to sync data!",
            syncDecompressSuccess: "Decompression result synchronized!",
            compressInputRequired: "Please input or upload content to compress first!",
            compressFailed: "Compression failed.",
            compressUnknownType: "Unknown type, cannot compress.",
            compressIndexNegative: "Index position cannot be negative!",
            saveFailed: "Save failed!",
            copyFailed: "Copy failed!",
            fillCompressValuesFailed: "Fill compress values failed!",
            updateJSONFailed: "Update JSON failed!"
        }
    }
};

// 语言切换功能
function setLanguage(lang) {
    if (!i18nConfig[lang]) return;
    
    // 更新页面元素
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (i18nConfig[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = i18nConfig[lang][key];
            } else {
                element.textContent = i18nConfig[lang][key];
            }
        }
    });
    
    // 更新超链接（如果存在）
    const links = document.querySelectorAll('[data-i18n-url]');
    links.forEach(link => {
        const key = link.getAttribute('data-i18n-url');
        if (i18nConfig[lang][key]) {
            link.href = i18nConfig[lang][key];
        }
    });
    
    // 更新按钮状态
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // 保存语言偏好
    localStorage.setItem('preferredLanguage', lang);
    
    // 设置全局语言变量，供JavaScript使用
    window.currentLanguage = lang;
}

// 初始化语言
function initLanguage() {
    const savedLang = localStorage.getItem('preferred-language') || 'zh';
    setLanguage(savedLang);

    // 添加语言切换事件监听
    document.getElementById('lang-zh').addEventListener('click', () => setLanguage('zh'));
    document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguage);
} else {
    initLanguage();
}

// JavaScript国际化辅助函数
function t(key) {
    const lang = window.currentLanguage || 'zh';
    const keys = key.split('.');
    let value = i18nConfig[lang];
    
    for (const k of keys) {
        if (value && value[k] !== undefined) {
            value = value[k];
        } else {
            return key; // 返回键名作为默认值
        }
    }
    
    return value;
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', function() {
    initLanguage();
    
    // 设置全局语言变量
    const savedLang = localStorage.getItem('preferredLanguage') || 'zh';
    window.currentLanguage = savedLang;
});