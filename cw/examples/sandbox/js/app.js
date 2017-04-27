require([
  'dojo/query',
  'dojo/on',
  'dojo/dom',
  'dojo/dom-construct',
  'dojo/dom-geometry',
  'dojo/_base/connect',
  'dojo/has',
  'dojo/_base/event',
  'dojo/dom-class',
  'dojo/dom-style',
  'esri/domUtils',
  'esri/map',
  'dojo/NodeList-dom',
  'dojo/domReady!'
], function($, on, dom, domConstruct, domGeom, connect, has, event, domClass, domStyle, domUtils) {

  // declare shared variables
  var editor, exampleFolder, sandboxIsLoaded, toggleCodeWidth, toggleOutputWidth;

  // cache DOM elements
  var $handle, $save, $toggle, $update, $wrapper, $output, $code;

  // set to true to use log() for debugging
  var DEBUG = false;

  // add sample server address to esri config
  esri.config.defaults.io.corsEnabledServers.push('https://developers.arcgis.com/javascript');

  // run all the things
  setExampleFolder();
  startEditor();
  bindEventHandlers();
  getSampleCode();

  // get sample folder from querystring
  function setExampleFolder() {
    log('setExampleFolder');

    var urlObject = esri.urlToObject(document.location.href);

    urlObject.query = urlObject.query || {};

    if (urlObject.query && urlObject.query.example) {
      exampleFolder = urlObject.query.example;
    } else {
      exampleFolder = 'map_simple'; // default
    }
  }

  // initialize ace editor
  function startEditor() {
    log('startEditor');

    ace.config.set('workerPath', 'js');
    editor = ace.edit('editor');
    editor.$blockScrolling = Infinity;
    editor.setPrintMarginColumn(0);
    editor.setTheme('ace/theme/github');
    editor.getSession().setTabSize(2);
    editor.getSession().setUseSoftTabs(true);
    editor.getSession().setMode('ace/mode/html');
    editor.setOption("wrap", true);
  }

  // bind events to DOM elements
  function bindEventHandlers() {
    log('bindEventHandlers');

    $code    = $('#code');
    $handle  = $('#handle');
    $output  = $('#output');
    $save    = $('#save-file');
    $toggle  = $('.toggle');
    $update  = $('#update-sandbox');
    $wrapper = $('#wrapper');

    $handle.on('mousedown', resizePanes);
    $save.on('click', saveFile);
    $toggle.on('click', toggleEditor);
    $update
      .attr('disabled', 'disabled')
      .on('click', updateSandbox);

    on(window, 'resize', resetPanes);
  }

  // get sample code then delegate to handleSample()
  function getSampleCode() {
    log('getSampleCode');

    // get code sample from docs
    esri.request({
      // 'url': 'https://developers.arcgis.com/javascript/3/examples/' + exampleFolder + '/index.html',
      'url': '../../examples/' + exampleFolder + '/index.html',
      'handleAs': 'text'
    }).then(handleSample, handleError);

    // show page after loading is complete
    $wrapper.style('visibility', 'visible');

    // dump sample code into editor then update sandbox
    function handleSample(str) {
      log('handleSample');

      editor.getSession().setValue(str); // add the content
      updateSandbox(); // load the sample into an iframe
    }

    // logs error if esri.request from getSample() fails
    function handleError(err) {
      if (console && console.log) { // check for console first
        console.log('error getting code sample: ', err);
      }
    }
  }

  // helper functions

  // get code from editor and run inside iframe
  function updateSandbox() {
    log('updateSandbox');

    $update.attr('disabled', 'disabled');
    $save.attr('disabled', 'disabled');

    domUtils.show(dom.byId('loader')); // Show a loading/updating icon

    var iframeName = 'sandbox';

    // destroy the iframe, if it exists
    if (dom.byId(iframeName)) {
      domConstruct.destroy(iframeName);
    }

    // disconnect previous iframe onload handler
    if (sandboxIsLoaded) {
      connect.disconnect(sandboxIsLoaded);
    }

    // create an iframe
    var iframe = domConstruct.create('iframe', { 'id': iframeName }, 'output');

    sandboxIsLoaded = on(iframe, 'load', function() {
      domUtils.hide(dom.byId('loader')); // Hide the loading icon

      $update.attr('disabled', false);
      $save.attr('disabled', false);
    });

    log('sandboxIsLoaded');

    idoc = (iframe.contentWindow) ?
      iframe.contentWindow : (iframe.contentDocument.document) ?
      iframe.contentDocument.document : iframe.contentDocument;

    var content = editor.getSession().getValue();

    var relLinks = content.match(/href=".+?"/g);
    if (relLinks) {
      relLinks = relLinks.filter(function(url){ return url.indexOf("//") === -1 }); // ignore absolute URLs
      relLinks = relLinks.concat(content.match(/src=".+?"/g).filter(function(url){ return url.indexOf("//") === -1 }));
      relLinks.forEach(function(href){
        var path = href.split('"')[1];
        content = content.replace(path, "../examples/" + exampleFolder + "/" + path);
      });
    }

    relLinks = content.match(/src='.+?'/g);
    if (relLinks) {
      relLinks = relLinks.filter(function(url){ return url.indexOf("//") === -1 }); // ignore absolute URLs
      relLinks.forEach(function(href){
        var path = href.split("'")[1];
        content = content.replace(path, "../examples/" + exampleFolder + "/" + path);
      });
    };

    // fix for graphics_add
    //      "images/mangrove.png",
    relLinks = content.match(/images\/mangrove.png/g);
    if (relLinks) {
      relLinks.forEach(function(href){
        content = content.replace(href, "../examples/" + exampleFolder + "/" + href);
      });
    };

    // fix for syntax used in data_gas_prices and styling_svg_css_transitions
    //      url: "fallback-gas-price-data.json",
    //      url: "county_population.csv"
    relLinks = content.match(/url: ".+?"/g);
    if (relLinks) {
      relLinks = relLinks.filter(function(url){ return url.indexOf("//") === -1 }); // ignore absolute URLs
      relLinks.forEach(function(href){
        var file = href.split('"')[1];
        content = content.replace(file, "../examples/" + exampleFolder + "/" + file);
      });
    };

    // fix for syntax used in fl_featureCollection
    //      "url": "images/flickr.png",
    relLinks = content.match(/"url": ".+?"/g);
    if (relLinks) {
      relLinks = relLinks.filter(function(url){ return url.indexOf("//") === -1 }); // ignore absolute URLs
      relLinks.forEach(function(href){
        var file = href.split('"')[3]; // more "s than in fix above
        content = content.replace(file, "../examples/" + exampleFolder + "/" + file);
      });
    };

    // fix for syntax used in ed_undoRedo, graphics_undoRedo and gp_clipasync
    //      .undoIcon { background-image:url(images/undo.png); width:16px; height:16px; }
    relLinks = content.match(/background-image:url\(.+?\.png/g);
    if (relLinks) {
      relLinks.forEach(function(href){
        var file = href.split('(')[1];
        content = content.replace(file, "../examples/" + exampleFolder + "/" + file);
      });
    };

    // fix for syntax used in smartmapping_bycolor sample
    //      imageUrl: "images/busy-indicator.gif",
    relLinks = content.match(/imageUrl: ".+?"/g);
        if (relLinks) {
          relLinks = relLinks.filter(function(url){ return url.indexOf("//") === -1 }); // ignore absolute URLs
          relLinks.forEach(function(href){
            var file = href.split('"')[1];
            content = content.replace(file, "../examples/" + exampleFolder + "/" + file);
          });
    };

    var jsLinks = content.match(/location.pathname.+\"/g);
    if (jsLinks) {
      jsLinks.forEach(function(href){
        content = content.replace(/""\)/, "\"/../examples/" + exampleFolder + "/\")");
        content = content.replace(/''\)/, "\'/../examples/" + exampleFolder + "/\')");
      });
    };

    if (has('ie')) {
      // http://sparecycles.wordpress.com/2012/03/08/inject-content-into-a-new-iframe/
      // this workaround was causing issues in Firefox - may be able to get it to
      // work cross-browser need to test more. But for now this 'split' approach works.
      idoc.contents = content;
      iframe.src = 'javascript:window["contents"]';
    } else {
      idoc.document.open();
      idoc.document.write(content);
      idoc.document.close();
      // set the iframe's src attribute
      // otherwise, no referrer is sent when making requests from the iframe
      // which breaks samples which use the /sproxy on developers.arcgis.com
        // TODO temporary fix (Chris), need to go back and check what this is doing
      //iframe.src = '../examples/' + exampleFolder + '/index.html';
    }
  }

  // save contents of editor to html file
  function saveFile() {
    log('saveFile');

    var builder = new BlobBuilder();
    builder.append(editor.getSession().getValue());

    var blob = builder.getBlob('text/plain;charset=' + document.characterSet);
    saveAs(blob, exampleFolder + '.html');
  }

  // toggle display of editor pane
  function toggleEditor() {
    resetPanes();
    $wrapper.toggleClass('minimized');
  }

  // resize content panes when handle is dragged
  function resizePanes(e) {
    event.stop(e);
    $wrapper.addClass('resizing');
    var min = 550;
    var width = domStyle.get('wrapper', 'width');

    var dragHandle = on(window, 'mousemove', function(e){
      event.stop(e);
      if (e.pageX > min) {
        setHandlePosition(e.pageX + 8, width);
      }
    });

    on.once(parent.document, 'mouseup', function(e){
      $wrapper.removeClass('resizing');
      connect.disconnect(dragHandle);
    });

    function setHandlePosition(pos, width) {
      // vanilla JS is a *lot* faster than dojo :/
      $code[0].style.right = (width - pos) + 'px';
      $output[0].style.left = pos + 'px';
    }
  }

  function resetPanes() {
    $output.removeAttr('style');
    $code.removeAttr('style');
  }

  // log function for debugging
  function log(str) {
    if (DEBUG && console && console.log) { // check for console first
      console.log(Array.prototype.slice.call(arguments));
    }
  }
});
