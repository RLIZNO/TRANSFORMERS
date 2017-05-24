/**
 * Inicialization of values and libs for task on gulp file
 * Inicializacio de los valores y librerias para las tareas del archivo gulp
 */
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename'),
	inject = require('gulp-inject'),
	clean = require('gulp-clean'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	imagemin = require('gulp-imagemin'),
	bowerFiles = require('main-bower-files'),
	angularFilesort = require('gulp-angular-filesort'),
	compass = require('gulp-compass'),
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
	connect = require('gulp-connect'),
	proxy = require('http-proxy-middleware'),
	templateCache = require('gulp-angular-templatecache'),
	paths = {
		sass: 'sass/**/*.scss',
		css: 'css/**/*.css',
		html: '*.html',
		template: 'app/**/*.html',
		js: 'app/**/*.js',
		fonts: 'fonts/**/*.{ttf,woff,eof,svg}',
		img: 'img/**/*.{gif,jpg,png,svg}',
		dist: './_build/',
		dev: './_dev/',
		url: 'http://localhost:7777/'
	};

/**
 *  @task default
 *  @description
 *  Tarea que se encarga de correr el comando gulp para construir el proyecto final en el directorio _build
 */
gulp.task('default', ['clean', 'inject:build'], function () {

});


/**
 *  @task sass:build
 *  @description
 *  Tarea que se encarga de correr el comando gulp dev para iniciar los 'watch' en el directorio _dev
 */
gulp.task('dev', ['connect', 'compass', 'inject'], function () {
	gulp.watch(paths.dev + paths.sass, ['compass', browserSync.reload]);
	gulp.watch([paths.dev + paths.sass, '!' + paths.dev + 'sass/main.scss'], ['imports']);
	gulp.watch(paths.dev + paths.html, ['inject', browserSync.reload]);
});

/**
 *  @task clean
 *  @description
 *  Tarea que se encarga de limpiar la carpeta _build
 */
gulp.task('clean', function () {
	return gulp.src(paths.dist, {
			read: false
		})
		.pipe(clean());
});

/**
 *  @task sass
 *  @description
 *  Tarea que se encarga de compillar los archivos sass para inyectar el  mani.css a _dev
 */
gulp.task('sass', ['imports'], function () {
	return gulp.src(paths.dev + paths.sass)
		.pipe(sass({
			sourceComments: true,
			outputStyle: 'expanded'
		}))
		.pipe(gulp.dest(paths.dev + 'css/'));
});

/**
 *  @task sass:build
 *  @description
 *  Tarea que se encarga de compillar los archivos sass para inyectar el  mani.css a _build
 */
gulp.task('sass:build', ['imports'], function () {
	return gulp.src(paths.dev + paths.sass)
		.pipe(sass({
			sourceComments: true,
			outputStyle: 'expanded'
		}))
		.pipe(gulp.dest(paths.dist + 'css/'));
});

/**
 *  @task compass
 *  @description
 *  Tarea que se encarga de compillar los archivos sass a css
 */
gulp.task('compass', ['imports'], function () {
	return gulp.src(paths.dev + paths.sass)
		.pipe(compass({
			importh_path: './_dev/bower_components',
			http_path: './',
			generated_images_path: '_dev/img',
			css: './_dev/css',
			sass: './_dev/sass',
			environment: 'development'
		}))
		.pipe(autoprefixer())
		.pipe(gulp.dest(paths.dev + 'css/'));
});

/**
 *  @task inject
 *  @description
 *  Tarea que se encarga de inyectar las dependencias css, js y bowe componentes en el index.html, pero antes esta tarea ejecuta una tarea js para la inyección. Solo desarrollo
 */
gulp.task('inject', function () {
	var target = gulp.src([paths.dev + paths.html]);
	var sources = gulp.src([paths.dev + paths.js, paths.dev + paths.css], {
		read: false
	});
	/*
		return target.pipe(inject(sources))
		.pipe(gulp.dest(paths.dev));*/
	return gulp.src(paths.dev + paths.html)
		.pipe(inject(gulp.src(bowerFiles(), {
			read: false,
			base: './_dev/bower_components'
		}), {
			name: 'bower',
			relative: true
		}))
		.pipe(inject(gulp.src(paths.dev + paths.css, {
			read: false
		}), {
			relative: true
		}))
		.pipe(inject(gulp.src([paths.dev + paths.js])
			.pipe(angularFilesort()), {
				relative: true
			}))
		.pipe(gulp.dest(paths.dev));
});


/**
 *  @task inject:build
 *  @description
 *  Tarea que se encarga de inyectar las dependencias css y js en el index.html, pero antes esta tarea ejecuta unos copies de archivos necesarios para la inyección. Solo producción
 */
gulp.task('inject:build', ['copy:fonts', 'copy:img', 'useref'], function () {
	gulp.start('templates');
});

/**
 *  @task css
 *  @description
 *  Tarea que se encarga de minificar el main.css en _build
 */
gulp.task('css', function () {
	return gulp.src(paths.dev + paths.css)
		.pipe(autoprefixer())
		.pipe(cssmin())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(paths.dist + 'css/'));
});

