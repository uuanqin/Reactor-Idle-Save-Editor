// DOM元素引用
const decompressFile = document.getElementById('decompress-file');
const decompressInput = document.getElementById('decompress-input');
const decompressBtn = document.getElementById('decompress-btn');
const decompressLoading = document.getElementById('decompress-loading');
const decompressResult = document.getElementById('decompress-result');
const moneyVal = document.getElementById('money-val');
const researchVal = document.getElementById('research-val');
const bonusVal = document.getElementById('bonus-val');
const copyDecompressBtn = document.getElementById('copy-decompress-btn');
const saveDecompressBtn = document.getElementById('save-decompress-btn');
const clearDecompressBtn = document.getElementById('clear-decompress-btn');
const decompressTips = document.getElementById('decompress-tips');

const compressFile = document.getElementById('compress-file');
const compressInput = document.getElementById('compress-input');
const compressBtn = document.getElementById('compress-btn');
const compressLoading = document.getElementById('compress-loading');
const compressResult = document.getElementById('compress-result');
const copyCompressBtn = document.getElementById('copy-compress-btn');
const saveCompressBtn = document.getElementById('save-compress-btn');
const clearCompressBtn = document.getElementById('clear-compress-btn');
const compressTips = document.getElementById('compress-tips');
const syncBtn = document.getElementById('sync-btn');

// 压缩功能区的数值编辑元素
const moneyInput = document.getElementById('money-input');
const researchInput = document.getElementById('research-input');
const bonusInput = document.getElementById('bonus-input');
const saveMoneyBtn = document.getElementById('save-money');
const cancelMoneyBtn = document.getElementById('cancel-money');
const saveResearchBtn = document.getElementById('save-research');
const cancelResearchBtn = document.getElementById('cancel-research');
const saveBonusBtn = document.getElementById('save-bonus');
const cancelBonusBtn = document.getElementById('cancel-bonus');

// 全局变量
let currentJSONData = null;
let originalValues = { money: 0, research: 0, bonus: 0 };

// 初始化
function init() {
  // 添加事件监听器
  decompressFile.addEventListener('change', handleDecompressFileSelect);
  decompressBtn.addEventListener('click', handleDecompress);
  copyDecompressBtn.addEventListener('click', copyDecompressResult);
  saveDecompressBtn.addEventListener('click', saveDecompressResult);
  clearDecompressBtn.addEventListener('click', clearDecompressContent);

  compressFile.addEventListener('change', handleCompressFileSelect);
  compressBtn.addEventListener('click', handleCompress);
  copyCompressBtn.addEventListener('click', copyCompressResult);
  saveCompressBtn.addEventListener('click', saveCompressResult);
  clearCompressBtn.addEventListener('click', clearCompressContent);
  syncBtn.addEventListener('click', syncDecompressResult);

  // 新增：JSON输入框失焦事件监听
  compressInput.addEventListener('blur', handleCompressInputBlur);

  // 数值编辑事件监听器
  compressMoney.addEventListener('input', handleMoneyInput);
  compressResearch.addEventListener('input', handleResearchInput);
  compressBonus.addEventListener('input', handleBonusInput);

  saveMoneyBtn.addEventListener('click', saveMoney);
  cancelMoneyBtn.addEventListener('click', cancelMoney);
  saveResearchBtn.addEventListener('click', saveResearch);
  cancelResearchBtn.addEventListener('click', cancelResearch);
  saveBonusBtn.addEventListener('click', saveBonus);
  cancelBonusBtn.addEventListener('click', cancelBonus);
}

// 新增：JSON输入框失焦处理函数
function handleCompressInputBlur() {
  const content = this.value.trim();
  if (content) {
    try {
      const jsonData = JSON.parse(content);
      fillCompressValues(jsonData);
      showTips('compress-tips', t('js.jsonParseSuccess') , 'success');
    } catch (error) {
      showTips('compress-tips', t('js.jsonParseError') , 'error');
    }
  }
}

// 解压功能区 - 文件选择处理
function handleDecompressFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      decompressInput.value = e.target.result;
    };
    reader.readAsText(file);
  }
}

