(function(e){e.fn.farbtastic=function(f){e.farbtastic(this,f);return this};e.farbtastic=function(f,l){f=e(f).get(0);return f.farbtastic||(f.farbtastic=new e._farbtastic(f,l))};e._farbtastic=function(f,l){var a=this;e(f).html('<div class="farbtastic"><div class="color"></div><div class="wheel"></div><div class="overlay"></div><div class="h-marker marker"></div><div class="sl-marker marker"></div></div>');var k=e(".farbtastic",f);a.wheel=e(".wheel",f).get(0);a.radius=84;a.square=100;a.width=194;navigator.appVersion.match(/MSIE [0-6]\./)&&
e("*",k).each(function(){if(this.currentStyle.backgroundImage!="none"){var b=this.currentStyle.backgroundImage;b=this.currentStyle.backgroundImage.substring(5,b.length-2);e(this).css({backgroundImage:"none",filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='"+b+"')"})}});a.linkTo=function(b){typeof a.callback=="object"&&e(a.callback).unbind("keyup",a.updateValue);a.color=null;if(typeof b=="function")a.callback=b;else if(typeof b=="object"||typeof b=="string"){a.callback=
e(b);a.callback.bind("keyup",a.updateValue);a.callback.get(0).value&&a.setColor(a.callback.get(0).value)}return this};a.updateValue=function(){this.value&&this.value!=a.color&&a.setColor(this.value)};a.setColor=function(b){var c=a.unpack(b);if(a.color!=b&&c){a.color=b;a.rgb=c;a.hsl=a.RGBToHSL(a.rgb);a.updateDisplay()}return this};a.setHSL=function(b){a.hsl=b;a.rgb=a.HSLToRGB(b);a.color=a.pack(a.rgb);a.updateDisplay();return this};a.widgetCoords=function(b){var c=e(a.wheel).offset();return{x:b.pageX-
c.left-a.width/2,y:b.pageY-c.top-a.width/2}};a.mousedown=function(b){if(!document.dragging){e(document).bind("mousemove",a.mousemove).bind("mouseup",a.mouseup);document.dragging=true}var c=a.widgetCoords(b);a.circleDrag=Math.max(Math.abs(c.x),Math.abs(c.y))*2>a.square;a.mousemove(b);return false};a.mousemove=function(b){var c=a.widgetCoords(b);if(a.circleDrag){b=Math.atan2(c.x,-c.y)/6.28;if(b<0)b+=1;a.setHSL([b,a.hsl[1],a.hsl[2]])}else{b=Math.max(0,Math.min(1,-(c.x/a.square)+0.5));c=Math.max(0,Math.min(1,
-(c.y/a.square)+0.5));a.setHSL([a.hsl[0],b,c])}return false};a.mouseup=function(){e(document).unbind("mousemove",a.mousemove);e(document).unbind("mouseup",a.mouseup);document.dragging=false};a.updateDisplay=function(){var b=a.hsl[0]*6.28;e(".h-marker",k).css({left:Math.round(Math.sin(b)*a.radius+a.width/2)+"px",top:Math.round(-Math.cos(b)*a.radius+a.width/2)+"px"});e(".sl-marker",k).css({left:Math.round(a.square*(0.5-a.hsl[1])+a.width/2)+"px",top:Math.round(a.square*(0.5-a.hsl[2])+a.width/2)+"px"});
e(".color",k).css("backgroundColor",a.pack(a.HSLToRGB([a.hsl[0],1,0.5])));if(typeof a.callback=="object"){e(a.callback).css({backgroundColor:a.color,color:a.hsl[2]>0.5?"#000":"#fff"});e(a.callback).each(function(){if(this.value&&this.value!=a.color)this.value=a.color})}else typeof a.callback=="function"&&a.callback.call(a,a.color)};a.pack=function(b){var c=Math.round(b[0]*255),d=Math.round(b[1]*255);b=Math.round(b[2]*255);return"#"+(c<16?"0":"")+c.toString(16)+(d<16?"0":"")+d.toString(16)+(b<16?"0":
"")+b.toString(16)};a.unpack=function(b){if(b.length==7)return[parseInt("0x"+b.substring(1,3))/255,parseInt("0x"+b.substring(3,5))/255,parseInt("0x"+b.substring(5,7))/255];else if(b.length==4)return[parseInt("0x"+b.substring(1,2))/15,parseInt("0x"+b.substring(2,3))/15,parseInt("0x"+b.substring(3,4))/15]};a.HSLToRGB=function(b){var c,d=b[0];c=b[1];b=b[2];c=b<=0.5?b*(c+1):b+c-b*c;b=b*2-c;return[this.hueToRGB(b,c,d+0.33333),this.hueToRGB(b,c,d),this.hueToRGB(b,c,d-0.33333)]};a.hueToRGB=function(b,c,
d){d=d<0?d+1:d>1?d-1:d;if(d*6<1)return b+(c-b)*d*6;if(d*2<1)return c;if(d*3<2)return b+(c-b)*(0.66666-d)*6;return b};a.RGBToHSL=function(b){var c,d,m,g,h=b[0],i=b[1],j=b[2];c=Math.min(h,Math.min(i,j));b=Math.max(h,Math.max(i,j));d=b-c;g=(c+b)/2;m=0;if(g>0&&g<1)m=d/(g<0.5?2*g:2-2*g);c=0;if(d>0){if(b==h&&b!=i)c+=(i-j)/d;if(b==i&&b!=j)c+=2+(j-h)/d;if(b==j&&b!=h)c+=4+(h-i)/d;c/=6}return[c,m,g]};e("*",k).mousedown(a.mousedown);a.setColor("#000000");l&&a.linkTo(l)}})(jQuery);
;
/**
 * @file
 */

(function ($) {
  'use strict';

  /*
   *  Bind the colorpicker event to the form element
   */
  Drupal.behaviors.calendar_colorpicker = {
    attach: function (context) {
      $('.edit-calendar-colorpicker').on('focus', function () {
        var edit_field = this;
        var picker = $(this).closest('div').parent().find('.calendar-colorpicker');

        // Hide all color pickers except this one.
        $('.calendar-colorpicker').hide();
        $(picker).show();
        $.farbtastic(picker, function (color) {
          edit_field.value = color;
        }).setColor(edit_field.value);
      });
    }
  };
})(jQuery);
;