/**
 *  @task js
 *  @description
 *  Tarea que se encarga de minificar el app.js en _build
 */
gulp.task('js', function () {
	return gulp.src(paths.dev + paths.js)
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(paths.dist + 'js/'));
});

/**
 *  @task copy:fonts
 *  @description
 *  Tarea que se encarga de copiar los archivos fonts desde _dev a _build 
 */
gulp.task('copy:fonts', function () {
	return gulp.src(paths.dev + paths.fonts)
		.pipe(gulp.dest(paths.dist + 'fonts/'));
});

/**
 *  @task copy:img
 *  @description
 *  Tarea que se encarga de copiar los archivos img desde _dev a _build 
 */
gulp.task('copy:img', ['zipimg'], function () {
	return gulp.src(paths.dev + paths.img)
		.pipe(gulp.dest(paths.dist + 'img'));
});

/**
 *  @task zipimg
 *  @description
 *  Tarea que se encarga de comprimir las imagenes para _build
 */
gulp.task('zipimg', function () {
	return gulp.src(paths.dev + paths.img)
		.pipe(imagemin())
		.pipe(gulp.dest(paths.dist + 'img'));
});

/**
 *  @task copy:html
 *  @description
 *  Tarea que se encarga de copiar todos los archivos html de _dev a _build
 */
gulp.task('copy:html', function () {
	return gulp.src(paths.dev + paths.template)
		.pipe(gulp.dest(paths.dist));
});


/**
 *  @task imports
 *  @description
 *  Tarea que se encarga de importar los archivos sass a main.css
 */
gulp.task('imports', function () {
	var sources = gulp.src(['!' + paths.dev + 'sass/general/*.scss', '!' + paths.dev + 'sass/features/**/_media*.scss', '!' + paths.dev + 'sass/main.scss', paths.dev + 'sass/**/*.scss']),
		target = gulp.src(paths.dev + 'sass/main.scss');
	return target.pipe(inject(sources, {
			starttag: '/* inject:imports */',
			endtag: '/* endinject */',
			relative: true,
			transform: function (filepath) {
				return '@import "' + filepath + '";';
			}
		}))
		.pipe(gulp.dest(paths.dev + 'sass/'));
});

/**
 *  @task connect
 *  @description
 *  Tarea que se encarga de habilitar un servidor para correr el proyecto en desarrollo habilitando servicios expuestos en el servidor
 */
gulp.task('connect', function () {
	connect.server({
		port: 7777,
		root: '_dev/',
		middleware: function (connect, opt) {
			return [proxy('/BHDL_', {
				target: 'http://172.17.103.210:10039/',
				changeOrigin: true
				//auth: argv.auth || (config.server.user + ':' + config.server.pass)
			})];
		}
	});
		browserSync({
		proxy: paths.url
	});
});


/**
 *  @task useref
 *  @description
 *  Tarea que se encarga de concatenar y minificar los archivos css y js para _build 
 */
gulp.task('useref', function (done) {
	gulp.src(paths.dev + paths.html)
		.pipe(useref())
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', cssmin()))
		.pipe(gulp.dest(paths.dist))
		.on('end', done);
});

/**
 *  @task templates:generate
 *  @description
 *  Tarea encargada de tomar todos los archivos html del proyecto y los incluimos en un solo archivo templates.js 
 */
gulp.task('templates:generate', function () {
	return gulp.src(paths.dev + paths.template)
		.pipe(templateCache({
			module: 'app',
			root: 'app/'
		}))
		.pipe(gulp.dest(paths.dist + 'js/'));
});

/**
 *  @task templates
 *  @description
 *  Tarea encargada de agregar al archivo app.min.js el templates.js generado y limpiarlo.
 */
gulp.task('templates', ['templates:generate'], function () {
	return gulp.src([paths.dist + 'js/app.min.js', paths.dist + 'js/templates.js'])
		.pipe(concat('app.min.js'))
		.pipe(gulp.dest(paths.dist + 'js/'))
		.pipe(cleantemplate());

	function cleantemplate() {
		return gulp.src(paths.dist + 'js/templates.js')
			.pipe(clean());
	}

});