// 压缩功能区 - 文件选择处理
function handleCompressFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      compressInput.value = e.target.result;
      try {
        const jsonData = JSON.parse(e.target.result);
        fillCompressValues(jsonData);
      } catch (error) {
        // 不是有效的JSON，可能是Base64字符串
        showTips('compress-tips', t('js.invalidJsonFile'), 'error');
      }
    };
    reader.readAsText(file);
  }
}

// 解压功能区 - 执行解压
function handleDecompress() {
  const input = decompressInput.value.trim();
  if (!input) {
    showTips('decompress-tips', t('js.inputRequired'), 'error');
    return;
  }

  showLoading('decompress-loading');
  clearTips('decompress-tips');

  try {
    // 使用LZString解压
    const decompressed = LZString.decompressFromBase64(input);
    if (!decompressed) {
      throw new Error(t('js.decompressFailed'));
    }

    // 解析JSON
    const jsonData = JSON.parse(decompressed);
    currentJSONData = jsonData;

    // 显示解压结果
    decompressResult.textContent = JSON.stringify(jsonData); // 不使用格式化，去除换行符和空格

    // 填充数值展示
    fillDecompressValues(jsonData);

    // 启用复制和保存按钮
    copyDecompressBtn.disabled = false;
    saveDecompressBtn.disabled = false;

    showTips('decompress-tips', t('js.decompressSuccess'), 'success');
  } catch (error) {
    showTips('decompress-tips',  error.message, 'error');
    decompressResult.textContent =  error.message;
  } finally {
    hideLoading('decompress-loading');
  }
}

// 填充解压结果的数值展示
function fillDecompressValues(jsonData) {
  // 检查JSON数据是否为数组
  if (!Array.isArray(jsonData)) {
    showTips('decompress-tips', t('js.invalidArrayFormat'), 'error');
    return;
  }

  // 修复：修正Research索引位置，添加边界检查
  const arrayLength = jsonData.length;

  // 尝试不同的可能索引位置，增加容错性
  let moneyIndex = arrayLength - 10;
  let researchIndex = arrayLength - 9; // 修正：将Research索引从-11改为-9
  let bonusIndex = arrayLength - 5;

  // 边界检查，确保索引不会为负数
  const money = (moneyIndex >= 0) ? jsonData[moneyIndex] || 0 : 0;
  const research = (researchIndex >= 0) ? jsonData[researchIndex] || 0 : 0;
  const bonus = (bonusIndex >= 0) ? jsonData[bonusIndex] || 0 : 0;

  // 修复大数显示问题：避免对非常大的数字使用toFixed
  moneyVal.textContent = formatLargeNumber(money);
  researchVal.textContent = formatLargeNumber(research);
  bonusVal.textContent = formatLargeNumber(bonus);
}

// 填充压缩功能区的数值输入框
function fillCompressValues(jsonData) {
  try {
    // 检查JSON数据是否为数组
    if (!Array.isArray(jsonData)) {
      showTips('compress-tips', t('js.invalidArrayFormat'), 'error');
      return;
    }

    const arrayLength = jsonData.length;

    // 尝试不同的可能索引位置，增加容错性
    let moneyIndex = arrayLength - 10;
    let researchIndex = arrayLength - 9;
    let bonusIndex = arrayLength - 5;

    // 边界检查，确保索引不会为负数
    const money = (moneyIndex >= 0) ? jsonData[moneyIndex] || 0 : 0;
    const research = (researchIndex >= 0) ? jsonData[researchIndex] || 0 : 0;
    const bonus = (bonusIndex >= 0) ? jsonData[bonusIndex] || 0 : 0;

    // 更新输入框值
    compressMoney.value = formatLargeNumber(money);
    compressResearch.value = formatLargeNumber(research);
    compressBonus.value = formatLargeNumber(bonus);

    // 保存原始值
    originalValues = { money, research, bonus };

  } catch (error) {
    showTips('compress-tips', t('js.compressParseError'), 'error');
  }
}

