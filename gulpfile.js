
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
//Call browser
async function chrome () {
    browserChoice = `google chrome`;
}

async function firefox () {
    browserChoice = `firefox`;
}

//HTML
let compressHTML = () => {
    return src([`*.html`])
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

let validateHTML = () => {
    return src([
        `*.html`])
        .pipe(htmlValidator());
};

//JS
let validateJS = () => {
    return src([
        `js/*.js`,
        `js/**/*.js`])
        .pipe(jsValidator())
        .pipe(jsValidator.formatEach(`compact`));
};

// css
let compressCSS = () => {
    return src([`css/*.css`, `css/**/*.css`])
    .pipe(cssCompressor({collapseWhitespace: true}))
    .pipe(dest(`prod`));
};

let validateCSS = () => {
    return src([
        `css/*.css`,
        `ss/**/*.css`])
        .pipe(cssValidator());
};

let transpileJSForDev = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(dest(`temp/js`));
};

let transpileJSForProd = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/scripts`));
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

    watch(`*.html`, validateHTmL).on(`change`, reload);
    watch(`css/*.css`, validateCSS).on(`change`, reload);
    watch(`js/*.js`, validateJS,transpileJSForDev).on(`change`, reload);

};
exports.chrome = series(chrome, serve);
exports.firefox = series(firefox, serve);
exports.compressHTML = compressHTML;
exports.validateHTML = validateHTML;
exports.compressJS = compressCSS;
exports.validateJS =validateCSS;
exports.compressorCSS = cssCompressor;
exports.validateCSS =validateCSS;
exports.transpileJSForDev = transpileJSForDev;
exports.transpileJSForProd = transpileJSForProd;
exports.serve = series(
    validateHTML,
    validateJS,
    validateCSS,
    transpileJSForDev,
    serve
);
