/* eslint-disable */
var gulp = require('gulp'),
	// general
	sourcemaps = require('gulp-sourcemaps'),
	filter = require('gulp-filter'),
	livereload = require('gulp-livereload'),
	glob = require('glob'),
	merge = require('utils-merge'),
	gutil = require('gulp-util'),
	chalk = require('chalk'),
	duration = require('gulp-duration'),
	guppy = require('git-guppy')(gulp),
	git = require('gulp-git'),
	gulpFunction = require('gulp-function'),
	Q = require('q'),
	notify = require('gulp-notify'),
	es = require('event-stream'),
	// css
	postcss = require('gulp-postcss'),
	precss = require('precss'),
	autoprefixer = require('autoprefixer'),
	cssnext = require('postcss-cssnext'),
	mixins = require('postcss-mixins'),
	cssnano = require('cssnano'),
	math = require('postcss-math'),
	// js
	browserify = require('browserify'),
	babelify = require('babelify'),
	watchify = require('watchify'),
	source = require('vinyl-source-stream'),
	uglify = require('gulp-uglify'),
	buffer = require('vinyl-buffer')

/*
// :::Tasks
//-------------------------------------------------- */

gulp.task('watch', function(done) {
	livereload.listen()
	gulp.watch('./src/css/*.css', ['css'])
	startBundle(false, done)
})

gulp.task('default', ['css', 'watch'])
gulp.task('pre-commit', ['production'])
gulp.task('production', ['css', 'js-production'])
gulp.task('js-production', function(done) {
	startBundle(true, done)
})

/*
// :::CSS
//-------------------------------------------------- */

gulp.task('css', function() {
	var processors = [
		precss,
		mixins,
		math,
		autoprefixer({ browsers: ['last 2 versions', 'Safari >= 8'] }),
		cssnano,
	]
	return (
		gulp
			.src(['./src/css/*.css', '!./src/css/_*.css'])
			.pipe(sourcemaps.init())
			.pipe(postcss(processors).on('error', mapError))
			// .pipe(nano().on('error', mapError))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest('./assets/'))
			.pipe(filter('**/*.css'))
			// .pipe(notify({
			// 	message: 'Generated file: <%= file.relative %>',
			// })) // Output the file being created
			.pipe(livereload())
	)
})

/*
// :::Javascript
//-------------------------------------------------- */

function startBundle(production, done) {
	if (gutil.env.production || production)
		gutil.log(chalk.blue('***** Minifying for production *****'))

	glob('./src/js/*.js', (err, files) => {
		if (err) {
			done(err)
		}
		console.log(files)
		const args = merge(watchify.args, { debug: true, fullPaths: true })
		const tasks = files.map(entry => {
			const bundler = browserify(entry, args).transform(babelify, {
				presets: ['es2015'],
				sourceMaps: true,
			}) // Babel tranforms

			if (!production)
				bundler.plugin(watchify, {
					ignoreWatch: ['**/node_modules/**', '**/bower_components/**'],
				}) // Watchify to watch source file changes

			bundler.on('update', function() {
				makeBundle(bundler, entry, production) // Re-run bundle on source updates
			})

			return makeBundle(bundler, entry, production) // Run the bundle the first time (required for Watchify to kick in)
		})
		es.merge(tasks).on('end', () => {
			if (production) {
				addCompiled()
			}

			done()
		})
	})
}

function makeBundle(bundler, entry, production) {
	var bundleTimer = duration('Javascript bundle time')
	const filename = entry.replace(/^.*[\\\/]/, '')
	return (
		bundler
			.bundle()
			.on('error', mapError) // Map error reporting
			.pipe(source(filename)) // Set source name
			.pipe(buffer()) // Convert to gulp pipeline
			.pipe(sourcemaps.init({ loadMaps: true })) // Extract the inline sourcemaps
			.pipe(
				gutil.env.production || production === true
					? uglify().on('error', mapError)
					: gutil.noop(),
			)
			.pipe(
				gutil.env.production || production === true
					? uglify().on('error', mapError)
					: gutil.noop(),
			)
			.pipe(sourcemaps.write('.')) // Set folder for sourcemaps to output to
			.pipe(gulp.dest('./assets/')) // Set the output folder
			.pipe(filter('**/*.js'))
			// .pipe(notify({
			// 	message: 'Generated file: <%= file.relative %>',
			// })) // Output the file being created
			.pipe(bundleTimer) // Output time timing of the file creation
			// .pipe((production === true) ? gulpFunction(addCompiled) : gutil.noop())
			.pipe(livereload())
	) // Reload the view in the browser
}

function addCompiled() {
	var done = Q.defer()
	gutil.log(chalk.magenta('***** Adding minified files to commit *****'))
	gulp.src(['./assets/*', './src/js/*']).pipe(git.add({ args: '--verbose' }))
	done.resolve()
	return done.promise
}

// Error reporting function
function mapError(err) {
	gutil.log(err)
	// why donna this work?
	// notify({
	//  	message: `Compile error!\n${err}`,
	// })
	if (err.fileName) {
		// Regular error
		gutil.log(
			chalk.red(err.name) +
				': ' +
				chalk.yellow(err.fileName.replace(__dirname + '/src/js/', '')) +
				': ' +
				'Line ' +
				chalk.magenta(err.lineNumber) +
				' & ' +
				'Column ' +
				chalk.magenta(err.columnNumber || err.column) +
				': ' +
				chalk.blue(err.description),
		)
	} else {
		// Browserify error..
		gutil.log(chalk.red(err.name) + ': ' + chalk.yellow(err.message))
	}
	gutil.log(chalk.yellow(err.message))
	this.emit('end')
}