// 新增：格式化大数显示函数
function formatLargeNumber(num) {
  const parsedNum = parseFloat(num);
  if (isNaN(parsedNum)) return '0';

  // 如果数字小于1e6，使用toFixed(2)保留两位小数
  if (Math.abs(parsedNum) < 1000000) {
    return parsedNum.toFixed(2);
  }
  // 如果数字很大，直接返回原始数值的字符串表示，避免科学计数法
  return parsedNum.toString();
}

// 同步解压结果到压缩功能区
function syncDecompressResult() {
  if (!currentJSONData) {
    showTips('compress-tips', t('js.syncDecompressRequired'), 'error');
    return;
  }

  // 同步JSON数据
  compressInput.value = JSON.stringify(currentJSONData); // 不使用格式化

  // 填充数值
  fillCompressValues(currentJSONData);

  showTips('compress-tips', t('js.syncDecompressSuccess'), 'success');
}

// 压缩功能区 - 执行压缩
function handleCompress() {
  const input = compressInput.value.trim();
  if (!input) {
    showTips('compress-tips', t('js.compressInputRequired'), 'error');
    return;
  }

  showLoading('compress-loading');
  clearTips('compress-tips');

  try {
    // 解析JSON
    const jsonData = JSON.parse(input);

    // 使用LZString压缩
    const compressed = LZString.compressToBase64(JSON.stringify(jsonData));

    // 显示压缩结果
    compressResult.textContent = compressed;

    // 启用复制和保存按钮
    copyCompressBtn.disabled = false;
    saveCompressBtn.disabled = false;

    showTips('compress-tips', t('js.compressSuccess'), 'success');
  } catch (error) {
    showTips('compress-tips', t('js.compressFailed') + ': ' + error.message, 'error');
    compressResult.textContent = t('js.compressFailed') + ': ' + error.message;
  } finally {
    hideLoading('compress-loading');
  }
}

// 数值输入处理 - 添加实时同步
function handleMoneyInput() {
  const value = parseFloat(this.value);
  if (!isNaN(value)) {
    updateJSONValue('money', value);
  }
}

function handleResearchInput() {
  const value = parseFloat(this.value);
  if (!isNaN(value)) {
    updateJSONValue('research', value);
  }
}

function handleBonusInput() {
  const value = parseFloat(this.value);
  if (!isNaN(value)) {
    updateJSONValue('bonus', value);
  }
}

// 保存数值修改
function saveMoney() {
  // 直接使用输入框的值，避免parseFloat可能的精度问题
  updateJSONValue('money', compressMoney.value);
}

function saveResearch() {
  // 直接使用输入框的值，避免parseFloat可能的精度问题
  updateJSONValue('research', compressResearch.value);
}

function saveBonus() {
  // 直接使用输入框的值，避免parseFloat可能的精度问题
  updateJSONValue('bonus', compressBonus.value);
}

// 更新JSON中的数值
function updateJSONValue(type, value) {
  try {
    let jsonData = JSON.parse(compressInput.value);

    // 检查JSON数据是否为数组
    if (!Array.isArray(jsonData)) {
      showTips('compress-tips', t('js.invalidArrayFormat'), 'error');
      return;
    }

    // 尝试将值转换为数字，如果失败则保留字符串形式
    const numValue = parseFloat(value);
    const finalValue = isNaN(numValue) ? value : numValue;

    // 根据类型更新JSON数组中的特定位置
    const arrayLength = jsonData.length;
    let index;

    switch (type) {
      case 'money':
        index = arrayLength - 10;
        break;
      case 'research':
        index = arrayLength - 9; // 修复：将Research索引从-11改为-9
        break;
      case 'bonus':
        index = arrayLength - 5;
        break;
      default:
        throw new Error(t('js.compressUnknownType'));
    }

    // 边界检查，确保索引不会为负数
    if (index < 0) {
      throw new Error(t('js.compressIndexNegative'));
    }

    // 更新数值
    jsonData[index] = finalValue;

    // 更新文本框
    compressInput.value = JSON.stringify(jsonData); // 不使用格式化

    // 更新原始值
    originalValues[type] = finalValue;

    showTips('compress-tips', t('js.saveSuccess'), 'success');
  } catch (error) {
    showTips('compress-tips', t('js.saveFailed') + ': ' + error.message, 'error');
  }
}

