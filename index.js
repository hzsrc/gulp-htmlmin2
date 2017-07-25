var through = require('through2');
var path = require('path');
module.exports = function (options) {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {

        }
        else if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
        }
        else if (file.isBuffer()) {
            var oldLen = file.contents.length;

            var content = process(file.contents.toString(), options || {});
            file.contents = new Buffer(content);

            var delta = oldLen - file.contents.length;
            if (delta > 0 && !options.noLog) {
                var fn = file.history[0] || '';
                fn = path.basename(fn);
                console.log('gulp-htmlmin2:\t' + fn + '\t' + delta + ' bytes droped');
            }
        }

        this.push(file);

        cb();

        function process(js, opt) {
            if (opt.need) {
                js = js.replace(/<!\-\-[\s\S]*?\-\->/g, '')
                    .replace(/>\s+/g, "> ")
                    .replace(/\s+</g, " <")
                    .replace(/\s{2,}(\S+=["'])/g, ' $1');
            }
            return js;
        }
    });
};