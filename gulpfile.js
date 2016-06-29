var gulp = require('gulp'),
	livereload = require('gulp-livereload'), //网页自动刷新
    webserver = require('gulp-webserver'),   //静态服务器
    uglify = require('gulp-uglify'),   //js代码压缩
    sass = require('gulp-sass'),   //js代码压缩
    cleancss = require('gulp-clean-css'),   //css代码压缩
    autoprefixer = require('gulp-autoprefixer'),   //css后缀补全
    concat = require('gulp-concat'),   //文件合并
    imagemin = require('gulp-imagemin'),   //文件合并
    // revcollector = require('gulp-rev-collector'),   //修改模板中版本号
    // rev = require('gulp-rev'),   //追加版本号
    clean = require('gulp-clean'),   //清空文件夹
    rename = require('gulp-rename');   //文件名重写
//压缩js 文件，压缩后文件放入build/js下   
gulp.task('js',function(){
    gulp.src('./src/js/*.js')
    .pipe(gulp.dest('./build/js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./build/js'))
});
//压缩img文件，压缩后文件放入build/img下   
gulp.task('img',function(){
    gulp.src('./src/img/*.{png,jpg,gif,ico}')
    .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./build/img'))
});

//压缩css 文件，压缩后文件放入build/css下   
gulp.task('css', function() {
	gulp.src('./src/css/index.scss')
    .pipe(sass())
    .pipe(autoprefixer({
            browsers: ['last 2 versions','ie 6','ie 7','ie 8','ie 9','Firefox < 20','last 2 Explorer versions'],
            cascade: true
        }))
    .pipe(gulp.dest('./build/css'))
    .pipe(cleancss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./build/css'))
});
//生成html 文件
gulp.task('html', function() {
  gulp.src('./src/html/*.html')
    // .pipe(uglify())
    .pipe(gulp.dest('./build/html'))
});
// 注册任务
gulp.task('webserver', function() {
  gulp.src( './' ) // 服务器目录（./代表根目录）
  .pipe(webserver({ // 运行gulp-webserver
    livereload: true, // 启用LiveReload
    open: true // 服务器启动时自动打开网页
  }));
});

// 监听任务
gulp.task('watch',function(){
 		// 监听html
        gulp.watch('./src/html/*.html', function(){
            gulp.run('html');
        })
        // 监听css
        gulp.watch('./src/css/*.scss', function(){
            gulp.run('css');
        });

        // // 监听images
        gulp.watch('./src/img/**', function(){
            gulp.run('img');
        });
        // 监听js
        gulp.watch('./src/js/*.js', function(){
            gulp.run('js');
        });
});
 		
// 默认任务
gulp.task('default', ['webserver','watch'], function(){
            gulp.start('html','img','css','js');
        });