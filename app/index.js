'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    chalk = require('chalk');


var XbarsGenerator = module.exports = function XbarsGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({
      skipInstall: options['skip-install'],
      callback: function () {
        this.spawnCommand('grunt', ['init']);
      }.bind(this)
     });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(XbarsGenerator, yeoman.generators.Base);

XbarsGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);
  console.log(chalk.magenta('Out of the box I include Express, Express Handlebars, Bootstrap, Modernizr, and a Gruntfile.js to build your app.'));

  var prompts = [{
    name: 'appname',
    message: 'Project name?'
  },
  {
    name: 'description',
    message: 'Description?',
    default: 'App.'
  },
  {
    name: 'author',
    message: 'Author name?',
    default: 'Jessica Frazelle'
  },
  {
    name: 'author_uri',
    message: 'Author website?',
    default: 'http://frazelledazzell.com'
  },
  {
    name: 'port',
    message: 'Port?',
    default: '5000'
  }];

  this.prompt(prompts, function (props) {
    this.appname = props.appname;
    this.description = props.description;
    this.author = props.author;
    this.author_uri = props.author_uri;
    this.port = props.port;

    cb();
  }.bind(this));
};

XbarsGenerator.prototype.gruntfile = function gruntfile() {
  this.copy('Gruntfile.js', 'Gruntfile.js');
};

XbarsGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

XbarsGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
};

XbarsGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
};

XbarsGenerator.prototype.h5bp = function h5bp() {
  this.copy('robots.txt', 'public/robots.txt');
  this.copy('favicon.ico', 'public/favicon.ico');
};

XbarsGenerator.prototype.appFiles = function appFiles() {
  this.template('app.js', 'app.js');
  this.template('main.html', 'views/layouts/main.html');
  this.write('views/index.html', '<p class="lead">Hello World</p>');
  this.write('views/404.html', '<h4>404</h4>');
  this.write('public/js/main.js', '');
};

XbarsGenerator.prototype.app = function app() {
  this.mkdir('public/css');
  this.mkdir('public/js');
  this.mkdir('public/img');
};