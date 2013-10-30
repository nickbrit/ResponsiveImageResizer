/*!
 * Responsive Image Resizer v1.0.0
 *
 * Copyright 2013 Griffellab
 * http://griffellab.com
 * Released under the MIT license
 *
 * Responsive Image Resizer is an open source script.
 */

(function($){

$.fn.ResponsiveImageResizer = function(options){

	var settings = $.extend( {
      'width'         : '768, 992, 1200'
    }, options);

	var element = this;
	var newWidth;
	
	var ImageWidths = settings.width.replace(/ /g,'').split(','); 
	
	var thisImage = element;
	var thisImageSrc = element.attr('src');
	var thisExtension = thisImageSrc.substr(thisImageSrc.lastIndexOf('.') + 1, thisImageSrc.length - 1);
	var thisFilename = thisImageSrc.substr(0, thisImageSrc.lastIndexOf('.'));
	
	thisImage.attr('data-extension', thisExtension);
	thisImage.attr('data-filename', thisFilename);
	
	var WidthArray = ImageWidths;
	WidthArray.sort(function(a,b){return a-b});

	$(element).ready(function(){

		ImageResize();

		$(window).bind("resize", function(){
			ImageResize();
		});

		function ImageResize(){
			var windowWidth = $(window).width();
			if (windowWidth > WidthArray[WidthArray.length-1]) {
				element.attr('src', element.attr('data-filename') + '.' + element.attr('data-extension'));
			} else {
				$.each(WidthArray, function( index, value ) {
					if (windowWidth < value) {
						if (newWidth != value) {
							newWidth = value;
						}
						return false;
					}
				});
				element.attr('src', element.attr('data-filename') + '-' + newWidth + '.' + element.attr('data-extension'));
			}
		};
	});

};

})(jQuery);