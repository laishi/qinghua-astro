window.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.href;
    const isRoot = currentPath === window.location.origin + '/' || currentPath === window.location.origin;
    const isDetailView = currentPath === window.location.origin + '/#detailView';

    if (!isRoot && !isDetailView) {
        const headerTitle = document.querySelector('.header-content');
        if (headerTitle) {
            headerTitle.style.height = '30vh';
        }
    }
});