// 取消数值修改
function cancelMoney() {
  compressMoney.value = formatLargeNumber(originalValues.money);
}

function cancelResearch() {
  compressResearch.value = formatLargeNumber(originalValues.research);
}

function cancelBonus() {
  compressBonus.value = formatLargeNumber(originalValues.bonus);
}

// 复制功能
async function copyDecompressResult() {
  await copyToClipboard(decompressResult.textContent);
}

async function copyCompressResult() {
  await copyToClipboard(compressResult.textContent);
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(t('js.copySuccess'));
  } catch (error) {
    showTips('decompress-tips', t('js.copyFailed') + ': ' + error.message, 'error');
  }
}

// 保存功能
function saveDecompressResult() {
  const content = decompressResult.textContent;
  saveAsFile(content, 'decompress_result.json');
}

function saveCompressResult() {
  const content = compressResult.textContent;
  saveAsFile(content, 'compress_result.txt');
}

function saveAsFile(content, filename) {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(t('js.saveSuccess'));
}

// 清空内容
function clearDecompressContent() {
  decompressInput.value = '';
  decompressResult.textContent = t('js.decompressPrompt');
  decompressFile.value = '';
  moneyVal.textContent = '0.00';
  researchVal.textContent = '0.00';
  bonusVal.textContent = '0.00';
  copyDecompressBtn.disabled = true;
  saveDecompressBtn.disabled = true;
  clearTips('decompress-tips');
}

function clearCompressContent() {
  compressInput.value = '';
  compressResult.textContent = '';
  compressFile.value = '';
  // 修复：使用正确的元素ID清空数值输入框
  moneyInput.value = '';
  researchInput.value = '';
  bonusInput.value = '';
  copyCompressBtn.disabled = true;
  saveCompressBtn.disabled = true;
  clearTips('compress-tips');
  // 重置原始值
  originalMoney = 0;
  originalResearch = 0;
  originalBonus = 0;
}

// 辅助功能
function showLoading(elementId) {
  document.getElementById(elementId).classList.remove('hide');
}

function hideLoading(elementId) {
  document.getElementById(elementId).classList.add('hide');
}

function showTips(elementId, message, type = 'info') {
  const tipsElement = document.getElementById(elementId);
  tipsElement.textContent = message;
  tipsElement.className = `tips ${type}-tip`;
}

function clearTips(elementId) {
  const tipsElement = document.getElementById(elementId);
  tipsElement.textContent = '';
  tipsElement.className = 'tips';
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.remove('hide');

  setTimeout(() => {
    toast.classList.add('hide');
  }, 2000);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);



// 存储原始值
let originalMoney = 0;
let originalResearch = 0;
let originalBonus = 0;

// 数值框聚焦时显示对应的确认和取消按钮
function showEditButtons(inputElement) {
  const buttons = inputElement.nextElementSibling;
  buttons.classList.remove('hide');
}

// 数值框失焦时隐藏对应的确认和取消按钮（如果没有点击按钮）
function hideEditButtons(inputElement) {
  const buttons = inputElement.nextElementSibling;
  // 延迟隐藏，确保点击按钮的事件能被触发
  setTimeout(() => {
    buttons.classList.add('hide');
  }, 200);
}

// 为所有数值框添加事件监听
moneyInput.addEventListener('focus', function () {
  originalMoney = this.value;
  showEditButtons(this);
});
moneyInput.addEventListener('blur', function () {
  hideEditButtons(this);
  // 新增：鼠标失焦时自动同步到JSON
  if (this.value !== originalMoney) {
    updateJSONValue('money', this.value);
  }
});

researchInput.addEventListener('focus', function () {
  originalResearch = this.value;
  showEditButtons(this);
});
researchInput.addEventListener('blur', function () {
  hideEditButtons(this);
  // 新增：鼠标失焦时自动同步到JSON
  if (this.value !== originalResearch) {
    updateJSONValue('research', this.value);
  }
});

