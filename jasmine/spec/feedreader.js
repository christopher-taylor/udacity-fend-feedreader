/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the (allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have well formed URLs', function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url).toEqual(jasmine.any(String));
                expect(feed.url).not.toBe('');
            })
        });

        it('have well formed names', function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name).toEqual(jasmine.any(String));
                expect(feed.name).not.toBe('');
            });
        });
    });


    describe('The menu', function(){
        var theMenu = $(document.body);

        it('is hidden by default', function(){
            expect(theMenu.hasClass('menu-hidden')).toBe(true);
        });

        it('toggles visibility when clicked', function(){
            var menuIcon = $('.menu-icon-link');
            menuIcon.trigger('click');
            expect(theMenu.hasClass('menu-hidden')).toBe(false);
            menuIcon.trigger('click');
            expect(theMenu.hasClass('menu-hidden')).toBe(true);
        })
    });

    describe('Initial Entries', function(){
        /* TODO: Write a test that ensures when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        * Remember, loadFeed() is asynchronous so this test will require
        * the use of Jasmine's beforeEach and asynchronous done() function.
        */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('has at least one story', function(done){
            expect($('.feed').children().length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {

    	var feedIndex = 0;
    	var feeds = [];

    	// save a copy of the link text for allFeeds[1] and allFeeds[2] in feeds[]
    	beforeEach(function(done) {
    		loadFeed(feedIndex++, function() {
    			feeds.push( $('.feed .entry-link .entry')[0]);
    			done();
    		});
    	});

    	it('first feed is loaded', function(done) {
    		expect($('.feed .entry-link .entry').length).toBeGreaterThan(0);
    		done();
    	});


    	it('second is loaded with different content than the first', function(done) {
    		expect(feeds[0].innerHTML).not.toBe(feeds[1].innerHTML);
    		done();
    		// return to the Udacity feed
    		loadFeed(0);
    	});

    });
}());
