// iGlobal Welcome Mat Script
// Authored by iGlobal Stores (www.iglobalstores.com)
// Copyright iGlobal Stores 2015

//
// Store specific settings
//
// Replace with your domain
var ig_cookieDomain = window.location.hostname;// If you prefer, you can put your domain here, like so "yourdomain.com";
// All countries, including the US
var ig_countries = {"AF":"Afghanistan","AL":"Albania","DZ":"Algeria","AS":"American Samoa","AD":"Andorra","AO":"Angola","AI":"Anguilla","AG":"Antigua","AR":"Argentina","AM":"Armenia","AW":"Aruba","AU":"Australia","AT":"Austria","AZ":"Azerbaijan","BS":"Bahamas","BH":"Bahrain","BD":"Bangladesh","BB":"Barbados","BY":"Belarus","BE":"Belgium","BZ":"Belize","BJ":"Benin","BM":"Bermuda","BT":"Bhutan","BO":"Bolivia","BQ":"Bonaire, St. Eustatius & Saba","BA":"Bosnia & Herzegovina","BW":"Botswana","BR":"Brazil","BN":"Brunei","BG":"Bulgaria","BF":"Burkina Faso","BI":"Burundi","KH":"Cambodia","CM":"Cameroon","CA":"Canada","IC":"Canary Islands","CV":"Cape Verde","KY":"Cayman Islands","CF":"Central African Republic","TD":"Chad","CL":"Chile","CN":"China - People's Republic of","CO":"Colombia","KM":"Comoros","CG":"Congo","CK":"Cook Islands","CR":"Costa Rica","HR":"Croatia","CW":"Curaçao","CY":"Cyprus","CZ":"Czech Republic","DK":"Denmark","DJ":"Djibouti","DM":"Dominica","DO":"Dominican Republic","EC":"Ecuador","EG":"Egypt","SV":"El Salvador","GQ":"Equatorial Guinea","ER":"Eritrea","EE":"Estonia","ET":"Ethiopia","FK":"Falkland Islands","FO":"Faroe Islands (Denmark)","FJ":"Fiji","FI":"Finland","FR":"France","GF":"French Guiana","GA":"Gabon","GM":"Gambia","GE":"Georgia","DE":"Germany","GH":"Ghana","GI":"Gibraltar","GR":"Greece","GL":"Greenland (Denmark)","GD":"Grenada","GP":"Guadeloupe","GU":"Guam","GT":"Guatemala","GG":"Guernsey","GN":"Guinea","GW":"Guinea-Bissau","GY":"Guyana","HT":"Haiti","HN":"Honduras","HK":"Hong Kong","HU":"Hungary","IS":"Iceland","IN":"India","ID":"Indonesia","IQ":"Iraq","IE":"Ireland - Republic Of","IL":"Israel","IT":"Italy","CI":"Ivory Coast","JM":"Jamaica","JP":"Japan","JE":"Jersey","JO":"Jordan","KZ":"Kazakhstan","KE":"Kenya","KI":"Kiribati","KR":"Korea, Republic of (South Korea)","KW":"Kuwait","KG":"Kyrgyzstan","LA":"Laos","LV":"Latvia","LB":"Lebanon","LS":"Lesotho","LR":"Liberia","LI":"Liechtenstein","LT":"Lithuania","LU":"Luxembourg","MO":"Macau","MK":"Macedonia","MG":"Madagascar","MW":"Malawi","MY":"Malaysia","MV":"Maldives","ML":"Mali","MT":"Malta","MH":"Marshall Islands","MQ":"Martinique","MR":"Mauritania","MU":"Mauritius","YT":"Mayotte","MX":"Mexico","FM":"Micronesia - Federated States of","MD":"Moldova","MC":"Monaco","MN":"Mongolia","ME":"Montenegro","MS":"Montserrat","MA":"Morocco","MZ":"Mozambique","MM":"Myanmar","NA":"Namibia","NR":"Nauru, Republic of","NP":"Nepal","NL":"Netherlands (Holland)","NV":"Nevis","NC":"New Caledonia","NZ":"New Zealand","NI":"Nicaragua","NE":"Niger","NG":"Nigeria","NU":"Niue Island","NF":"Norfolk Island","MP":"Northern Mariana Islands","NO":"Norway","OM":"Oman","PK":"Pakistan","PW":"Palau","PA":"Panama","PG":"Papua New Guinea","PY":"Paraguay","PE":"Peru","PH":"Philippines","PL":"Poland","PT":"Portugal","PR":"Puerto Rico","QA":"Qatar","RE":"Reunion","RO":"Romania","RU":"Russia","RW":"Rwanda","SM":"San Marino","ST":"Sao Tome & Principe","SA":"Saudi Arabia","SN":"Senegal","RS":"Serbia & Montenegro","SC":"Seychelles","SL":"Sierra Leone","SG":"Singapore","SK":"Slovakia","SI":"Slovenia","SB":"Solomon Islands","ZA":"South Africa","SS":"South Sudan","ES":"Spain","LK":"Sri Lanka","BL":"St. Barthelemy","EU":"St. Eustatius","KN":"St. Kitts and Nevis","LC":"St. Lucia","MF":"St. Maarten","VC":"St. Vincent","SD":"Sudan","SR":"Suriname","SZ":"Swaziland","SE":"Sweden","CH":"Switzerland","PF":"Tahiti","TW":"Taiwan","TJ":"Tajikistan","TZ":"Tanzania","TH":"Thailand","TL":"Timor-Leste","TG":"Togo","TO":"Tonga","TT":"Trinidad and Tobago","TN":"Tunisia","TR":"Turkey","TM":"Turkmenistan","TC":"Turks and Caicos Islands","TV":"Tuvalu","UG":"Uganda","UA":"Ukraine","AE":"United Arab Emirates","GB":"United Kingdom","US":"United States","UY":"Uruguay","UZ":"Uzbekistan","VU":"Vanuatu","VE":"Venezuela","VN":"Vietnam","VG":"Virgin Islands (British)","VI":"Virgin Islands (U.S.)","WS":"Western Samoa","YE":"Yemen","ZM":"Zambia","ZW":"Zimbabwe"};
// List of country codes that are not considered international, default US, that the splash won't be shown to automatically
var ig_domesticCountryCodes = ['PR','US','VI'];
// List of country codes you don't ship to
var ig_noShipCountryCodes = ['AF','BA','BY','CF','CI','DZ','EU','GE','GH','GW','ID','IQ','LB','ME','MK','MM','MP','MY','NA','NF','NR','NU','NV','PH','RE','RS','SB','SD','SL','SS','TV','UG','YT'];

