import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

function getDefaultSidebar(project) {
    if (project === 'refined-storage-addons') {
        return 'Items';
    } else if (project === 'refined-pipes') {
        return 'Blocks';
    } else {
        return 'Guides';
    }
}

window.addEventListener('load', () => {
    const currentProject = document.querySelector('body').getAttribute('data-project');

    const tooltips = document.querySelectorAll('[data-tooltip-icon]');
    tooltips.forEach(tooltip => {
        tippy(tooltip, {
            content: '<img src="' + tooltip.getAttribute('data-tooltip-icon') + '" class="wiki-tooltip-icon">',
            theme: 'light',
            allowHTML: true,
            animation: null,
            placement: "right",
        })
    });

    tippy('[data-tippy-content]');

    const tabKey = 'tab_' + currentProject;
    if (localStorage.getItem(tabKey) === null) {
        localStorage.setItem(tabKey, getDefaultSidebar(currentProject));
    }

    const currentSidebar = document.querySelector('#_sidebar_' + localStorage.getItem(tabKey));
    if (currentSidebar !== null) {
        currentSidebar.style.display = 'block';
    }

    const currentSidebarTab = document.querySelector('[data-tab="' + localStorage.getItem(tabKey) + '"]');
    if (currentSidebarTab !== null) {
        currentSidebarTab.classList.add('active');
    }

    document.querySelectorAll('[data-toggle="tab"]').forEach(tab => {
        tab.addEventListener('click', () => {
            const name = tab.getAttribute('data-tab');

            document.querySelectorAll('.sidebar').forEach(item => item.style.display = 'none');
            document.querySelector('#_sidebar_' + name).style.display = 'block';

            localStorage.setItem(tabKey, name);
        });
    });

    document.querySelectorAll('article h1').forEach(h => addHeadingLink(h));
    document.querySelectorAll('article h2').forEach(h => addHeadingLink(h));
    document.querySelectorAll('article h3').forEach(h => addHeadingLink(h));
    document.querySelectorAll('article h4').forEach(h => addHeadingLink(h));
    document.querySelectorAll('article h5').forEach(h => addHeadingLink(h));
});

function addHeadingLink(heading) {
    const text = heading.innerHTML.toLowerCase().trim().replace(/[\.,\-\/#!?$%\^&\*;:{}=\-_\<\>`~()]/g, "").replace(/ /g, '-');
    heading.setAttribute('id', text);

    const link = '<a href="#' + text + '" class="wiki-heading-link ml-2"><i class="fa fa-link"></i></a>';

    heading.innerHTML = heading.innerHTML + link;

    heading.addEventListener('mouseenter', () => {
        heading.querySelector('.wiki-heading-link').style.visibility = 'visible';
    });
    heading.addEventListener('mouseleave', () => {
        heading.querySelector('.wiki-heading-link').style.visibility = 'hidden';
    });
}