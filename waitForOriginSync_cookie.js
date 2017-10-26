window.optimizely = window.optimizely || [];
var cookieDomain = "<cookie domain here>";
var canonicalOrigins = ["<origin here>", "<origin here>"];
var origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');

// Cookie getter method.
function getCookie(name) {
  var match = document.cookie.match(name + '=([^;]*)');
  return match ? match[1] : undefined;
}

// Cookie setter method.
function setCookie(c_name, value, exdays, c_domain) {
  c_domain = (typeof c_domain === "undefined") ? "" : "domain=" + c_domain + ";";
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
  document.cookie = c_name + "=" + c_value + ";" + c_domain + "path=/";
}

if (!getCookie("optlyOriginSync")) setCookie('optlyOriginSync', origin, 90, cookieDomain);

if (decodeURIComponent(getCookie("optlyOriginSync")) !== origin) {
  window.optimizely.push({
    "type": "waitForOriginSync",
    "canonicalOrigins": canonicalOrigins
  });
}

setCookie('optlyOriginSync', origin, 90, cookieDomain);
