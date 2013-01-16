describe('BlogPostService', function() {

    beforeEach(module('Services'));

    afterEach(function() {
        jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));
    });


    describe('BlogPostList', function() {
        var data = getJSONFixture('blog-post-list.json'),
            responseData;

        it('should send get request to "rest/blog"', inject(function($injector) {
            var $httpBackend = $injector.get('$httpBackend'),
                BlogPostService = $injector.get("BlogPostService");

            $httpBackend.expectGET('rest/blog').respond(data);

            BlogPostService.fetchBlogPosts().
                success(function(data) {
                    responseData = data;
                });
            $httpBackend.flush();
        }));

        it("expect two blog posts", function() {
            expect(responseData.length).toEqual(2);
        });
    });


    describe('BlogPost', function() {
        var data = getJSONFixture('blog-post.json'),
            responseData;

        it('should send get request to "rest/blog/xyz"', inject(function($injector) {
            var $httpBackend = $injector.get('$httpBackend'),
                BlogPostService = $injector.get("BlogPostService");

            $httpBackend.expectGET('rest/blog/xyz').respond(data);

            BlogPostService.fetchBlogPost('xyz').
                success(function(data) {
                    responseData = data;
                });
            $httpBackend.flush();
        }));

        it("expect response data to equal data", function() {
            expect(responseData).toEqual(data);
        });
    });

});
