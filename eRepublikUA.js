// ==UserScript==
// @name		eRepublik UA
// @version		0.01
// @description	Ukrainian tasks
// @author		eCitizen Maximko
// @namespace		eCitizenMaximko
// @include		http://www.erepublik.com/*
// @require		http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// ==/UserScript==


// Constants
var VERSION = '0.55';
var LOCALE = 'en/'
var BASE_URL = 'http://www.erepublik.com/';
var MAP_URL = 'http://www.eGobba.de/index.htm?nation=';
var RANKS = ['private', 'corporal', 'sergeant', 'lieutenant', 'captain', 'colonel', 'general', 'fieldmarshal'];
var INDUSTRIES = ['', 'Food', 'Gift', 'Weapon', 'Moving Tickets'];
var SKILLS = ['all', 'manufacturing', 'land', 'constructions'];
var TOOLS = ['Badges', 'RSS Feed', 'ThirdParty', 'Forums', 'eRepPlusSettings'];
var SETTINGS_BITS = '11111111111111111111';
var STRINGS = [	'Swap currencies',
				'Link',
				'Bold',
				'Italic',
				'Underline',
				'Size',
				'Image',
				'Damage',
				'Empty handed',
				'Weapon Quality Level ',
				'Top rated news',
				'Latest news',
				'Military news',
				'Please enter ',
				'Quick Links&nbsp;&nbsp;&nbsp;',
				'All comments and Translate to&nbsp;&nbsp;&nbsp;',
				'Interactive Map',
				'News description',
				'"Third Party Tools" and "National Pages and Forums"',
				'Wellness calculator on your profile',
				'Newspaper and Forum Article Editor',
				'Army page displays damage with various quality of weapon',
				'Job market filtering ',
				'Monetary market "Swap currencies" link',
				'Unit price of Products and Raw Materials',
				'Wellness shown on All employees page',
				'Save Links&nbsp;&nbsp;&nbsp;',
				'Enabled',
				'Disabled',
				'Num',
				'Caption',
				'Link',
				'New window',
				'Third Party Tools',
				'National Pages and Forums',
				'Plus Settings',
				' (All) ',
				' Translate ',
				'Quality of Hospitals on Social Stats',
				'Next Super Soldier Medal Calculator',
				'Trainings to next medal: '
];


function calculateUnitPrice() {
	alert('test');
	var industryIndex = location.href.split('/')[5].split('-')[3];
	var unitPrice = 0;
	var price = 0;
	var quality = 0;
	
	$("table.offers tr").each(function(i) {
		if (i != 0) 
		{
			quality = $(this).find("td:eq(1) span span").css("width");
			quality = quality.substr(0, quality.length - 1) / 20;
			if (quality > 1)
			{
				price = $(this).find("td:eq(3) span:eq(0)").text() + $(this).find("td:eq(3) sup").text(); 
				unitPrice = (Math.round((price / quality) * 1000) / 1000).toString().split('.');
				if (unitPrice[1] == undefined)
					unitPrice[1] = '';
				else
					unitPrice[1] = '.' + unitPrice[1];
				$(this).find("td:eq(3) span:eq(1)").after('<br/><span class="special" style="color: #5FAE34;">' + unitPrice[0] + '</span><sup style="color: #5FAE34;">' + unitPrice[1] + '</sup><span class="special"></span>');
			}
		}
	});
}


function Main(e) {

	try {
		cID = $("div.core div.avatarholder a").attr("href").split('/')[4] + "_";
	} catch (e) {}
	
	if (typeof unsafeWindow == 'undefined')
		unsafeWindow = window;
	
	var currURL = location.href;
	var subURL = currURL.substr(BASE_URL.length);
	LOCALE = subURL.substring(0, subURL.indexOf('/')) + '/';
	BASE_URL += LOCALE;
	subURL = currURL.substr(BASE_URL.length);


	var pagesFunctions = [
		{p: 'market/', 				s:8, 	f: calculateUnitPrice},

	];
	
	pagesFunctions.forEach(function(v) {
		if ((subURL.substr(0, v.p.length) == v.p) && (getSetting(v.s) != '0' || v.s == '-1'))
			v.f();
	});
};


var $ = jQuery.noConflict();
window.addEventListener('load', Main, false);
