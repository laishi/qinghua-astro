#!/bin/bash

# 获取剪贴板内容
clip=$(pbpaste)

# 获取当前路径
cwd=$(pwd)

# 拼接为完整路径
src="$cwd/$clip"

# 设置目标路径（你可以根据实际情况修改）
dest="/Users/shilai/Work/Dev/web/qinghua/qinghua-template/spa"

# 检查源路径是否存在
if [[ ! -e "$src" ]]; then
  echo "找不到文件或目录：$src"
  exit 1
fi

# 执行移动
mv "$src" "$dest"

# 提示结果
if [[ $? -eq 0 ]]; then
  echo "成功移动 $src 到 $dest"
else
  echo "移动失败"
fi
