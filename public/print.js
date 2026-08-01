function hidePrint(elements, excludeIds) {
    Array.from(elements)
        .forEach(function (element) {
            var childId = element.id;
            if (!excludeIds.includes(childId) && !element.classList.contains('print-hide')) {
                element.classList.add('print-hide')
            }
        });
}

function forceLightTheme() {
    var html = document.documentElement;
    var body = document.body;
    var snapshot = {
        dataTheme: html.getAttribute('data-theme'),
        hadDarkClass: html.classList.contains('dark'),
        hadDarkTheme: body.classList.contains('dark-theme'),
        hadLightTheme: body.classList.contains('light-theme'),
        hadWhiteTheme: body.classList.contains('white-theme'),
    };

    html.setAttribute('data-theme', 'light');
    html.classList.remove('dark');
    body.classList.remove('dark-theme');
    body.classList.add('light-theme', 'white-theme');

    return snapshot;
}

function restoreTheme(snapshot) {
    if (!snapshot) {
        return;
    }

    var html = document.documentElement;
    var body = document.body;

    if (snapshot.dataTheme == null) {
        html.removeAttribute('data-theme');
    } else {
        html.setAttribute('data-theme', snapshot.dataTheme);
    }

    if (snapshot.hadDarkClass) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    body.classList.toggle('dark-theme', snapshot.hadDarkTheme);
    body.classList.toggle('light-theme', snapshot.hadLightTheme);
    body.classList.toggle('white-theme', snapshot.hadWhiteTheme);
}

function onPrintDone(restore) {
    var restored = false;
    var mediaQuery = window.matchMedia && window.matchMedia('print');

    function onMediaChange(event) {
        if (!event.matches) {
            runRestore();
        }
    }

    function runRestore() {
        if (restored) {
            return;
        }
        restored = true;
        restore();
        window.removeEventListener('afterprint', runRestore);
        if (mediaQuery) {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', onMediaChange);
            } else if (mediaQuery.removeListener) {
                mediaQuery.removeListener(onMediaChange);
            }
        }
    }

    window.addEventListener('afterprint', runRestore);
    if (mediaQuery) {
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', onMediaChange);
        } else if (mediaQuery.addListener) {
            mediaQuery.addListener(onMediaChange);
        }
    }
}

hidePrint(document.querySelector('main').children, ['app-container']);
hidePrint(document.getElementById('app-container').children, ['left-container']);
hidePrint(document.getElementById('left-container').children, ['main-container']);
hidePrint(document.getElementById('main-container').children, ['main-content-container']);

var printTheme = document.documentElement.dataset.pdfPrintTheme || 'unaware';
var themeSnapshot = null;

if (printTheme === 'unaware') {
    themeSnapshot = forceLightTheme();
    onPrintDone(function () {
        restoreTheme(themeSnapshot);
    });
}

window.print();
