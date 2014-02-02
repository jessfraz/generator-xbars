/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('jess generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('jess:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {
        var expected = [
            // add files you expect to exist here.
            '.bowerrc',
            '.gitignore',
            'app.js',
            'bower.json',
            'Gruntfile.js',
            'package.json',
            'public/js/bower_components/jquery/jquery.min.js',
            'public/js/lib/modernizr.js',
            'public/js/main.js',
            'public/css/styles.less',
            'views/404.html',
            'views/index.html',
            'views/layouts/main.html'
        ];

        helpers.mockPrompt(this.app, {
            'someOption': true
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });
});
