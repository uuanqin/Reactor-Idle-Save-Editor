# Reactor Idle 游戏存档修改工具 / Reactor Idle Game Save Editor

## 项目简介 / Project Introduction

这是一个专为 Reactor Idle 游戏设计的网页版存档修改工具，支持游戏存档的解析、数值修改和重新压缩功能。

This is a web-based save editor specifically designed for the Reactor Idle game, supporting game save parsing, value editing, and recompression functionality.

## 主要功能 / Key Features

### 🔍 存档解析 / Save Parsing
- 支持上传或粘贴游戏存档文件，自动解析并显示游戏数值
- Supports uploading or pasting game save files, automatically parsing and displaying game values

### ✏️ 数值修改 / Value Editing
- 可修改金钱、科技、奖励时刻等游戏数值
- Allows modification of game values including Money, Research, Bonus Ticks, etc.

### 📦 存档压缩 / Save Compression
- 修改完成后，一键生成新的游戏存档文件
- After editing, generates new game save files with one click

### 🌐 多语言支持 / Multi-language Support
- 完整的中英文界面切换
- Complete Chinese/English interface switching

## 使用方法 / Usage Guide

### 1. 存档解析 / Save Parsing
1. 在"存档解析"区域上传游戏存档文件或粘贴存档字符串
2. Upload game save file or paste save string in the "Save Parsing" area

### 2. 数值修改 / Value Editing  
1. 在"存档制作区"修改金钱、科技、奖励时刻等数值
2. Modify Money, Research, Bonus Ticks and other values in the "Save Creation" area

### 3. 存档压缩 / Save Compression
1. 点击"执行压缩"按钮生成新的存档文件
2. Click "Compress" button to generate new save file

### 4. 保存使用 / Save & Use
1. 复制或下载压缩后的存档，在游戏中导入使用
2. Copy or download the compressed save file for import into the game

## 技术特点 / Technical Features

- **前端技术**：纯HTML/CSS/JavaScript实现，无需后端服务器
- **压缩算法**：基于LZ-String库的Base64压缩算法
- **响应式设计**：支持桌面和移动设备访问
- **本地存储**：自动保存语言偏好设置
- **跨浏览器兼容**：支持主流现代浏览器

## 支持的存档格式 / Supported Save Formats

- **Base64压缩字符串**：游戏默认的存档格式
- **JSON格式**：解压后的可读格式
- **文本文件**：包含存档字符串的文件

## 游戏链接 / Game Links

- **官方游戏**：https://reactoridle.com/
- **汉化版本**：https://g8hh.github.io/reactoridle/

---

本页面由AI工具辅助生成 / This page is AI-assisted