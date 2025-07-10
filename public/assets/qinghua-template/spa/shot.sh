#!/bin/bash

# 设置基础目录为当前目录
BASE_DIR="$(pwd)"

# 分辨率设置
WIDTH=1024
HEIGHT=768

# Chrome 可执行路径（根据系统实际位置调整）
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# 检查 Chrome 是否存在
if [ ! -x "$CHROME_PATH" ]; then
  echo "❌ 未找到 Chrome 可执行文件：$CHROME_PATH"
  exit 1
fi

echo "🚀 开始生成模板截图..."
echo "📂 扫描目录：$BASE_DIR"
echo

# 遍历所有目录
find "$BASE_DIR" -type f -name "index.html" | while read -r html_file; do
  folder_path="$(dirname "$html_file")"
  file_url="file://$html_file"
  output_path="$folder_path/screenshot.png"

  echo "📸 处理模板: $folder_path"

  "$CHROME_PATH" \
    --headless \
    --disable-gpu \
    --hide-scrollbars \
    --screenshot="$output_path" \
    --window-size="${WIDTH},${HEIGHT}" \
    "$file_url" 2>/dev/null

  if [ $? -eq 0 ]; then
    echo "✅ 已保存截图: $output_path"
  else
    echo "⚠️  失败: $html_file"
  fi

  echo
done

echo "🎉 所有截图任务已完成"
