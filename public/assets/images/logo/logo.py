from PIL import Image
import os

# 配置参数
input_path = '/Users/shilai/Work/Dev/website/qinghua/images/logo/qinghua-logo1024.png'
output_dir = '/Users/shilai/Work/Dev/website/qinghua/images/icons'

# 完整图标尺寸规范
icon_sizes = {
    # Favicon系列
    "favicon.ico": [(16, 16), (32, 32), (48, 48), (64, 64)],
    "favicon-16x16.png": (16, 16),
    "favicon-32x32.png": (32, 32),
    "favicon-96x96.png": (96, 96),
    
    # Apple系列
    "apple-touch-icon.png": (180, 180),
    "apple-touch-icon-152x152.png": (152, 152),
    "apple-touch-icon-167x167.png": (167, 167),
    
    # Android系列
    "android-chrome-192x192.png": (192, 192),
    "android-chrome-512x512.png": (512, 512),
    
    # Windows系列
    "mstile-70x70.png": (70, 70),
    "mstile-150x150.png": (150, 150),
    "mstile-310x150.png": (310, 150),
    "mstile-310x310.png": (310, 310),
    
    # 社交媒体
    "og-image.png": (1200, 630),
    "twitter-card.png": (1200, 600)
}

def generate_icons():
    """生成所有尺寸的网站图标"""
    os.makedirs(output_dir, exist_ok=True)
    original = Image.open(input_path)
    
    print("🛠️ 开始生成网站图标...")
    
    for filename, sizes in icon_sizes.items():
        try:
            # 处理ICO特殊格式
            if filename.endswith(".ico"):
                images = [original.resize(size, Image.LANCZOS) for size in sizes]
                images[0].save(
                    os.path.join(output_dir, filename),
                    format="ICO",
                    sizes=[(size[0], size[1]) for size in sizes],
                    quality=100
                )
            else:
                resized = original.resize(sizes, Image.LANCZOS)
                resized.save(
                    os.path.join(output_dir, filename),
                    format="PNG",
                    optimize=True,
                    quality=95
                )
            
            print(f"✅ 已生成: {filename} ({sizes if not isinstance(sizes[0], tuple) else '多尺寸'})")
        except Exception as e:
            print(f"❌ 生成失败 {filename}: {str(e)}")
    
    print(f"\n🎉 所有图标生成完成！保存路径: {output_dir}")

if __name__ == "__main__":
    generate_icons()