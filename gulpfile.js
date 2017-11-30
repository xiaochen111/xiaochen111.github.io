var gulp = require('gulp');
var concat = require('gulp-concat'); // 合并文件
var uglify = require('gulp-uglify');  //压缩js

var less = require('gulp-less'); //处理less文件
var cssmin = require('gulp-cssmin'); //css文件压缩
var autoprefixer = require('gulp-autoprefixer'); //添加css私有前缀



gulp.task('fileConcat',function(){
	console.log('1')
	gulp.src(['./js/jquery.easing.min.js','./js/jquery.slide.js','./js/jquery.snippet.min.js'])
		.pipe(concat('banner.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./release'))
})

gulp.task('less',function(){
	gulp.src('./css/*.less')  // './css/**/*.less' 表示css目录下的所有目录的less文件
		// 借助less
        .pipe(less())
		.pipe(cssmin({compatibility: 'ie7'}))
		.pipe(autoprefixer())
		.pipe(gulp.dest('./css'))
})

gulp.task('watch',function(){
	console.log('3')
	gulp.watch('./css/*.less',['less']); // 监听less文件 如果less文件发生变化 立即执行"less"任务
})


gulp.task('default',['fileConcat','less','watch'])