var dir = `app/eee`

module.exports = function (grunt) {
  // 配置任务
  grunt.initConfig({
    secret: grunt.file.readJSON('secret.json'),
    scp: {
      options: {
        host: '<%= secret.host %>',
        username: '<%= secret.username %>',
        password: '<%= secret.password %>'
      },
      // 全量上传
      all_scp: {
        files: [{
          cwd: 'dist/',
          src: ['**/*', '!node_modules/**'],
          filter: 'isFile',
          dot: true,
          dest: `/home/<%= secret.username %>/${dir}/`
        }]
      }
      // // 上传前端代码
      // app_scp: {
      //   files: [{
      //     cwd: 'dist/app-ide/app/',
      //     src: '**/*',
      //     filter: 'isFile',
      //     dest: `/home/kk/${dir}/app-ide/app/`
      //   }]
      // },
      // // 上传后台代码
      // server_scp: {
      //   files: [{
      //     cwd: 'dist/app-ide/server',
      //     src: '**/*',
      //     filter: 'isFile',
      //     dot: true,
      //     dest: `/home/kk/${dir}/app-ide/server`
      //   }]
      // },
    },
    sshexec: {
      options: {
        host: '<%= secret.host %>',
        username: '<%= secret.username %>',
        password: '<%= secret.password %>'
      },
      // 删除项目文件夹
      clean_all: {
        command: `rm -rf ~/${dir}`
      },
      // 删除项目的前端app文件夹
      // clean_app: {
      //   command: `mkdir -p ~/${dir}/app-ide && cd ~/${dir}/app-ide && rm -rf app`
      // },
      // // 删除项目的涉及后台的文件、文件夹
      // clean_server: {
      //   command: `mkdir -p ~/${dir}/app-ide && cd ~/${dir}/app-ide && rm -rf server`
      // },
      // 安装项目依赖
      install: {
        command: `cd ~/${dir} && npm install`
      },
      // 通过pm2 reload 重启项目
      reload_server: {
        command: `cd ~/${dir} && npm run reload`
      }
      // 通过pm2 reload 重启项目
      // start_server: {
      //   command: `cd ~/${dir} && npm start`
      // }
    }
  });

  // 加载任务
  grunt.loadNpmTasks('grunt-scp');
  grunt.loadNpmTasks('grunt-ssh');

  // // 上传前端代码
  // grunt.registerTask('upload-app', ['sshexec:clean_app', 'scp:app_scp'])
  // // 上传后台代码, 并启动项目
  // grunt.registerTask('upload-server', ['sshexec:clean_server', 'scp:server_scp', 'sshexec:install', 'sshexec:reload_server'])
  // 全量更新
  grunt.registerTask('upload', [
    'sshexec:clean_all', 
    'scp:all_scp', 
    'sshexec:install', 
    'sshexec:reload_server'
  ])
};
