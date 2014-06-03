# run-[wintersmith](https://github.com/jnordberg/wintersmith)

This module exposes a really simple API for configuring and controlling the Wintersmith static site generator. This is useful if you use a task runner (like [gulp](https://github.com/gulpjs/gulp) or [Grunt](https://github.com/gruntjs/grunt)) with your static site workflow. This module will allow you to automatically compile assets and refresh the browser when you edit Markdown files or change something in the templates etc.

## Installation

1. Install via npm:

		npm install run-wintersmith --save

2.  Require it in your project:
	
		var runWintersmith = require('run-wintersmith');

4.  Call one of the API methods:
	
		runWintersmith.preview();
		// or
		runWintersmith.build();
		
		
## Usage with gulp

Please take a look at the `example-gulpfile.js` to see full usage example.

Feel free to get in touch if you need help setting it up.

## API

#### runWintersmith.preview()
Starts the Wintersmith site in preview mode, with default hostname and port. (`localhost:3000`)

#### runWintersmith.build()
Generates the Wintersmith site to the default directory. (`/build`)

## Configuration

The module has a few default settings. They can be overwritten in the following way:

	var runWintersmith = require('run-wintersmith');
	
	runWintersmith.settings.hostname = 'somehostname';
	runWintersmith.settings.port = 8080;
	runWintersmith.settings.configFile = 'myConfig.json';

**settings.configFile**:

Sets which Wintersmith configuration file to read from. Default is `config.json`.

**settings.hostname**:

Sets the server hostname. Default is `localhost`. Only used in `preview` mode.

**settings.port**:

Sets the server port. Default is `3000`. Only used in `preview` mode.

## Background

[Wintersmith](https://github.com/jnordberg/wintersmith) is an awesome static website generator. [gulp](https://github.com/gulpjs/gulp) is an equally awesome task runner. I like to use gulp in my Wintersmith project to handle 
everything - so I decided to share how I do it.

At first, I created `gulp-wintersmith` as gulp plugin to automate my development workflow with Wintersmith. But as I learned from the gulp core team: Creating a specific plugin to connect them, is in violation of the [gulp plugin guidelines](https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/guidelines.md) and of the spirit of creating non-specific modules.

So instead I made this module more generic, so it could be used in different contexts and not only with gulp.

## Feedback and contribution

I'm still new to creating and publishing modules, please let me know if you have any ideas or feedback to this module.

## License
MIT © Vanja Cosic
