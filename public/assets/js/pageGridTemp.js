let templateFolders = [
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
    "19-darktouch-corporate-portfolio-bootstrap-responsive-web-template",
    "20-delite-music-html5-bootstrap-responsive-web-template",
    "21-eat-restaurant-bootstrap-html5-template",
    "22-elegant-free-multi-purpose-bootstrap-responsive-template",
    "23-enlive-corporate-free-html5-bootstrap-web-template",
    "24-fit-healthy-fitness-and-gym-html5-bootstrap-theme",
    "25-fitness-zone-html5-bootstrap-responsive-web-template",
    "26-frames-corporate-bootstrap-free-html5-template",
    "27-free-bootstrap-template-real-estate-my-home",
    "28-free-bootstrap-template-restaurant-website-treehut",
    "29-free-bootstrap-template-rockline-business",
    "30-free-portfolio-html5-responsive-website-sam",
    "31-getdoctor-free-bootstrap-responsive-website-template",
    "32-golden-hotel-free-html5-bootstrap-web-template",
    "33-grand-free-bootstrap-responsive-website-template",
    "34-green-corp-flat-free-responsive-mobile-website",
    "35-iam-html5-responsive-portfolio-resume-template",
    "36-iclick-photography-bootstrap-free-website-template",
    "37-idata-hosting-free-bootstrap-responsive-website-template",
    "38-ideal-interior-design-free-bootstrap-website-template",
    "39-john-bootstrap-one-page-html5-free-resume-template",
    "40-johndoe-portfolio-resume-bootstrap-template",
    "41-line-free-app-landing-page-responsive-web-template",
    "42-lovely-wedding-bootstrap-free-website-template",
    "43-me-resume-personal-portfolio-responsive-template",
    "44-mobile-app-free-one-page-responsive-html5-landing-page",
    "45-relax-interior-free-bootstrap-responsive-website-template",
    "46-rocket-business-bootstrap-free-responsive-web-theme",
    "47-skytouch-onepage-bootstrap-responsive-web-template",
    "48-smart-interior-designs-html5-bootstrap-web-template",
    "49-speed-hosting-bootstrap-free-html5-template"
];


let numgrids = 23;


const tempPath = "./qinghua-template/spa/";
templateFolders = templateFolders.slice(0, templateFolders.length);

const detailGridsContainer = document.getElementById("detailGrids");
let count = 1;
const gridAspectRatio = 1.3;

function headerConfig(value) {
    const headerContent = document.querySelector('.header-content');
    if (headerContent) {
        headerContent.style.height = `${value}vh`;  // 设置高度为指定的 vh 单位
    } else {
        console.log('元素 .header-content 没有找到');
    }
}

headerConfig(38);


function calculatePerRow() {
    const gridWidth = 300;
    const containerWidth = detailGridsContainer.clientWidth;
    let perRow = Math.floor(containerWidth / gridWidth);
    return Math.min(Math.max(perRow, 2), 5);
}

function injectImageIntoGrid(grid, linkurl, imgurl) {
    const img = document.createElement("img");
    img.src = imgurl;
    img.loading = "lazy";

    const link = document.createElement("a");
    link.href = linkurl;
    link.target = "_self"; // 让链接在同一标签页打开
    link.appendChild(img);

    // 阻止点击跳转，避免影响用户体验
    link.addEventListener("click", (e) => {
        // 这里如果需要自定义点击事件逻辑可以放在这里
        console.log("Link clicked, navigating to:", linkurl);
    });

    grid.innerHTML = ''; // 清空 grid 内容
    grid.appendChild(link); // 将链接和图片添加到 grid
}

function generateGrids() {
    detailGridsContainer.innerHTML = '';
    count = 1;

    const total = templateFolders.length;
    const totalGrids = total + 1; // 多加一个格子用于“查看更多模板”
    const perRow = calculatePerRow();
    const gridGap = parseFloat(getComputedStyle(detailGridsContainer).gap) || 16;
    const containerWidth = detailGridsContainer.clientWidth;
    const gridWidth = (containerWidth - (perRow - 1) * gridGap) / perRow;
    const gridHeight = gridWidth * gridAspectRatio;

    for (let i = 0; i < Math.ceil(totalGrids / perRow); i++) {
        const row = document.createElement("div");
        row.className = "gridsrow";

        for (let j = 0; j < perRow && count <= totalGrids; j++) {
            const grid = document.createElement("div");
            grid.className = "detailGrid";

            if (count === totalGrids) {
                // 最后一个是“查看更多模板”
                grid.classList.add("enddetailGrid");
                grid.innerHTML = `<a href="/" target="_self"> 谢谢欣赏</a>`;
                grid.style.cursor = "pointer";
            } else {
                const imgurl = tempPath + templateFolders[count - 1] + "/screenshot.png";
                const linkurl = tempPath + templateFolders[count - 1] + "/index.html";
                injectImageIntoGrid(grid, linkurl, imgurl);
            }

            bindGridEvents(grid);
            row.appendChild(grid);
            count += 1;
        }

        detailGridsContainer.appendChild(row);
    }
}

function bindGridEvents(grid) {
    // 为每个 grid 添加鼠标事件
    grid.addEventListener("mouseover", () => {
        grid.classList.add("activeGrid");
        const row = grid.closest(".gridsrow");
        if (row) {
            row.classList.add("activeRow");
        }
    });

    grid.addEventListener("mouseout", () => {
        grid.classList.remove("activeGrid");
        const row = grid.closest(".gridsrow");
        if (row) {
            row.classList.remove("activeRow");
        }
    });
}

// 页面加载时调用生成网格函数
generateGrids();
