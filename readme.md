# gulp-htmlmin2

A simple html minimize tool, just drop empties and comments.

###Config in gulp
Use like this:

	gulp.task('view', function () {
    	return gulp.src("*.html")
	        .pipe($.htmlmin2({need: true}))
	        ...pipe other processes...
	});

### Option
need=[false]: Need to minimize html files or not. Set it to true if you want to minimize html files.

noLog=[false]: No logs.