bonusInput.addEventListener('focus', function () {
  originalBonus = this.value;
  showEditButtons(this);
});
bonusInput.addEventListener('blur', function () {
  hideEditButtons(this);
  // 新增：鼠标失焦时自动同步到JSON
  if (this.value !== originalBonus) {
    updateJSONValue('bonus', this.value);
  }
});

// 填充数值到输入框
function fillCompressValues() {
  try {
    const inputVal = compressInput.value.trim();
    if (!inputVal) return;

    const data = JSON.parse(inputVal);
    if (!Array.isArray(data)) return;

    const arrayLength = data.length;

    // 填充Money（倒数第10位）
    if (arrayLength >= 10) {
      moneyInput.value = formatLargeNumber(data[arrayLength - 10]);
      originalMoney = data[arrayLength - 10];
    }

    // 填充Research（倒数第9位）
    if (arrayLength >= 9) {
      researchInput.value = formatLargeNumber(data[arrayLength - 9]);
      originalResearch = data[arrayLength - 9];
    }

    // 填充Bonus（倒数第5位）
    if (arrayLength >= 5) {
      bonusInput.value = formatLargeNumber(data[arrayLength - 5]);
      originalBonus = data[arrayLength - 5];
    }
  } catch (err) {
    console.error(t('js.fillCompressValuesFailed') + ':', err);
  }
}

// 大数格式化函数
function formatLargeNumber(num) {
  if (typeof num === 'number') {
    return num;
  } else if (typeof num === 'string') {
    return num;
  }
  return 0;
}

// 保存数值更改
function saveMoney() {
  const inputVal = moneyInput.value;
  if (updateJSONValue('money', inputVal)) {
    originalMoney = inputVal;
    hideEditButtons(moneyInput);
  }
}

function saveResearch() {
  const inputVal = researchInput.value;
  if (updateJSONValue('research', inputVal)) {
    originalResearch = inputVal;
    hideEditButtons(researchInput);
  }
}

function saveBonus() {
  const inputVal = bonusInput.value;
  if (updateJSONValue('bonus', inputVal)) {
    originalBonus = inputVal;
    hideEditButtons(bonusInput);
  }
}

// 取消数值更改
function cancelMoney() {
  moneyInput.value = originalMoney;
  hideEditButtons(moneyInput);
}

function cancelResearch() {
  researchInput.value = originalResearch;
  hideEditButtons(researchInput);
}

function cancelBonus() {
  bonusInput.value = originalBonus;
  hideEditButtons(bonusInput);
}

// 更新JSON中的数值
function updateJSONValue(type, value) {
  try {
    const inputVal = compressInput.value.trim();
    if (!inputVal) return false;

    const data = JSON.parse(inputVal);
    if (!Array.isArray(data)) return false;

    const arrayLength = data.length;
    let index = -1;

    // 根据类型确定要更新的数组索引
    switch (type) {
      case 'money':
        index = arrayLength - 10;
        break;
      case 'research':
        index = arrayLength - 9;
        break;
      case 'bonus':
        index = arrayLength - 5;
        break;
      default:
        return false;
    }

    // 确保索引有效
    if (index < 0) return false;

    // 更新数值
    data[index] = value;

    // 将更新后的数据放回输入框
    compressInput.value = JSON.stringify(data);

    return true;
  } catch (err) {
    console.error(t('js.updateJSONFailed') + ':', err);
    return false;
  }
}

// 为按钮添加事件监听
saveMoneyBtn.addEventListener('click', saveMoney);
cancelMoneyBtn.addEventListener('click', cancelMoney);
saveResearchBtn.addEventListener('click', saveResearch);
cancelResearchBtn.addEventListener('click', cancelResearch);
saveBonusBtn.addEventListener('click', saveBonus);
cancelBonusBtn.addEventListener('click', cancelBonus);

// JSON输入框失焦时自动解析并填充数值
compressInput.addEventListener('blur', fillCompressValues);