var gulp = require('gulp');
var concat = require('gulp-concat'); // 合并文件
var uglify = require('gulp-uglify');  //压缩js

gulp.task('fileConcat',function(){
	gulp.src(['./js/jquery.easing.min.js','./js/jquery.slide.js','./js/jquery.snippet.min.js'])
		.pipe(concat('banner.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./release'))
})