//Sets internal jquery variable to the existing $ on the page.
igJq = jQuery;

//
// END Store specific settings
//

///////////////////////////////////////////////////////////////////////////////

/**
 * jQuery JSONP Core Plugin 2.4.0 (2012-08-21)
 *
 * https://github.com/jaubourg/jquery-jsonp
 *
 * Copyright (c) 2012 Julian Aubourg
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 */
!function(e){function t(){}function n(e){i=[e]}function c(e,t,n){return e&&e.apply(t.context||t,n)}function r(e){return/\?/.test(e)?"&":"?"}function o(o){function m(e){V++||(W(),K&&(I[M]={s:[e]}),A&&(e=A.apply(o,[e])),c(R,o,[e,k,o]),c(z,o,[o,k]))}function S(e){V++||(W(),K&&e!=x&&(I[M]=e),c(U,o,[o,e]),c(z,o,[o,e]))}o=e.extend({},B,o);var $,_,q,P,Q,R=o.success,U=o.error,z=o.complete,A=o.dataFilter,G=o.callbackParameter,H=o.callback,J=o.cache,K=o.pageCache,L=o.charset,M=o.url,N=o.data,O=o.timeout,V=0,W=t;return w&&w(function(e){e.done(R).fail(U),R=e.resolve,U=e.reject}).promise(o),o.abort=function(){!V++&&W()},c(o.beforeSend,o,[o])===!1||V?o:(M=M||l,N=N?"string"==typeof N?N:e.param(N,o.traditional):l,M+=N?r(M)+N:l,G&&(M+=r(M)+encodeURIComponent(G)+"=?"),!J&&!K&&(M+=r(M)+"_"+(new Date).getTime()+"="),M=M.replace(/=\?(&|$)/,"="+H+"$1"),K&&($=I[M])?$.s?m($.s[0]):S($):(C[H]=n,q=e(j)[0],q.id=f+T++,L&&(q[u]=L),D&&D.version()<11.6?(P=e(j)[0]).text="document.getElementById('"+q.id+"')."+h+"()":q[a]=a,F&&(q.htmlFor=q.id,q.event=p),q[y]=q[h]=q[v]=function(e){if(!q[g]||!/i/.test(q[g])){try{q[p]&&q[p]()}catch(t){}e=i,i=0,e?m(e[0]):S(s)}},q.src=M,W=function(){Q&&clearTimeout(Q),q[v]=q[y]=q[h]=null,E[b](q),P&&E[b](P)},E[d](q,_=E.firstChild),P&&E[d](P,_),Q=O>0&&setTimeout(function(){S(x)},O)),o)}var i,a="async",u="charset",l="",s="error",d="insertBefore",f="_jqjsp",m="on",p=m+"click",h=m+s,y=m+"load",v=m+"readystatechange",g="readyState",b="removeChild",j="<script>",k="success",x="timeout",C=window,w=e.Deferred,E=e("head")[0]||document.documentElement,I={},T=0,B={callback:f,url:location.href},D=C.opera,F=!!e("<div>").html("<!--[if IE]><i><![endif]-->").find("i").length;o.setup=function(t){e.extend(B,t)},e.jsonp=o}(jQuery);
/**
* easyModal.js v1.3.2
* A minimal jQuery modal that works with your CSS.
* Author: Flavius Matis - http://flaviusmatis.github.com/
* URL: https://github.com/flaviusmatis/easyModal.js
*
* Copyright 2012, Flavius Matis
* Released under the MIT license.
* http://flaviusmatis.github.com/license.html
*/
!function(n,e){var o=function(n,e,o){var t;return function(){function i(){o||n.apply(a,s),t=null}var a=this,s=arguments;t?clearTimeout(t):o&&n.apply(a,s),t=setTimeout(i,e||100)}};jQuery.fn[e]=function(n){return n?this.bind("resize",o(n)):this.trigger(e)}}(jQuery,"smartModalResize"),function(n){"use strict";var e={init:function(e){var o={top:"auto",left:"auto",autoOpen:!1,overlayOpacity:.5,overlayColor:"#000",overlayClose:!0,overlayParent:"body",closeOnEscape:!0,closeButtonClass:".close",transitionIn:"",transitionOut:"",onOpen:!1,onClose:!1,zIndex:function(){return function(n){return n===-(1/0)?0:n+1}(Math.max.apply(Math,n.makeArray(n("*").map(function(){return n(this).css("z-index")}).filter(function(){return n.isNumeric(this)}).map(function(){return parseInt(this,10)}))))},updateZIndexOnOpen:!0,hasVariableWidth:!1};return e=n.extend(o,e),this.each(function(){var o=e,t=n('<div class="lean-overlay"></div>'),i=n(this);t.css({display:"none",position:"fixed","z-index":o.updateZIndexOnOpen?0:o.zIndex(),top:0,left:0,height:"100%",width:"100%",background:o.overlayColor,opacity:o.overlayOpacity,overflow:"auto"}).appendTo(o.overlayParent),i.css({display:"none","z-index":o.updateZIndexOnOpen?0:o.zIndex()+1}),i.bind("openModal",function(){var n=o.updateZIndexOnOpen?o.zIndex():parseInt(t.css("z-index"),10),e=n+1;""!==o.transitionIn&&""!==o.transitionOut&&i.removeClass(o.transitionOut).addClass(o.transitionIn),i.css({display:"block","z-index":e}),t.css({"z-index":n,display:"block"}),o.onOpen&&"function"==typeof o.onOpen&&o.onOpen(i[0])}),i.bind("closeModal",function(){""!==o.transitionIn&&""!==o.transitionOut?(i.removeClass(o.transitionIn).addClass(o.transitionOut),i.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){i.css("display","none"),t.css("display","none")})):(i.css("display","none"),t.css("display","none")),o.onClose&&"function"==typeof o.onClose&&o.onClose(i[0])}),t.click(function(){o.overlayClose&&i.trigger("closeModal")}),n(document).keydown(function(n){o.closeOnEscape&&27===n.keyCode&&i.trigger("closeModal")}),n(window).smartModalResize(function(){}),i.on("click",o.closeButtonClass,function(n){i.trigger("closeModal"),n.preventDefault()}),o.autoOpen&&i.trigger("openModal")})}};n.fn.easyModal=function(o){return e[o]?e[o].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof o&&o?void n.error("Method "+o+" does not exist on jQuery.easyModal"):e.init.apply(this,arguments)}}(jQuery);

