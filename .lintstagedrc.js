const path = require('path')

const buildEslintCommand = (filenames) => {
    const cwd = process.cwd();
    let rootCwd = cwd;

    if (cwd.includes('submodules')) {
        rootCwd = path.resolve(cwd, '../../');

        return `next lint --dir ${rootCwd} --fix --file ${filenames
            .map((f) => path.relative(cwd, f))
            .join(' --file ')}`;
    };
}

module.exports = {
    '*.{js,jsx,ts,tsx}': [buildEslintCommand],
}