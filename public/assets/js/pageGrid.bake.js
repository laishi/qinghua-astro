class SliderDetailGrid {
    constructor() {
        this.templateFolders = [
            "01-add-life-health-fitness-free-bootstrap-html5-template",
            "02-reveal",
            "03-agile-agency-free-bootstrap-web-template",
            "04-amaze-photography-bootstrap-html5-template",
            "05-aroma-beauty-and-spa-responsive-bootstrap-template",
            "06-avenger-multi-purpose-responsive-html5-bootstrap-template",
            "07-b-school-free-education-html5-website-template",
            "08-beauty-salon-bootstrap-html5-template",
            "09-brand-html5-app-landing-page-responsive-web-template",
            "10-businessline-corporate-portfolio-bootstrap-responsive-web-template",
            "11-businessr-corporate-bootstrap-responsive-web-template",
            "12-car-repair-html5-bootstrap-template",
            "13-car-zone-automobile-bootstrap-responsive-web-template",
            "14-city-square-bootstrap-responsive-web-template",
            "15-cloud-hosting-free-bootstrap-responsive-website-template",
            "16-clouds-html5-multipurpose-landing-page-template",
            "17-coffee-shop-free-html5-template",
            "18-creative-free-responsive-html5-business-template",
            "19-darktouch-corporate-portfolio-bootstrap-responsive-web-template"
        ];
        this.tempLink = "temp.html";
        this.tempPath = "./qinghua-template/spa/";

        this.pages = document.querySelector(".pages-content");
        this.detailPage = document.getElementById("detailPage");
        this.detailGridsContainer = document.getElementById("detailGrids");
        
        this.gridAspectRatio = 1.3;
        this.currentActiveGrid = null;
        this.currentActiveRow = null;
        this.perRow = this.calculatePerRow();
        this.isReturning = false;
        this.ready = false;
        this.state = 'list'; // 状态机：'list' | 'detail'

        this.currentPage = "mainPage"

        this.init();
    }

    setState(newState, payload = {}) {
        if (this.state === newState) return;
        this.state = newState;
        if (newState === 'list') {
            this.pages.style.transform = 'translateX(0%)';
            this.detailPage.style.transform = 'translate(0px, 0px)';
            document.body.style.overflow = '';
            this.detailPage.querySelector('#cicleloader-container')?.remove();
            this.detailPage.querySelectorAll('.liquidGlass').forEach(el => el.remove());

        } else if (newState === 'detail') {
            const { linkurl } = payload;
            this.pages.style.transform = 'translateX(-100%)';
            this.detailPage.style.transform = 'translate(0px, 0px)';
            document.body.style.overflow = 'hidden';
            this.circleLoaderIframe(this.detailPage, linkurl);
        }
    }

    init() {
        this.generateGrids();
        this.bindEvents();
        this.ready = true;
        this.checkURLAndLoadTemplate();
    }

    calculatePerRow() {
        return Math.min(Math.max(Math.floor(this.detailGridsContainer.clientWidth / 300), 2), 5);
    }

    checkURLAndLoadTemplate() {
        const params = new URLSearchParams(location.search);
        const index = parseInt(params.get('template'), 10);
        if (!isNaN(index) && location.hash === '#detailpage') {
            const linkurl = `${this.tempPath}${this.templateFolders[index]}/index.html`;
            requestAnimationFrame(() => {
                if (!this.ready) return;
                this.setState('detail', { linkurl });
            });
        } else {
            this.setState('list');
        }
    }

    circleLoaderIframe(appenddiv, src) {
        if (!(appenddiv instanceof HTMLElement)) throw new Error('appenddiv 必须是有效的 DOM 元素');

        appenddiv.querySelectorAll('.liquidGlass, #cicleloader-container').forEach(el => el.remove());

        // 创建容器元素
        const container = document.createElement('div');
        container.id = 'cicleloader-container';

        // 创建波纹加载元素
        const rippleLoader = document.createElement('div');
        rippleLoader.className = 'ripple-loader';

        // 创建气泡加载元素
        const bubbleLoader = document.createElement('div');
        bubbleLoader.className = 'bubble-loader';

        // 创建加载文本元素
        const loadingText = document.createElement('div');
        loadingText.className = 'loading-text';
        loadingText.textContent = '加载中';

        // 创建返回按钮文本
        const backText = document.createElement('h3');
        backText.className = 'btnText';
        backText.innerHTML = '&lt;'; // 使用HTML实体表示<符号

        // 创建iframe元素
        const iframe = document.createElement('iframe');
        iframe.src = src; // src是外部传入的变量

        bubbleLoader.appendChild(loadingText);
        container.append(rippleLoader, bubbleLoader, iframe);
        appenddiv.appendChild(container);

        bubbleLoader.addEventListener('click', () => {

            if (this.isReturning) return;
            this.isReturning = true;
            this.setState('list');
            container.remove();
            this.pages.addEventListener('transitionend', () => {
                history.back();
                this.isReturning = false;
            }, { once: true });
        });

        iframe.addEventListener('load', () => {
            rippleLoader.classList.add('active');
            iframe.classList.add('loaded');
            rippleLoader.addEventListener('animationend', () => {
                container.classList.add('loaded');
                rippleLoader.remove();
                loadingText.remove();
                bubbleLoader.classList.add('loaded');
                bubbleLoader.appendChild(backText);
            }, { once: true });
        });

        setTimeout(() => {
            if (!container.classList.contains('loaded')) {
                container.classList.add('loaded');
                rippleLoader.classList.add('active');
                iframe.classList.add('loaded');
                rippleLoader.addEventListener('animationend', () => {
                    rippleLoader.remove();
                    loadingText.remove();
                    bubbleLoader.classList.add('loaded');

                    bubbleLoader.appendChild(backText);
                }, { once: true });
            }
        }, 1000);

        iframe.addEventListener('error', () => {
            container.style.background = 'radial-gradient(circle, #ff4d4d, #b32424)';
            container.innerHTML = `<div class="error-text">加载失败: ${src}</div>`;
        });
    }

    injectImageIntoGrid(grid, linkurl, imgurl, info) {
        const link = Object.assign(document.createElement('a'), { href: linkurl, target: '_blank' });
        link.addEventListener('click', e => e.preventDefault());
        link.appendChild(Object.assign(document.createElement('img'), { src: imgurl, loading: 'lazy' }));

        const gridInfo = document.createElement('div');
        gridInfo.className = 'gridInfo';
        info.split('/').slice(-2, -1)[0].split('-').forEach(keyword => {
            gridInfo.appendChild(Object.assign(document.createElement('div'), {
                className: 'infoKeywords',
                innerHTML: `<h3>${keyword}</h3>`
            }));
        });

        grid.append(link, gridInfo);
    }

    generateGrids() {
        this.detailGridsContainer.innerHTML = '';
        const totalGrids = this.templateFolders.length + 1;
        const gridGap = parseFloat(getComputedStyle(this.detailGridsContainer).gap) || 16;
        const gridWidth = (this.detailGridsContainer.clientWidth - (this.perRow - 1) * gridGap) / this.perRow;

        let count = 1;
        for (let i = 0; i < Math.ceil(totalGrids / this.perRow); i++) {
            const row = Object.assign(document.createElement('div'), { className: 'gridsrow' });
            for (let j = 0; j < this.perRow && count <= totalGrids; j++, count++) {
                const grid = Object.assign(document.createElement('div'), {
                    className: 'detailGrid',
                    style: `height: ${gridWidth * this.gridAspectRatio}px`
                });

                if (count === totalGrids) {
                    grid.classList.add('enddetailGrid');
                    grid.innerHTML = `<a href="${this.tempLink}" target="_blank">查看更多模板 ➤</a>`;
                    grid.style.cursor = 'pointer';
                } else {
                    const index = count - 1;
                    const linkurl = `${this.tempPath}${this.templateFolders[index]}/index.html`;
                    const imgurl = `${this.tempPath}${this.templateFolders[index]}/screenshot.png`;
                    this.injectImageIntoGrid(grid, linkurl, imgurl, linkurl);
                }

                row.appendChild(grid);
            }
            this.detailGridsContainer.appendChild(row);
        }

        this.bindGridEvents();
    }

    bindGridEvents() {
        this.detailGridsContainer.addEventListener('click', e => {
            const grid = e.target.closest('.detailGrid');
            if (!grid || grid.classList.contains('enddetailGrid')) return;

            let transformStartTime = 0;
            let transformDuration = 0;

            this.detailPage.addEventListener('transitionrun', (e) => {
                if (e.propertyName === 'transform') {
                    transformStartTime = performance.now();
                    console.log('transform 动画开始');
                }
            });

            this.detailPage.addEventListener('transitionend', (e) => {
                if (e.propertyName === 'transform') {
                    transformDuration = performance.now() - transformStartTime;
                    console.log('transform 动画结束');
                    console.log(`动画持续时间：${transformDuration.toFixed(2)} ms`);
                }
            });

            const row = grid.closest('.gridsrow');
            const rowIndex = Array.from(this.detailGridsContainer.children).indexOf(row);
            const gridIndex = Array.from(row.children).indexOf(grid);
            const index = rowIndex * this.perRow + gridIndex;
            const linkurl = `${this.tempPath}${this.templateFolders[index]}/index.html`;

            history.pushState({ index }, '', `?template=${index}#detailpage`);
            this.setState('detail', { linkurl });

            // 动画
            this.sliding(e.clientX, index);
        });

        this.detailGridsContainer.addEventListener('mouseover', e => {
            const grid = e.target.closest('.detailGrid');
            if (!grid || grid === this.currentActiveGrid) return;
            this.currentActiveGrid?.classList.remove('activeGrid');
            this.currentActiveRow?.classList.remove('activeRow');
            grid.classList.add('activeGrid');
            const row = grid.closest('.gridsrow');
            row?.classList.add('activeRow');
            this.currentActiveGrid = grid;
            this.currentActiveRow = row;
        });
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.perRow = this.calculatePerRow();
            this.generateGrids();
        });

        window.addEventListener('popstate', (e) => {
            const index = e.state?.index;
            if (!location.hash || location.hash !== '#detailpage') {
                this.setState('list');
            } else if (!isNaN(index)) {
                const linkurl = `${this.tempPath}${this.templateFolders[index]}/index.html`;
                this.setState('detail', { linkurl });
            }
        });

        window.addEventListener('DOMContentLoaded', () => {
            this.checkURLAndLoadTemplate();
        });
    }

    sliding(pos, index) {
        const rowIndex = index % this.perRow;
        const moveDirection = (this.perRow === 1 || (this.perRow % 2 === 1 && rowIndex === Math.floor(this.perRow / 2)))
            ? pos > window.innerWidth / 2 ? 'left' : 'right'
            : rowIndex < Math.floor(this.perRow / 2) ? 'right' : 'left';

        this.detailPageScroll(moveDirection === 'left' ? '100%' : '-100%');
        this.pages.style.transform = `translateX(${moveDirection === 'left' ? '-100%' : '100%'})`;
    }

    detailPageScroll(x = '0px', y = `${window.scrollY}px`) {
        this.detailPage.style.transform = `translate(${x}, ${y})`;
    }
}

const gallery = new SliderDetailGrid();

function listenToNavigationEvents() {
    window.addEventListener('load', () => console.log('页面加载完成（刷新或首次进入）'));
    window.addEventListener('popstate', () => console.log('检测到前进或后退操作'));
    window.addEventListener('beforeunload', () => console.log('页面即将被刷新或关闭'));
    window.addEventListener('pageshow', event => console.log(event.persisted ? '页面从缓存恢复' : '页面显示'));
}

listenToNavigationEvents();