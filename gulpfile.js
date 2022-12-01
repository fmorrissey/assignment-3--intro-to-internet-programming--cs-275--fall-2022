
const { src, dest, series, watch } = require(`gulp`),
    babel = require(`gulp-babel`),
    htmlCompressor = require(`gulp-htmlmin`),
    htmlValidator = require(`gulp-html`),
    jsCompressor = require(`gulp-uglify`),
    jsValidator= require(`gulp-eslint`),
    cssCompressor = require('gulp-clean-css'),
    cssValidator = require('gulp-stylelint'),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;

let browserChoice = `default`;
async function chrome () {
    browserChoice = `google chrome`;
}
let compressHTML = () => {
    return src([`index.html`])
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

let validateHTML = () => {
    return src([
        `index.html`])
        .pipe(htmlValidator());
};

let lintJS = () => {
    return src([`js/msin.js`])
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
};

let compressCSS = () => {
    return src([`styles/main.css`])
    .pipe(cssCompressor({collapseWhitespace: true}))
    .pipe(dest(`prod`));
};

let validateCSS = () => {
    return src([
        `styles/main.css`])
        .pipe(cssValidator());
};

let transpileJSForDev = () => {
    return src(`js/main.js`)
        .pipe(babel())
        .pipe(dest(`temp/js`));
};

let transpileJSForProd = () => {
    return src(`js/main.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        browser: browserChoice,
        server: {
            baseDir: [
                `temp`,
                `.`
            ]
        }
    });

    watch('main.css`, series('lintCSS', 'compressCSS').on(`change`, reload);
    watch(`main.js`, series('lintJS','transpileJSForDev').on(`change`, reload);

};
exports.chrome = series(chrome, serve);
exports.compressHTML = compressHTML;
exports.lintJS = compressCSS;
exports.compressorCSS = cssCompressor;
exports.lintCSS =validateCSS;
exports.transpileJSForDev = transpileJSForDev;
exports.transpileJSForProd = transpileJSForProd;
exports.serve = series(
    lintJS,
    compressHTML,
    transpileJSForProd,
    compressCSS,
    transpileJSForDev,
    serve
);
