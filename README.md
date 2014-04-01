angular-algorithms
==================

A collection of algorithms implemented in AngularJS.

## Goals

* Build algorithms in JS 
* Expose limitations of JS when building algorithms
* Write tests using Karma (on top of Jasmine) to verify code
* Experiment with different browsers to see where subtle JS changes affect algorithms
* Collect timing information and graph timing information (using Flot.js)
* Optionally support different algorithms for a problem set to experiment and see timing
* Verify and expose Big-O analysis 

## Algorithms

- [ ] Calculate e
- [ ] Sieve of Erasothenes
- [ ] Quick sort
- [ ] Bubble sort

### Tools you should have

* Karma Runner: http://karma-runner.github.io/0.12/index.html
* Pow/Powder: http://pow.cx
* RVM: http://RVM.io
* Rack
* Ruby

### How it works

* Guard file builds `topics.json` 
* Web server

## Build your own algorithms

* Fork the repository
* `bundle` to install the gems
* Run guard: `bundle exec guard` to automatically regenerate
* Run the tests: `karma start karma.js`
* Make sure all the tests pass
* Delete the implementation files in `coffee` which define all the code for passing tests
* Write your own implementations for the tests


