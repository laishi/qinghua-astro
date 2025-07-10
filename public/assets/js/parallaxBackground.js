/**
 * 增强版视差效果函数
 * @param {HTMLElement} element - 要应用视差的元素
 * @param {Object} [options] - 配置选项
 * @param {number} [options.intensity=0.1] - 视差强度 (0-1)
 * @param {boolean} [options.center=false] - 是否强制居中
 * @param {string} [options.axis='xy'] - 视差轴 ('x', 'y' 或 'xy')
 */
function applyParallax(element, options = {}) {
    const config = {
        intensity: 0.1,
        center: false,
        axis: 'xy',
        ...options
    };

    if (!element || !(element instanceof HTMLElement)) {
        console.error('无效的元素');
        return null;
    }

    // 保存初始样式
    const initialTransform = window.getComputedStyle(element).transform;
    const initialPosition = {
        left: element.style.left,
        top: element.style.top,
        bottom: element.style.bottom
    };

    let rafId = null;
    let lastMove = { x: 0, y: 0 };

    // 计算最大移动范围
    function getMaxMovement() {
        const parent = element.parentElement || document.documentElement;
        return {
            x: (element.offsetWidth - parent.offsetWidth) / 2,
            y: (element.offsetHeight - parent.offsetHeight) / 2
        };
    }

    // 视差动画
    function updatePosition() {
        const max = getMaxMovement();
        const moveX = config.axis.includes('x') ? lastMove.x * max.x * config.intensity : 0;
        const moveY = config.axis.includes('y') ? lastMove.y * max.y * config.intensity : 0;
        
        let transform = initialTransform === 'none' ? '' : initialTransform;
        if (config.center) {
            transform = `translate(-50%, -50%) translate(${-moveX}px, ${-moveY}px)`;
        } else {
            transform += ` translate(${-moveX}px, ${-moveY}px)`;
        }
        element.style.transform = transform;
        rafId = null;
    }

    // 鼠标/触摸移动处理
    function handleMove(e) {
        const clientX = e.clientX ?? (e.touches?.[0]?.clientX);
        const clientY = e.clientY ?? (e.touches?.[0]?.clientY);
        
        if (clientX === undefined || clientY === undefined) return;

        lastMove = {
            x: (clientX / window.innerWidth - 0.5) * 2,
            y: (clientY / window.innerHeight - 0.5) * 2
        };

        if (!rafId) {
            rafId = requestAnimationFrame(updatePosition);
        }
    }

    // 窗口大小调整处理
    function handleResize() {
        if (rafId) cancelAnimationFrame(rafId);
        updatePosition();
    }

    // 绑定事件
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // 返回清理函数
    return function cleanup() {
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('touchmove', handleMove);
        window.removeEventListener('resize', handleResize);
        if (rafId) cancelAnimationFrame(rafId);
        element.style.transform = initialTransform;
    };
}

// 使用示例
document.addEventListener('DOMContentLoaded', function() {
    const parallaxBg = document.querySelector('.parallaxbg');
    const girl = document.querySelector('.girl');

    // 背景：强视差，全方向
    if (parallaxBg) {
        applyParallax(parallaxBg, {
            intensity: 0.5,
            center: true,
            axis: 'xy'
        });
    }

    // 女孩：弱视差，仅水平移动
    if (girl) {
        applyParallax(girl, {
            intensity: 0.05,
            center: false,
            axis: 'x'  // 只允许水平移动
        });
    }
});