/**
 * JavaScript Cookie v2.0.4
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
!function(a){if("function"==typeof define&&define.amd)define(a);else if("object"==typeof exports)module.exports=a();else{var b=window.Cookies,c=window.Cookies=a();c.noConflict=function(){return window.Cookies=b,c}}}(function(){function a(){for(var a=0,b={};a<arguments.length;a++){var c=arguments[a];for(var d in c)b[d]=c[d]}return b}function b(c){function d(b,e,f){var g;if(arguments.length>1){if(f=a({path:"/"},d.defaults,f),"number"==typeof f.expires){var h=new Date;h.setMilliseconds(h.getMilliseconds()+864e5*f.expires),f.expires=h}try{g=JSON.stringify(e),/^[\{\[]/.test(g)&&(e=g)}catch(i){}return e=c.write?c.write(e,b):encodeURIComponent(String(e)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),b=encodeURIComponent(String(b)),b=b.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),b=b.replace(/[\(\)]/g,escape),document.cookie=[b,"=",e,f.expires&&"; expires="+f.expires.toUTCString(),f.path&&"; path="+f.path,f.domain&&"; domain="+f.domain,f.secure?"; secure":""].join("")}b||(g={});for(var j=document.cookie?document.cookie.split("; "):[],k=/(%[0-9A-Z]{2})+/g,l=0;l<j.length;l++){var m=j[l].split("="),n=m[0].replace(k,decodeURIComponent),o=m.slice(1).join("=");'"'===o.charAt(0)&&(o=o.slice(1,-1));try{if(o=c.read?c.read(o,n):c(o,n)||o.replace(k,decodeURIComponent),this.json)try{o=JSON.parse(o)}catch(i){}if(b===n){g=o;break}b||(g[n]=o)}catch(i){}}return g}return d.get=d.set=d,d.getJSON=function(){return d.apply({json:!0},[].slice.call(arguments))},d.defaults={},d.remove=function(b,c){d(b,"",a(c,{expires:-1}))},d.withConverter=b,d}return b(function(){})});

//
// Begin iGlobal Stores Splash code
//

function ig_getParameterByName(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function ig_loadCountries() {
  for (var countryCode in ig_countries) {
    var selected = (countryCode === ig_country) ? 'selected="selected" ' : '';
    igJq('#countrySelect').append('<option ' + selected + 'value="' + countryCode + '">' + ig_countries[countryCode] + '</option>');
  }
}

function ig_countrySelected() {
  var countryCode = igJq("select#countrySelect").val();
  ig_setCountry(ig_validateCountryCode(countryCode));
  ig_alertIceOfCountryChange();
}

function ig_showTheSplash() {

  //init easyModal.js modal, after modal content was placed on the page (line above)

  //Fire the modal!
  igJq("#igSplashElement").trigger('openModal');

  //Set cookie for Splash shown
  if (ig_validateCountryCode(Cookies.get("igCountry")) && !ig_splashCookie) { // Only set the splashShown cookie, if there is a valid countryCookie
    Cookies.set('igSplash', 'igSplash', {expires: 7, path: '/', domain: ig_cookieDomain});
  }
}

function ig_setCountry(country) {
  ig_country = country;
  if (ig_country) {
    //Set country cookie
    Cookies.set('igCountry', ig_country, {expires: 365, path: '/', domain: ig_cookieDomain});
    // set the flag icon
    igJq('.headerFlag, .igWelcomeFlagHeader')
      .attr('src', 'https://d1vyngmisxigjx.cloudfront.net/images/flags/96x64/' + ((ig_country) ? ig_country.toUpperCase() : 'US') + '.png')
      .attr('alt', 'Flag of ' + ig_countries[ig_country]);
    // update splash text
    igJq('.js-igCountry').html(ig_countries[ig_country]);
    igJq('.featureList').hide();
    if (ig_isNoShipCountry()) {
      igJq('.featureList.js-igNoShip').show();
    } else if (ig_isDomesticCountry()) {
      igJq('.featureList.js-igDomestic').show();
    } else {
      igJq('.featureList.js-igInternational').show();
    }
  }
}

function ig_alertIceOfCountryChange() {
  igJq('body').toggleClass('ig-intl', !ig_isDomesticCountry());
  try {
    ig_ice_countryChanged(); // let the ICE script know that the country has changed, if there is an ICE script
  } catch (err) {
    //do nothing
  }
  if(ig_store && ig_store.showForeignCurrency) {
    ig_adjustCurrency();
  }
}

function ig_validateCountryCode(countryCode) {
  //Return the country code if valid, return null if not valid
  var countryDisplayName = ig_countries[countryCode];
  if (typeof countryDisplayName !== 'undefined' && countryDisplayName) {
    return countryCode;
  } else {
    return null;
  }
}

function ig_isNoShipCountry() {
  if (ig_countries[ig_country]) {
    return ig_country && igJq.inArray(ig_country, ig_noShipCountryCodes) >= 0;
  } else {
    return false;
  }
}

function ig_isDomesticCountry() {
  if (ig_countries[ig_country]) {
    return ig_country && igJq.inArray(ig_country, ig_domesticCountryCodes) >= 0;
  } else {
    return true;
  }
}

function ig_detectCountryCallback(countryCode) {
  ig_setCountry(ig_validateCountryCode(countryCode));
  ig_finishLoading();
}

function ig_detectCountryCallbackError() { // Error handling method for when the jsonp call to get the countryCode fails, if it will get called?
  console.log("Couldn't detect country");
  //if we couldn't detect country, default to US
  ig_country = 'US';
  ig_finishLoading();
}

function ig_detectCountry() {
  igJq.jsonp({
    url: 'https://iprecon.iglobalstores.com/iGlobalIp.js?p=igcCallback',
    callback: 'igcCallback',
    success: function (json, textStatus, xOptions) {
      ig_detectCountryCallback(json);
    },
    error: function () {
      ig_detectCountryCallbackError();
    }
  });
}

function ig_pingIglobal() {
  try { // Don't break if this doesn't work
    if (!ig_countryParam) {//Only ping iGlobal for real visitors, not url parameter testing
      igJq.ajax({//we do not need to trap errors like 503's, for this call
        dataType: "jsonp",
        url: 'https://iprecon.iglobalstores.com/ping.js?s=' + ig_store.store + '&c=' + ((ig_country) ? ig_country : '')
      });
    }
  } catch (err) {
    // do nothing
  }
}

function ig_finishLoading() {
  igJq("#igFlag").html('<img onclick="ig_showTheSplash();" src="https://d1vyngmisxigjx.cloudfront.net/images/flags/96x64/' + ((ig_country) ? ig_country.toUpperCase() : 'US') + '.png" class="igWelcomeFlagHeader" alt="Select your country." />');
  igJq("#igSplashElement").easyModal({
    onOpen: function(m){
      igJq(m).css({'z-index': 999999})
      igJq('.headerFlag, .igWelcomeFlagHeader')
        .attr('src', 'https://d1vyngmisxigjx.cloudfront.net/images/flags/96x64/' + ((ig_country) ? ig_country.toUpperCase() : 'US') + '.png')
        .attr('alt', 'Flag of ' + ig_countries[ig_country]);
      // update splash text
      igJq('.js-igCountry').html(ig_countries[ig_country]);
      igJq('.featureList').hide();
      if (ig_isNoShipCountry()) {
        igJq('.featureList.js-igNoShip').show();
      } else if (ig_isDomesticCountry()) {
        igJq('.featureList.js-igDomestic').show();
      } else {
        igJq('.featureList.js-igInternational').show();
      }
      igJq('body').addClass('welcome-mat-blur welcome-mat-open');
      igJq('#igSplashElement').addClass('modal-open');
    },
    onClose: function(m){
      igJq("body").removeClass("welcome-mat-blur welcome-mat-open");
      igJq("#igSplashElement").removeClass("modal-open");
    },
    zIndex: function(){ return 99999}
  });

  ig_loadCountries();

  if (!ig_isDomesticCountry() && (!ig_splashCookie || !ig_country || ig_countryParam)) {
    igJq(ig_showTheSplash); //Schedule Showing the Splash
  }
  ig_alertIceOfCountryChange();
  ig_pingIglobal();
}

var ig_country = null;
var ig_countryCookie = ig_validateCountryCode(Cookies.get("igCountry"));
var ig_countryParam = ig_validateCountryCode(ig_getParameterByName("igCountry"));
var ig_splashCookie = Cookies.get("igSplash");

//set country to URL parameter igCountry
if (!ig_country && ig_countryParam) {
  ig_setCountry(ig_validateCountryCode(ig_countryParam));
}

//else set country to countryCookie
if (!ig_country && ig_countryCookie) {
  ig_country = ig_countryCookie;
}

//else set country to countryIP from iGlobal's IP Recognition Service
if (!ig_country) {
  ig_detectCountry();
} else { // else go with whatever country we have, even no country
  ig_finishLoading();
}

function igcCheckoutButton(e){
  if (!ig_isDomesticCountry()) {
    e.preventDefault();
    if(igJq('form[action="/cart"]').length){
      igJq.post('/cart', igJq('form[action="/cart"]').serializeArray(), function(data){
        igcCheckout();
      });
    } else {
      igcCheckout();
    }
  }
}

function ig_getTheButtonReady() {
  igJq('button.checkout').click(igcCheckoutButton);
  igJq('input[name="checkout"]').click(igcCheckoutButton);
  igJq('.action_button.right').click(igcCheckoutButton);
  igJq(document).on('click', '#checkout, button.cart__checkout, input[name="checkout"]', igcCheckoutButton);
}


//Testing mode, remove this requirement for the iGlobal url param, to make a site live
var iGlobalUrlParam = ig_getParameterByName("iGlobal");
if (ig_store.live || iGlobalUrlParam === "true") {
  igJq(document).ready(function () {
    ig_getTheButtonReady();
  });
}

function ig_adjustCurrency() {
  var formatter = ig_getCurrencyFormatter();
  igJq('.money').each(function () {
    var i = igJq(this);
    if (!i.data('USD')) {
      i.data('USD', i.text().replace(/[^\d.]/g, ''));
    }
    i.text(formatter(i.data('USD')));
  });
}
function ig_getCurrencyFormatter() {
  var key = ig_country + "_rate",
    rate = JSON.parse(sessionStorage[key] || "{}");
  if (rate && rate.expires > (new Date()).getTime()) {
    return function(price) {
      var amt = Number(price);
      if(isNaN(amt)){
        return price;
      }
      amt *= rate.rateEstimate;
      if (typeof Intl == 'object' && Intl && typeof Intl.NumberFormat == 'function') {
        return new Intl.NumberFormat(window.navigator.userLanguage || window.navigator.language, {
          style: 'currency',
          currency: rate.currency
        }).format(amt);
      } else {
        var f = Number(amt)
          .toFixed(rate.scale)
          .replace('.', '|dec|')
          .replace(',', rate.thousandsDelimiter)
          .replace('|dec|', rate.decimalDelimiter);
        return rate.currencySymbol + f + (rate.currency != "USD" ? " " + rate.currency : "");
      }
    };
  } else {
    sessionStorage.removeItem(key);
    ig_currencyRate();
    return function(price){
      return price;
    }
  }
}

function ig_currencyRate() {
  igJq.get('https://api.iglobalstores.com/2.0/localizationExchange',
    {storeId:ig_store.store, countryCode: ig_country},
    function (rateOffer) {
      if(ig_country in rateOffer) {
        rateOffer = rateOffer[ig_country];
        rateOffer.expires = (new Date()).getTime() + (60 * 60 * 1000);
        sessionStorage.setItem(ig_country + "_rate", JSON.stringify(rateOffer));
        ig_adjustCurrency();
        showForeignCurrency = rateOffer.currency != "USD";
        Cookies.set('igCurrency', rateOffer.currency , {expires: 7, path: '/', domain: ig_cookieDomain});
      }
    });
}
